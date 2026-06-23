"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import {
  checkPassword,
  hasAdminPasswordConfig,
  isAuthed,
  makeSessionToken,
  SESSION_COOKIE,
} from "@/app/_lib/auth";
import { MEDIA_BUCKET, supabaseAdmin } from "@/app/_lib/supabaseAdmin";

// ---- helpers ------------------------------------------------------------
async function assertAuthed() {
  if (!(await isAuthed())) redirect("/admin/login");
}

function refresh() {
  // Refresh both the public site and the admin pages after any change.
  revalidatePath("/", "layout");
}

function nextOrder(): number {
  // Strictly increasing small integer (seconds since 2023-11), keeps insert order.
  return Math.floor(Date.now() / 1000) - 1_700_000_000;
}

const RU_MAP: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function slugify(input: string): string {
  const lower = input.toLowerCase();
  let out = "";
  for (const ch of lower) out += ch in RU_MAP ? RU_MAP[ch] : ch;
  return out
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function fallbackSlug(): string {
  return `proekt-${Date.now().toString(36)}`;
}

async function uploadToStorage(file: File, folder: string): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error } = await supabaseAdmin.storage
    .from(MEDIA_BUCKET)
    .upload(path, bytes, { contentType: file.type || "image/jpeg", upsert: false });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  return supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

// ---- auth ---------------------------------------------------------------
export async function login(formData: FormData) {
  if (!hasAdminPasswordConfig()) {
    redirect("/admin/login?config=1");
  }

  const password = String(formData.get("password") ?? "").trim();
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  (await cookies()).set(SESSION_COOKIE, makeSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ---- projects -----------------------------------------------------------
export async function createProject(formData: FormData) {
  await assertAuthed();
  const title = String(formData.get("title") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "");
  if (!title || !categoryId) redirect("/admin/projects/new?error=1");

  let slug = slugify(String(formData.get("slug") ?? "") || title) || fallbackSlug();

  // ensure unique slug
  const { data: existing } = await supabaseAdmin.from("projects").select("slug").eq("slug", slug).maybeSingle();
  if (existing) slug = `${slug}-${Math.floor(Math.random() * 1000)}`;

  const { data, error } = await supabaseAdmin
    .from("projects")
    .insert({ title, slug, category_id: categoryId, sort_order: nextOrder() })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  refresh();
  redirect(`/admin/projects/${data.id}`);
}

export async function updateProject(formData: FormData) {
  await assertAuthed();
  const id = String(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();

  // Keep slug non-empty and unique (Cyrillic titles transliterate to latin).
  let slug = slugify(String(formData.get("slug") ?? "")) || slugify(title) || fallbackSlug();
  const { data: clash } = await supabaseAdmin
    .from("projects")
    .select("id")
    .eq("slug", slug)
    .neq("id", id)
    .maybeSingle();
  if (clash) slug = `${slug}-${Math.floor(Math.random() * 1000)}`;

  const patch = {
    title,
    slug,
    category_id: String(formData.get("category_id") ?? ""),
    location: String(formData.get("location") ?? "").trim() || null,
    area: String(formData.get("area") ?? "").trim() || null,
    year: String(formData.get("year") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    hero_video: String(formData.get("hero_video") ?? "").trim() || null,
    published: formData.get("published") === "on",
  };
  const { error } = await supabaseAdmin.from("projects").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirect(`/admin/projects/${id}?saved=1`);
}

export async function updateTasks(formData: FormData) {
  await assertAuthed();
  const id = String(formData.get("id"));
  const tasks = String(formData.get("tasks") ?? "")
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean);
  const { error } = await supabaseAdmin.from("projects").update({ tasks }).eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirect(`/admin/projects/${id}?saved=1`);
}

export async function deleteProject(formData: FormData) {
  await assertAuthed();
  const id = String(formData.get("id"));
  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirect("/admin");
}

// ---- single images: cover / before / after -----------------------------
export async function uploadCover(formData: FormData) {
  await assertAuthed();
  const id = String(formData.get("id"));
  const field = String(formData.get("field")); // cover_image | before_image | after_image
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) redirect(`/admin/projects/${id}`);
  const url = await uploadToStorage(file as File, id);
  const { error } = await supabaseAdmin.from("projects").update({ [field]: url }).eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirect(`/admin/projects/${id}?saved=1`);
}

// ---- gallery / planning images -----------------------------------------
export async function addImage(formData: FormData) {
  await assertAuthed();
  const id = String(formData.get("id"));
  const kind = String(formData.get("kind")); // gallery | planning
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) redirect(`/admin/projects/${id}`);
  const url = await uploadToStorage(file as File, id);
  const { error } = await supabaseAdmin
    .from("project_images")
    .insert({ project_id: id, url, kind, sort_order: nextOrder() });
  if (error) throw new Error(error.message);
  refresh();
  redirect(`/admin/projects/${id}?saved=1`);
}

export async function deleteImage(formData: FormData) {
  await assertAuthed();
  const projectId = String(formData.get("project_id"));
  const imageId = String(formData.get("image_id"));
  const { error } = await supabaseAdmin.from("project_images").delete().eq("id", imageId);
  if (error) throw new Error(error.message);
  refresh();
  redirect(`/admin/projects/${projectId}?saved=1`);
}

// ---- text sections ------------------------------------------------------
export async function addSection(formData: FormData) {
  await assertAuthed();
  const id = String(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!title || !body) redirect(`/admin/projects/${id}`);
  const { error } = await supabaseAdmin
    .from("project_sections")
    .insert({ project_id: id, title, body, sort_order: nextOrder() });
  if (error) throw new Error(error.message);
  refresh();
  redirect(`/admin/projects/${id}?saved=1`);
}

export async function deleteSection(formData: FormData) {
  await assertAuthed();
  const projectId = String(formData.get("project_id"));
  const sectionId = String(formData.get("section_id"));
  const { error } = await supabaseAdmin.from("project_sections").delete().eq("id", sectionId);
  if (error) throw new Error(error.message);
  refresh();
  redirect(`/admin/projects/${projectId}?saved=1`);
}
