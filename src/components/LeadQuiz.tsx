import { useMemo, useState } from "react";
import {
  Droplets, Wrench, CalendarCheck, Sprout, Leaf, Layers,
  Zap, Calendar, Clock, Info, ArrowRight, ArrowLeft, Check, CheckCircle2,
  Phone, Home, FileText, Instagram, ClipboardList, Wallet, Car,
} from "lucide-react";
import { toast } from "sonner";

type ServiceKey =
  | "auto" | "repair" | "seasonal" | "drip" | "lawn" | "complex";
type AreaKey = "s3" | "s3_6" | "s6_10" | "s10_20" | "s20+";
type SeasonalKey = "spring" | "autumn" | "full";

type QuizState = {
  service?: ServiceKey;
  area?: AreaKey;
  seasonal?: SeasonalKey;
  location?: string;
  locationOther?: string;
  timeline?: string;
  conditions: string[];
  name: string;
  phone: string;
  callTime: string;
};

const SERVICE_LABEL: Record<ServiceKey, string> = {
  auto: "Автополив під ключ",
  repair: "Ремонт системи",
  seasonal: "Сезонне обслуговування",
  drip: "Крапельний полив",
  lawn: "Рулонний газон",
  complex: "Комплекс послуг",
};
const AREA_LABEL: Record<AreaKey, string> = {
  s3: "До 3 соток",
  s3_6: "3-6 соток",
  s6_10: "6-10 соток",
  s10_20: "10-20 соток",
  "s20+": "Понад 20 соток",
};
const SEASONAL_LABEL: Record<SeasonalKey, string> = {
  spring: "Запуск навесні",
  autumn: "Консервація восени",
  full: "Повне річне обслуговування",
};

const PRICE: Partial<Record<ServiceKey, Partial<Record<AreaKey, [number, number] | null>>>> = {
  auto: {
    s3: [25000, 50000], s3_6: [50000, 90000], s6_10: [90000, 150000],
    s10_20: [150000, 280000], "s20+": null,
  },
  repair: {
    s3: [3000, 10000], s3_6: [5000, 15000], s6_10: [8000, 25000],
    s10_20: null, "s20+": null,
  },
  drip: {
    s3: [15000, 35000], s3_6: [30000, 60000], s6_10: [50000, 100000],
    s10_20: null, "s20+": null,
  },
  lawn: {
    s3: [20000, 40000], s3_6: [40000, 80000], s6_10: [80000, 140000],
    s10_20: null, "s20+": null,
  },
};
const SEASONAL_PRICE: Record<SeasonalKey, [number, number]> = {
  spring: [2500, 6000], autumn: [2500, 6000], full: [8000, 20000],
};

function formatUAH(n: number) {
  return n.toLocaleString("uk-UA").replace(/,/g, " ");
}

function calcEstimate(s: QuizState): { text: string; note?: string } {
  if (!s.service) return { text: "—" };
  if (s.service === "seasonal" && s.seasonal) {
    const [a, b] = SEASONAL_PRICE[s.seasonal];
    return { text: `${formatUAH(a)} — ${formatUAH(b)} грн` };
  }
  const baseKey: ServiceKey = s.service === "complex" ? "auto" : s.service;
  const range = s.area ? PRICE[baseKey]?.[s.area] : undefined;
  if (range === null) {
    return {
      text: "Розрахуємо індивідуально",
      note: "Для великих об'єктів ціна формується після виїзду та проєктування",
    };
  }
  if (!range) return { text: "Розрахуємо індивідуально" };
  let [low, high] = range;
  if (s.service === "complex") { low = Math.round(low * 1.6); high = Math.round(high * 1.6); }
  const c = s.conditions;
  let mult = 1;
  if (c.includes("Газон вже укладений")) mult += 0.15;
  if (c.includes("Є старий полив (потрібно демонтувати)")) mult += 0.10;
  if (c.includes("Висаджені кущі / дерева")) mult += 0.05;
  high = Math.round(high * mult);
  const note = s.location === "Інше місто/село Одеської області"
    ? "+ виїзд за межі міста (обговорюється індивідуально)"
    : undefined;
  return { text: `${formatUAH(low)} — ${formatUAH(high)} грн`, note };
}

