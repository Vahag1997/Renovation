import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { supabaseAdmin } from "@/app/_lib/supabaseAdmin";
import {
  addImage,
  addSection,
  deleteImage,
  deleteSection,
  updateProject,
  updateTasks,
  uploadCover,
} from "@/app/admin/_actions";

export const dynamic = "force-dynamic";

type ImageRow = { id: string; url: string; kind: string; sort_order: number };
type SectionRow = { id: string; title: string; body: string; sort_order: number };
type CategoryRow = { id: string; name: string };
type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category_id: string;
  location: string | null;
  area: string | null;
  year: string | null;
  description: string | null;
  hero_video: string | null;
  cover_image: string | null;
  before_image: string | null;
  after_image: string | null;
  tasks: string[] | null;
  published: boolean;
  project_images: ImageRow[] | null;
  project_sections: SectionRow[] | null;
};

const card = "bg-white border border-neutral-200 rounded-xl p-6";
const field =
  "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-900";
const label = "block text-sm text-neutral-600 mb-1";
const btn = "rounded-md bg-neutral-900 text-white text-sm font-medium px-4 py-2 hover:bg-neutral-700";

function Thumb({ url, children }: { url: string; children?: React.ReactNode }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-neutral-200 bg-neutral-100">
      <Image src={url} alt="" fill sizes="220px" className="object-cover" />
      {children}
    </div>
  );
}

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;

  const [{ data: projectData }, { data: cats }] = await Promise.all([
    supabaseAdmin
      .from("projects")
      .select(
        "*, project_images(id,url,kind,sort_order), project_sections(id,title,body,sort_order)",
      )
      .eq("id", id)
      .single(),
    supabaseAdmin.from("categories").select("id,name").order("sort_order"),
  ]);

  if (!projectData) notFound();
  const project = projectData as unknown as ProjectRow;
  const categories = (cats ?? []) as CategoryRow[];

  const images = [...(project.project_images ?? [])].sort((a, b) => a.sort_order - b.sort_order);
  const gallery = images.filter((i) => i.kind === "gallery");
  const planning = images.filter((i) => i.kind === "planning");
  const sections = [...(project.project_sections ?? [])].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="space-y-6">
      <Link href="/admin" className="text-sm text-neutral-500 hover:text-neutral-900">
        ← Все проекты
      </Link>

      <h1 className="text-2xl font-medium">{project.title}</h1>
      {saved ? (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
          Сохранено ✓
        </p>
      ) : null}

      {/* Main fields */}
      <form action={updateProject} className={`${card} space-y-4`}>
        <input type="hidden" name="id" value={project.id} />
        <h2 className="font-medium">Основное</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={label}>Название *</label>
            <input name="title" required defaultValue={project.title} className={field} />
          </div>
          <div>
            <label className={label}>Адрес в ссылке (slug) *</label>
            <input name="slug" required defaultValue={project.slug} className={field} />
          </div>
          <div>
            <label className={label}>Категория *</label>
            <select name="category_id" defaultValue={project.category_id} className={`${field} bg-white`}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Локация</label>
            <input name="location" defaultValue={project.location ?? ""} className={field} />
          </div>
          <div>
            <label className={label}>Площадь</label>
            <input name="area" defaultValue={project.area ?? ""} className={field} placeholder="220 м²" />
          </div>
          <div>
            <label className={label}>Год</label>
            <input name="year" defaultValue={project.year ?? ""} className={field} placeholder="2024" />
          </div>
          <div>
            <label className={label}>Ссылка на видео (необязательно)</label>
            <input name="hero_video" defaultValue={project.hero_video ?? ""} className={field} placeholder="https://…/video.mp4" />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Короткое описание</label>
            <textarea name="description" defaultValue={project.description ?? ""} rows={3} className={field} />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" name="published" defaultChecked={project.published} />
          Опубликован (виден на сайте)
        </label>
        <button className={btn}>Сохранить</button>
      </form>

      {/* Cover / before / after */}
      <div className={`${card} space-y-5`}>
        <h2 className="font-medium">Главные изображения</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {([
            ["cover_image", "Обложка", project.cover_image],
            ["before_image", "Фото «до»", project.before_image],
            ["after_image", "Фото «после»", project.after_image],
          ] as const).map(([fieldName, title, url]) => (
            <div key={fieldName} className="space-y-2">
              <span className="text-sm text-neutral-600">{title}</span>
              {url ? <Thumb url={url} /> : (
                <div className="aspect-[4/3] w-full rounded-md border border-dashed border-neutral-300 grid place-items-center text-xs text-neutral-400">
                  нет фото
                </div>
              )}
              <form action={uploadCover} className="space-y-2">
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="field" value={fieldName} />
                <input type="file" name="file" accept="image/*" required className="block w-full text-xs" />
                <button className="text-sm underline underline-offset-4">Загрузить</button>
              </form>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <ImageManager
        title="Галерея проекта"
        kind="gallery"
        projectId={project.id}
        items={gallery}
      />

      {/* Planning */}
      <ImageManager
        title="Планировки"
        kind="planning"
        projectId={project.id}
        items={planning}
      />

      {/* Tasks */}
      <form action={updateTasks} className={`${card} space-y-3`}>
        <input type="hidden" name="id" value={project.id} />
        <h2 className="font-medium">Задачи проекта</h2>
        <p className="text-sm text-neutral-500">По одной задаче в строке.</p>
        <textarea
          name="tasks"
          rows={5}
          defaultValue={(project.tasks ?? []).join("\n")}
          className={field}
        />
        <button className={btn}>Сохранить задачи</button>
      </form>

      {/* Text sections */}
      <div className={`${card} space-y-5`}>
        <h2 className="font-medium">Текстовые блоки</h2>
        {sections.length === 0 ? (
          <p className="text-sm text-neutral-500">Пока нет блоков.</p>
        ) : (
          <ul className="space-y-3">
            {sections.map((s) => (
              <li key={s.id} className="border border-neutral-200 rounded-md p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium text-sm">{s.title}</div>
                    <p className="text-sm text-neutral-600 mt-1">{s.body}</p>
                  </div>
                  <form action={deleteSection}>
                    <input type="hidden" name="project_id" value={project.id} />
                    <input type="hidden" name="section_id" value={s.id} />
                    <button className="text-sm text-neutral-400 hover:text-red-600">Удалить</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}

        <form action={addSection} className="space-y-2 border-t border-neutral-100 pt-4">
          <input type="hidden" name="id" value={project.id} />
          <input name="title" required placeholder="Заголовок (напр. «Идея проекта»)" className={field} />
          <textarea name="body" required rows={3} placeholder="Текст блока…" className={field} />
          <button className={btn}>+ Добавить блок</button>
        </form>
      </div>
    </div>
  );
}

function ImageManager({
  title,
  kind,
  projectId,
  items,
}: {
  title: string;
  kind: "gallery" | "planning";
  projectId: string;
  items: ImageRow[];
}) {
  return (
    <div className={`${card} space-y-4`}>
      <h2 className="font-medium">{title}</h2>
      {items.length === 0 ? (
        <p className="text-sm text-neutral-500">Пока нет фото.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {items.map((img) => (
            <div key={img.id} className="space-y-1">
              <Thumb url={img.url} />
              <form action={deleteImage}>
                <input type="hidden" name="project_id" value={projectId} />
                <input type="hidden" name="image_id" value={img.id} />
                <button className="text-xs text-neutral-400 hover:text-red-600">Удалить</button>
              </form>
            </div>
          ))}
        </div>
      )}
      <form action={addImage} className="flex items-center gap-3 border-t border-neutral-100 pt-4">
        <input type="hidden" name="id" value={projectId} />
        <input type="hidden" name="kind" value={kind} />
        <input type="file" name="file" accept="image/*" required className="text-xs" />
        <button className="text-sm underline underline-offset-4">Загрузить фото</button>
      </form>
    </div>
  );
}
