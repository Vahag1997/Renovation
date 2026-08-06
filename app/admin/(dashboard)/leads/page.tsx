import { hasSupabaseAdminConfig, supabaseAdmin } from "@/app/_lib/supabaseAdmin";
import { AdminConfigNotice } from "@/app/admin/_components/AdminConfigNotice";
import { deleteLead, updateLeadStatus } from "@/app/admin/_actions";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  source: string;
  name: string | null;
  phone: string | null;
  area: string | null;
  premises_type: string | null;
  style: string | null;
  complex_name: string | null;
  service_type: string | null;
  timeline: string | null;
  estimated_budget: string | null;
  status: string;
  created_at: string;
};

const SOURCE_LABELS: Record<string, string> = {
  calculator: "Калькулятор",
  contact: "Контакты",
};

const STATUS_LABELS: Record<string, string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Обработана",
};

const STATUS_STYLES: Record<string, string> = {
  new: "bg-amber-100 text-amber-800",
  in_progress: "bg-blue-100 text-blue-800",
  done: "bg-green-100 text-green-800",
};

function Field({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <span className="block text-[11px] uppercase tracking-wide text-neutral-400">{label}</span>
      <span className="text-sm text-neutral-800">{value}</span>
    </div>
  );
}

export default async function AdminLeadsPage() {
  if (!hasSupabaseAdminConfig()) {
    return <AdminConfigNotice />;
  }

  const { data } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  const leads = (data ?? []) as unknown as Lead[];
  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Заявки</h1>
        {newCount > 0 && (
          <span className="text-sm bg-amber-100 text-amber-800 rounded-full px-3 py-1">
            новых: {newCount}
          </span>
        )}
      </div>

      {leads.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-xl p-6 text-sm text-neutral-500">
          Пока нет заявок. Они появятся здесь, когда кто-то отправит форму на сайте.
        </div>
      ) : (
        <ul className="space-y-4">
          {leads.map((lead) => (
            <li key={lead.id} className="bg-white border border-neutral-200 rounded-xl p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wide text-neutral-500 border border-neutral-200 rounded px-2 py-0.5">
                    {SOURCE_LABELS[lead.source] ?? lead.source}
                  </span>
                  <span className={`text-xs rounded-full px-2 py-0.5 ${STATUS_STYLES[lead.status] ?? ""}`}>
                    {STATUS_LABELS[lead.status] ?? lead.status}
                  </span>
                </div>
                <span className="text-xs text-neutral-400">
                  {new Date(lead.created_at).toLocaleString("ru-RU")}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                <Field label="Имя" value={lead.name} />
                <Field label="Телефон" value={lead.phone} />
                <Field label="Площадь" value={lead.area} />
                <Field label="Тип помещения" value={lead.premises_type} />
                <Field label="Стиль" value={lead.style} />
                <Field label="ЖК" value={lead.complex_name} />
                <Field label="Услуга" value={lead.service_type} />
                <Field label="Сроки" value={lead.timeline} />
                <Field label="Бюджет (расчёт)" value={lead.estimated_budget} />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-neutral-100 pt-4">
                <form action={updateLeadStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={lead.id} />
                  <select
                    name="status"
                    defaultValue={lead.status}
                    className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm bg-white"
                  >
                    <option value="new">Новая</option>
                    <option value="in_progress">В работе</option>
                    <option value="done">Обработана</option>
                  </select>
                  <button className="text-sm rounded-md bg-neutral-900 text-white px-3 py-1.5 hover:bg-neutral-700">
                    Сохранить
                  </button>
                </form>
                <form action={deleteLead}>
                  <input type="hidden" name="id" value={lead.id} />
                  <button className="text-sm text-neutral-400 hover:text-red-600">Удалить</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