const TOTAL_STEPS = 5;

export function LeadQuiz() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<1 | -1>(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [state, setState] = useState<QuizState>({
    conditions: [], name: "", phone: "", callTime: "",
  });

  const estimate = useMemo(() => calcEstimate(state), [state]);

  function go(next: number) {
    setDir(next > step ? 1 : -1);
    setStep(next);
  }
  function advance() { go(Math.min(step + 1, 6)); }
  function back() { go(Math.max(step - 1, 1)); }

  function pick<K extends keyof QuizState>(k: K, v: QuizState[K], auto = true) {
    setState((s) => ({ ...s, [k]: v }));
    if (auto) setTimeout(() => { setDir(1); setStep((cur) => Math.min(cur + 1, 6)); }, 300);
  }

  function toggleCondition(c: string) {
    setState((s) => ({
      ...s,
      conditions: s.conditions.includes(c)
        ? s.conditions.filter((x) => x !== c)
        : [...s.conditions, c],
    }));
  }

  async function submit() {
    if (state.name.trim().length < 2) return toast.error("Введіть ваше ім'я");
    if (!/^\+?\d[\d\s\-()]{8,}$/.test(state.phone.trim())) return toast.error("Введіть коректний номер телефону");
    setSubmitting(true);
    try {
      const payload = {
        service: state.service ? SERVICE_LABEL[state.service] : null,
        area: state.service === "seasonal"
          ? (state.seasonal ? SEASONAL_LABEL[state.seasonal] : null)
          : (state.area ? AREA_LABEL[state.area] : null),
        location: state.location === "Інше місто/село Одеської області"
          ? `Інше: ${state.locationOther ?? ""}` : state.location,
        timeline: state.timeline,
        conditions: state.conditions,
        estimatedRange: estimate.text,
        name: state.name.trim(),
        phone: state.phone.trim(),
        callTime: state.callTime || "Будь-коли",
        submittedAt: new Date().toISOString(),
      };
      await fetch("/api/submit-lead", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);
      setDone(true);
    } catch {
      toast.error("Щось пішло не так. Спробуйте ще раз.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) return <SuccessScreen />;

  const progress = Math.min(step, TOTAL_STEPS);

  return (
    <div
      className="bg-white text-foreground rounded-[24px] p-5 sm:p-7 shadow-2xl border border-brand-dark/5 max-w-3xl mx-auto w-full flex flex-col overflow-hidden"
      style={{ maxHeight: "calc(100vh - 120px)" }}
    >
      {step <= TOTAL_STEPS && (
        <div className="mb-5 shrink-0">
          <div className="flex items-center justify-between mb-2 min-h-[24px]">
            {step > 1 ? (
              <button onClick={back} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-brand-dark transition-colors">
                <ArrowLeft className="w-4 h-4" /> Назад
              </button>
            ) : <span />}
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Крок {progress} з {TOTAL_STEPS}
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-brand-accent/15 overflow-hidden">
            <div
              className="h-full bg-brand-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(progress / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div key={step} className="animate-fade-in flex-1 min-h-0 overflow-y-auto" style={{ animationDuration: "300ms" }}>
        {step === 1 && <Step1 onPick={(v) => pick("service", v)} value={state.service} />}
        {step === 2 && (state.service === "seasonal"
          ? <Step2Seasonal onPick={(v) => pick("seasonal", v)} value={state.seasonal} />
          : <Step2Area onPick={(v) => pick("area", v)} value={state.area} />)}
        {step === 3 && (
          <Step3Location
            value={state.location}
            otherValue={state.locationOther ?? ""}
            onPick={(v) => {
              if (v === "Інше місто/село Одеської області") {
                setState((s) => ({ ...s, location: v }));
              } else {
                pick("location", v);
              }
            }}
            onOtherChange={(v) => setState((s) => ({ ...s, locationOther: v }))}
            onOtherSubmit={() => { setDir(1); setStep((s) => s + 1); }}
          />
        )}
        {step === 4 && <Step4Timeline onPick={(v) => pick("timeline", v)} value={state.timeline} />}
        {step === 5 && (
          <Step5Conditions
            values={state.conditions}
            onToggle={toggleCondition}
            onNext={() => { setDir(1); setStep(6); }}
          />
        )}
        {step === 6 && (
          <Step6Result
            estimate={estimate}
            state={state}
            setState={setState}
            onSubmit={submit}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
}

/* ----- Option button ----- */
function OptionBtn({
  icon: Icon, title, desc, selected, onClick,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string; desc?: string; selected?: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full text-left rounded-2xl border-2 px-4 sm:px-5 py-4 min-h-[68px] flex items-center gap-4 transition-all hover:-translate-y-0.5 ${
        selected
          ? "border-brand-accent bg-brand-accent/10 shadow-soft"
          : "border-border bg-card hover:border-brand-accent/60 hover:bg-brand-accent/[0.04]"
      }`}
    >
      {Icon && (
        <span className={`grid place-items-center w-11 h-11 rounded-xl shrink-0 transition-colors ${
          selected ? "bg-brand-accent text-white" : "bg-brand-accent/10 text-brand-emerald group-hover:bg-brand-accent group-hover:text-white"
        }`}>
          <Icon className="w-5 h-5" />
        </span>
      )}
      <span className="flex-1 min-w-0">
        <span className="block text-[15px] sm:text-base font-bold text-brand-dark">{title}</span>
        {desc && <span className="block text-[13px] text-muted-foreground mt-0.5">{desc}</span>}
      </span>
      {selected && (
        <span className="grid place-items-center w-6 h-6 rounded-full bg-brand-accent text-white shrink-0">
          <Check className="w-3.5 h-3.5" />
        </span>
      )}
    </button>
  );
}

function StepTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight text-balance">{title}</h3>
      {subtitle && <p className="mt-2 text-[15px] text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

/* ----- Steps ----- */
function Step1({ onPick, value }: { onPick: (v: ServiceKey) => void; value?: ServiceKey }) {
  const opts: { key: ServiceKey; icon: React.ComponentType<{ className?: string }>; title: string; desc: string }[] = [
    { key: "auto", icon: Droplets, title: "Автополив під ключ", desc: "Новий монтаж системи" },
    { key: "repair", icon: Wrench, title: "Ремонт системи", desc: "Усунення несправностей" },
    { key: "seasonal", icon: CalendarCheck, title: "Сезонне обслуговування", desc: "Запуск / консервація" },
    { key: "drip", icon: Sprout, title: "Крапельний полив", desc: "Для саду та теплиці" },
    { key: "lawn", icon: Leaf, title: "Рулонний газон", desc: "Укладка під ключ" },
    { key: "complex", icon: Layers, title: "Комплекс послуг", desc: "Все під ключ" },
  ];
  return (
    <>
      <StepTitle title="Що вас цікавить?" subtitle="Оберіть тип послуги для розрахунку" />
      <div className="grid sm:grid-cols-2 gap-3">
        {opts.map((o) => (
          <OptionBtn key={o.key} icon={o.icon} title={o.title} desc={o.desc}
            selected={value === o.key} onClick={() => onPick(o.key)} />
        ))}
      </div>
    </>
  );
}

function Step2Area({ onPick, value }: { onPick: (v: AreaKey) => void; value?: AreaKey }) {
  const opts: { key: AreaKey; title: string; desc: string }[] = [
    { key: "s3", title: "До 3 соток", desc: "Невелика ділянка" },
    { key: "s3_6", title: "3-6 соток", desc: "Стандартний приватний будинок" },
    { key: "s6_10", title: "6-10 соток", desc: "Великий приватний двір" },
    { key: "s10_20", title: "10-20 соток", desc: "Великий маєток або міні-комерція" },
    { key: "s20+", title: "Понад 20 соток", desc: "Комерційний об'єкт" },
  ];
  return (
    <>
      <StepTitle title="Яка площа ділянки?" subtitle="Приблизний розмір — це нормально" />
      <div className="grid gap-3">
        {opts.map((o) => (
          <OptionBtn key={o.key} title={o.title} desc={o.desc}
            selected={value === o.key} onClick={() => onPick(o.key)} />
        ))}
      </div>
    </>
  );
}

function Step2Seasonal({ onPick, value }: { onPick: (v: SeasonalKey) => void; value?: SeasonalKey }) {
  const opts: { key: SeasonalKey; title: string }[] = [
    { key: "spring", title: "Запуск навесні" },
    { key: "autumn", title: "Консервація восени" },
    { key: "full", title: "Повне річне обслуговування" },
  ];
  return (
    <>
      <StepTitle title="Який обсяг обслуговування?" subtitle="Оберіть один з варіантів" />
      <div className="grid gap-3">
        {opts.map((o) => (
          <OptionBtn key={o.key} title={o.title}
            selected={value === o.key} onClick={() => onPick(o.key)} />
        ))}
      </div>
    </>
  );
}

function Step3Location({
  value, otherValue, onPick, onOtherChange, onOtherSubmit,
}: {
  value?: string; otherValue: string;
  onPick: (v: string) => void;
  onOtherChange: (v: string) => void;
  onOtherSubmit: () => void;
}) {
  const opts = [
    "Одеса (місто)", "Фонтанка", "Совіньон",
    "Лиманка / Крижанівка", "Чорноморка / Великий Дальник",
    "Інше місто/село Одеської області",
  ];
  const isOther = value === "Інше місто/село Одеської області";
  return (
    <>
      <StepTitle title="Де знаходиться ділянка?" subtitle="Працюємо по всій Одеській області" />
      <div className="grid gap-3">
        {opts.map((o) => (
          <OptionBtn key={o} title={o}
            selected={value === o} onClick={() => onPick(o)} />
        ))}
        {isOther && (
          <div className="rounded-2xl border-2 border-brand-accent/40 bg-brand-accent/[0.04] p-4">
            <label className="block text-sm font-semibold text-brand-dark mb-2">
              Вкажіть місто або село
            </label>
            <div className="flex gap-2">
              <input
                value={otherValue}
                onChange={(e) => onOtherChange(e.target.value)}
                placeholder="Наприклад: Усатове"
                maxLength={80}
                className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-[15px] outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />
              <button
                type="button"
                disabled={otherValue.trim().length < 2}
                onClick={onOtherSubmit}
                className="rounded-xl bg-brand-accent text-white px-5 py-3 font-semibold disabled:opacity-50 hover:bg-brand-accent-hover transition-colors"
              >
                Далі
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Step4Timeline({ onPick, value }: { onPick: (v: string) => void; value?: string }) {
  const opts = [
    { icon: Zap, title: "Терміново", desc: "Найближчі 2 тижні" },
    { icon: Calendar, title: "Цього місяця", desc: "Готовий записатись на огляд" },
    { icon: Clock, title: "Найближчі 2-3 місяці", desc: "Планую заздалегідь" },
    { icon: Info, title: "Поки що дізнаюсь", desc: "Збираю інформацію" },
  ];
  return (
    <>
      <StepTitle title="Коли плануєте реалізувати?" subtitle="Це допоможе нам спланувати графік" />
      <div className="grid sm:grid-cols-2 gap-3">
        {opts.map((o) => (
          <OptionBtn key={o.title} icon={o.icon} title={o.title} desc={o.desc}
            selected={value === o.title} onClick={() => onPick(o.title)} />
        ))}
      </div>
    </>
  );
}

function Step5Conditions({
  values, onToggle, onNext,
}: { values: string[]; onToggle: (v: string) => void; onNext: () => void }) {
  const opts = [
    "Газон вже укладений",
    "Газону ще немає",
    "Висаджені кущі / дерева",
    "Є старий полив (потрібно демонтувати)",
    "Чиста ділянка без насаджень",
    "Не знаю / складно сказати",
  ];
  return (
    <>
      <StepTitle title="Що вже є на ділянці?" subtitle="Можна обрати декілька — це впливає на складність і ціну" />
      <div className="grid gap-3">
        {opts.map((o) => (
          <OptionBtn key={o} title={o}
            selected={values.includes(o)} onClick={() => onToggle(o)} />
        ))}
      </div>
      <button
        type="button"
        onClick={onNext}
        disabled={values.length === 0}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-water hover:bg-brand-water-hover text-white py-4 min-h-[52px] text-base font-bold shadow-water transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        Продовжити <ArrowRight className="w-4 h-4" />
      </button>
    </>
  );
}

function Step6Result({
  estimate, state, setState, onSubmit, submitting,
}: {
  estimate: { text: string; note?: string };
  state: QuizState;
  setState: React.Dispatch<React.SetStateAction<QuizState>>;
  onSubmit: () => void;
  submitting: boolean;
}) {
  void estimate;
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight">
          Готово! Ось що ми для вас підготуємо
        </h3>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          {[
            { icon: ClipboardList, title: "Детальний проєкт", desc: "Схема розміщення всіх головок" },
            { icon: Wallet, title: "Прозорий кошторис", desc: "Точна ціна без прихованих доплат" },
            { icon: Car, title: "Безкоштовний виїзд", desc: "Майстер приїде в зручний час" },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-brand-accent/30 bg-brand-light p-3.5">
              <div className="grid place-items-center w-9 h-9 rounded-lg bg-brand-accent text-white">
                <c.icon className="w-4.5 h-4.5" />
              </div>
              <div className="mt-2 text-[14px] font-bold text-brand-dark">{c.title}</div>
              <div className="text-[12px] text-muted-foreground mt-0.5 leading-snug">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="grid gap-3">
          <Field label="Ім'я" required>
            <input
              value={state.name}
              onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
              maxLength={80}
              placeholder="Як до вас звертатись"
              className="w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-[15px] outline-none focus:border-brand-water transition"
            />
          </Field>
          <Field label="Телефон" required>
            <input
              type="tel"
              value={state.phone}
              onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
              maxLength={32}
              placeholder="+380 __ ___ __ __"
              className="w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-[15px] outline-none focus:border-brand-water transition"
            />
          </Field>
          <Field label="Зручний час для дзвінка">
            <select
              value={state.callTime}
              onChange={(e) => setState((s) => ({ ...s, callTime: e.target.value }))}
              className="w-full appearance-none rounded-xl border-2 border-border bg-white px-4 py-3 text-[15px] outline-none focus:border-brand-water transition"
            >
              <option value="">Будь-коли</option>
              <option>До обіду</option>
              <option>Після обіду</option>
              <option>Ввечері після 18:00</option>
            </select>
          </Field>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-water hover:bg-brand-water-hover text-white py-3.5 text-base font-bold shadow-water transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {submitting ? "Відправляємо..." : "Записатись на виїзд"}
          {!submitting && <ArrowRight className="w-4 h-4" />}
        </button>
        <p className="mt-2.5 text-[11px] text-muted-foreground text-center leading-relaxed">
          Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних
        </p>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-brand-dark">
        {label}{required && <span className="text-brand-accent ml-1">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function SuccessScreen() {
  return (
    <div className="bg-background text-foreground rounded-3xl p-7 sm:p-10 shadow-glow border border-white/10 max-w-3xl mx-auto w-full text-center">
      <div className="mx-auto grid place-items-center w-20 h-20 rounded-full bg-brand-accent/15 text-brand-accent animate-scale-in">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <h3 className="mt-6 text-2xl sm:text-3xl font-extrabold text-brand-dark">Дякуємо! Заявка отримана</h3>
      <p className="mt-3 text-muted-foreground">Віталій передзвонить вам протягом 2 годин</p>
      <div className="mt-8 grid sm:grid-cols-3 gap-3">
        {[
          { icon: Phone, title: "Зв'яжемось", desc: "Протягом 2 годин" },
          { icon: Home, title: "Виїдемо безкоштовно", desc: "В будь-який день" },
          { icon: FileText, title: "Підготуємо проєкт", desc: "З точною ціною" },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border border-border bg-card p-5 text-left">
            <div className="grid place-items-center w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-emerald">
              <c.icon className="w-5 h-5" />
            </div>
            <div className="mt-3 text-[15px] font-bold text-brand-dark">{c.title}</div>
            <div className="text-[13px] text-muted-foreground mt-0.5">{c.desc}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-muted-foreground">
        <span>Поки чекаєте — підпишіться на нас в Instagram</span>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-brand-dark text-background px-5 py-2.5 text-sm font-semibold hover:bg-brand-emerald transition-colors"
        >
          <Instagram className="w-4 h-4" /> Instagram
        </a>
      </div>
    </div>
  );
}