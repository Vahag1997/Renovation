"use server";

import { hasSupabaseAdminConfig, supabaseAdmin } from "@/app/_lib/supabaseAdmin";

export type LeadInput = {
  source: "calculator" | "contact";
  name?: string;
  phone?: string;
  area?: string;
  premisesType?: string;
  style?: string;
  complexName?: string;
  serviceType?: string;
  timeline?: string;
  estimatedBudget?: string;
};

export type LeadResult = { ok: true } | { ok: false; error: string };

function clean(value: unknown, max = 200): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Saves a lead from the public forms (calculator / contact).
 * Runs on the server and writes with the service-role key, so the
 * `leads` table needs no public access — visitors can't read others' data.
 */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  if (!hasSupabaseAdminConfig()) {
    return { ok: false, error: "Сервер не настроен. Попробуйте позже." };
  }

  const source = input.source === "calculator" ? "calculator" : "contact";
  const name = clean(input.name);
  const phone = clean(input.phone, 40);

  // Minimal validation so a lead is actually reachable / meaningful.
  if (source === "calculator" && !phone) {
    return { ok: false, error: "Укажите телефон." };
  }
  if (source === "contact" && !name) {
    return { ok: false, error: "Укажите имя." };
  }

  try {
    const { error } = await supabaseAdmin.from("leads").insert({
      source,
      name,
      phone,
      area: clean(input.area, 40),
      premises_type: clean(input.premisesType, 60),
      style: clean(input.style, 60),
      complex_name: clean(input.complexName),
      service_type: clean(input.serviceType, 80),
      timeline: clean(input.timeline, 60),
      estimated_budget: clean(input.estimatedBudget, 60),
    });

    if (error) {
      // A lead is revenue — never let the reason disappear silently.
      console.error("[leads] insert failed:", error.message, error);
      return { ok: false, error: "Не удалось отправить. Попробуйте ещё раз." };
    }
    return { ok: true };
  } catch (cause) {
    // Supabase unreachable / DNS / TLS — would otherwise surface as an
    // unhandled server action rejection with no message for the visitor.
    console.error("[leads] insert threw:", cause);
    return {
      ok: false,
      error: "Сервис временно недоступен. Попробуйте через минуту.",
    };
  }
}
