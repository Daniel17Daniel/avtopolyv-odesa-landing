import { useEffect, useMemo, useRef, useState } from "react";
import {
  Droplets, Wrench, CalendarCheck, Sprout, Leaf, HelpCircle,
  Zap, Calendar, Clock, Ban, Droplet, Wind, AlertTriangle,
  RefreshCw, Settings, Lightbulb, MapPin, Home, Check,
  FileText, Calculator, Car, Phone, Instagram, Music2, ArrowLeft,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export type PrefilledService =
  | "Новий автополив"
  | "Ремонт існуючої системи"
  | "Сезонне обслуговування"
  | "Крапельний полив"
  | "Рулонний газон"
  | "Поки що дізнаюсь";

interface LeadQuizProps {
  prefilledService?: PrefilledService;
}

type Path = "A" | "B" | "C" | "D";
type ServiceKey =
  | "new_auto" | "repair" | "maintenance" | "drip" | "lawn" | "browsing";

const SERVICES: { key: ServiceKey; label: PrefilledService; sub: string; icon: any; path: Path }[] = [
  { key: "new_auto",   label: "Новий автополив",        sub: "Монтаж під ключ",       icon: Droplets,      path: "A" },
  { key: "repair",     label: "Ремонт існуючої системи", sub: "Усунення поломок",      icon: Wrench,        path: "B" },
  { key: "maintenance",label: "Сезонне обслуговування", sub: "Запуск або консервація", icon: CalendarCheck, path: "C" },
  { key: "drip",       label: "Крапельний полив",       sub: "Для саду та теплиці",   icon: Sprout,        path: "A" },
  { key: "lawn",       label: "Рулонний газон",         sub: "Укладка під ключ",      icon: Leaf,          path: "A" },
  { key: "browsing",   label: "Поки що дізнаюсь",       sub: "Збираю інформацію",     icon: HelpCircle,    path: "D" },
];

const LABEL_TO_KEY: Record<PrefilledService, ServiceKey> = {
  "Новий автополив": "new_auto",
  "Ремонт існуючої системи": "repair",
  "Сезонне обслуговування": "maintenance",
  "Крапельний полив": "drip",
  "Рулонний газон": "lawn",
  "Поки що дізнаюсь": "browsing",
};

const PATH_STEPS: Record<Path, number> = { A: 6, B: 4, C: 3, D: 2 };

const CALL_TIMES = [
  "Будь-коли",
  "До обіду (9:00-12:00)",
  "Обід (12:00-15:00)",
  "Після обіду (15:00-18:00)",
  "Ввечері (18:00-19:00)",
];

type State = {
  service?: ServiceKey;
  area?: string;
  conditions: string[];
  location?: string;
  locationCustom?: string;
  timeline?: string;
  budget?: string;
  problem?: string;
  urgency?: string;
  maintenanceType?: string;
  interests: string[];
  name: string;
  phone: string;
  callTime: string;
  email: string;
};

function formatUaPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").replace(/^380/, "").slice(0, 9);
  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 7),
    digits.slice(7, 9),
  ].filter(Boolean);
  return "+380" + (parts.length ? " " + parts.join(" ") : "");
}

function isValidPhone(p: string) {
  return p.replace(/\D/g, "").length === 12;
}
function isValidEmail(e: string) {
  return !e || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export function LeadQuiz({ prefilledService }: LeadQuizProps) {
  const initialService = prefilledService ? LABEL_TO_KEY[prefilledService] : undefined;
  const [state, setState] = useState<State>({
    service: initialService,
    conditions: [],
    interests: [],
    name: "",
    phone: "",
    callTime: "Будь-коли",
    email: "",
  });
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  // Sync prefilled changes
  useEffect(() => {
    if (prefilledService) {
      setState((s) => ({ ...s, service: LABEL_TO_KEY[prefilledService] }));
      setStep(1);
      setDone(false);
    }
  }, [prefilledService]);

  const path: Path | undefined = state.service ? SERVICES.find((s) => s.key === state.service)!.path : undefined;
  const totalSteps = path ? PATH_STEPS[path] : 6;
  const isContact = path ? step > totalSteps : false;
  const progress = isContact ? 100 : path ? Math.round((step / (totalSteps + 1)) * 100) : Math.round((step / 7) * 100);

  const goNext = () => {
    setAnimKey((k) => k + 1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setAnimKey((k) => k + 1);
    setStep((s) => Math.max(1, s - 1));
  };

  const pickService = (key: ServiceKey) => {
    setState((s) => ({ ...s, service: key }));
    if (!prefilledService) setTimeout(goNext, 250);
  };

  const computeLeadQuality = (): "hot" | "warm" | "cold" => {
    if (path === "D") return "cold";
    const hotTimelines = ["Терміново", "Цього місяця", "Дуже терміново"];
    if ((path === "A" || path === "B") && (hotTimelines.includes(state.timeline || "") || hotTimelines.includes(state.urgency || ""))) {
      return "hot";
    }
    return "warm";
  };

  const submit = async () => {
    if (state.name.trim().length < 2) {
      toast.error("Введіть ім'я (мінімум 2 символи)");
      return;
    }
    if (!isValidPhone(state.phone)) {
      toast.error("Введіть телефон у форматі +380 XX XXX XX XX");
      return;
    }
    if (!isValidEmail(state.email)) {
      toast.error("Некоректний email");
      return;
    }
    setSubmitting(true);
    const payload = {
      path,
      service: state.service ? SERVICES.find((s) => s.key === state.service)!.label : undefined,
      area: state.area,
      conditions: state.conditions.length ? state.conditions : undefined,
      location: state.location,
      locationCustom: state.locationCustom,
      timeline: state.timeline,
      budget: state.budget,
      problem: state.problem,
      urgency: state.urgency,
      maintenanceType: state.maintenanceType,
      interests: state.interests.length ? state.interests : undefined,
      name: state.name.trim(),
      phone: "+" + state.phone.replace(/\D/g, ""),
      callTime: state.callTime,
      email: state.email,
      submittedAt: new Date().toISOString(),
      leadQuality: computeLeadQuality(),
    };
    try {
      // Simulated submission. Replace with real POST when backend is ready.
      await new Promise((r) => setTimeout(r, 800));
      console.log("[LeadQuiz] submit", payload);
      setDone(true);
    } catch {
      toast.error(
        <span>
          Помилка. Спробуйте ще раз або зателефонуйте:{" "}
          <a href="tel:+380930305820" className="font-bold underline">093 030 58 20</a>
        </span> as any
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ───── render ───── */
  if (done) return <Shell><SuccessScreen /></Shell>;

  return (
    <Shell>
      <ProgressBar value={progress} />

      <div key={animKey} className="flex-1 flex flex-col lq-step-in">
        {step === 1 && <Step1 state={state} pickService={pickService} prefilled={!!prefilledService} onNext={goNext} />}
        {path === "A" && step === 2 && <Step2A state={state} setState={setState} onNext={goNext} />}
        {path === "A" && step === 3 && <Step3A state={state} setState={setState} onNext={goNext} />}
        {path === "A" && step === 4 && <Step4A state={state} setState={setState} onNext={goNext} />}
        {path === "A" && step === 5 && <Step5A state={state} setState={setState} onNext={goNext} />}
        {path === "A" && step === 6 && <Step6A state={state} setState={setState} onNext={goNext} onSkip={goNext} />}
        {path === "B" && step === 2 && <Step2B state={state} setState={setState} onNext={goNext} />}
        {path === "B" && step === 3 && <StepAreaLocation state={state} setState={setState} stepNo={3} onNext={goNext} />}
        {path === "B" && step === 4 && <Step4B state={state} setState={setState} onNext={goNext} />}
        {path === "C" && step === 2 && <Step2C state={state} setState={setState} onNext={goNext} />}
        {path === "C" && step === 3 && <StepAreaLocation state={state} setState={setState} stepNo={3} onNext={goNext} />}
        {path === "D" && step === 2 && <Step2D state={state} setState={setState} onNext={goNext} />}
        {isContact && (
          <ContactStep state={state} setState={setState} submit={submit} submitting={submitting} />
        )}

        {/* footer */}
        <div className="mt-auto pt-6 flex items-center justify-between min-h-[52px]">
          {step > 1 ? (
            <button onClick={goBack} className="text-sm font-semibold text-muted-foreground hover:text-brand-dark inline-flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Назад
            </button>
          ) : <span />}
          <span />
        </div>
      </div>
    </Shell>
  );
}

/* ───────── Shared shell ───────── */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[720px] bg-white rounded-[20px] p-6 sm:p-10 flex flex-col"
         style={{ boxShadow: "0 20px 80px -20px rgba(0,0,0,0.12)", minHeight: "560px" }}>
      {children}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[12px]">
        <span className="text-muted-foreground">Займе ~1 хвилину</span>
        <span className="font-bold text-brand-emerald tabular-nums">{value}%</span>
      </div>
      <div className="mt-2 h-1 w-full rounded-full overflow-hidden" style={{ background: "#E5EDDB" }}
           role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
        <div
          className="h-full rounded-full transition-[width] duration-[400ms]"
          style={{
            width: `${value}%`,
            background: "linear-gradient(to right, #8BC34A, #1976D2)",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
    </div>
  );
}

/* ───────── Headers / cards ───────── */
function Head({ eyebrow, question, subtitle }: { eyebrow: string; question: string; subtitle?: string }) {
  return (
    <div className="mt-8">
      <div className="text-[12px] font-bold uppercase tracking-[0.15em]" style={{ color: "#2E7D32" }}>{eyebrow}</div>
      <h3 className="mt-2 text-[22px] sm:text-[28px] font-extrabold leading-tight" style={{ color: "#1B5E20", letterSpacing: "-0.01em" }}>
        {question}
      </h3>
      {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

type OptionCardProps = {
  icon?: any;
  leading?: React.ReactNode;
  title: string;
  subtitle?: string;
  selected?: boolean;
  multi?: boolean;
  trailing?: React.ReactNode;
  onClick: () => void;
};

function OptionCard({ icon: Icon, leading, title, subtitle, selected, multi, trailing, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); }
      }}
      className={`w-full text-left rounded-[14px] px-5 py-4 min-h-[64px] flex items-center gap-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-water ${
        selected
          ? "border-2 bg-[#EFF6FF]"
          : "border-2 bg-white hover:bg-brand-light hover:scale-[1.01]"
      }`}
      style={{
        borderColor: selected ? "#1976D2" : "#E5E7EB",
      }}
    >
      {leading ?? (Icon && (
        <span className="grid place-items-center w-10 h-10 rounded-full bg-brand-light text-brand-emerald shrink-0">
          <Icon className="w-5 h-5" />
        </span>
      ))}
      <span className="flex-1 min-w-0">
        <span className={`block text-[15px] font-bold ${selected ? "text-brand-water" : "text-[#1A1A1A]"}`}>{title}</span>
        {subtitle && <span className="block text-[13px] text-muted-foreground">{subtitle}</span>}
      </span>
      {trailing}
      {multi ? (
        <span className={`grid place-items-center w-6 h-6 rounded-md border-2 transition-all ${selected ? "bg-brand-water border-brand-water" : "border-[#D1D5DB]"}`}>
          {selected && <Check className="w-4 h-4 text-white" />}
        </span>
      ) : (
        <span className={`grid place-items-center w-6 h-6 rounded-full transition-all ${selected ? "bg-brand-water scale-100" : "scale-0"}`}>
          <Check className="w-4 h-4 text-white" />
        </span>
      )}
    </button>
  );
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-water ${
        selected ? "bg-brand-water text-white border-brand-water" : "bg-white text-foreground border-[#E5E7EB] hover:border-brand-accent"
      }`}
    >{label}</button>
  );
}

function ContinueBtn({ disabled, onClick, label = "Продовжити →" }: { disabled?: boolean; onClick: () => void; label?: string }) {
  return (
    <div className="mt-6">
      <button
        type="button" onClick={onClick} disabled={disabled}
        className="inline-flex items-center justify-center rounded-[14px] bg-brand-water text-white px-6 py-3 text-sm font-bold hover:bg-brand-water-hover disabled:opacity-50 transition-colors"
      >{label}</button>
    </div>
  );
}

/* ───────── Steps ───────── */
function Step1({ state, pickService, prefilled, onNext }: { state: State; pickService: (k: ServiceKey) => void; prefilled: boolean; onNext: () => void }) {
  return (
    <>
      <Head eyebrow="Питання 1" question="Що вас цікавить?" subtitle="Оберіть тип послуги" />
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        {SERVICES.map((s) => (
          <OptionCard
            key={s.key}
            icon={s.icon}
            title={s.label}
            subtitle={s.sub}
            selected={state.service === s.key}
            onClick={() => pickService(s.key)}
          />
        ))}
      </div>
      {prefilled && state.service && <ContinueBtn onClick={onNext} />}
    </>
  );
}

function Step2A({ state, setState, onNext }: { state: State; setState: React.Dispatch<React.SetStateAction<State>>; onNext: () => void }) {
  const opts = [
    { v: "До 3 соток",      sub: "Невелика ділянка",            size: 12 },
    { v: "3-6 соток",        sub: "Стандартний приватний будинок", size: 18 },
    { v: "6-10 соток",       sub: "Великий двір",                size: 26 },
    { v: "Понад 10 соток",   sub: "Маєток або міні-комерція",    size: 34 },
    { v: "Не знаю точно",   sub: "Замірим на виїзді",           size: 0 },
  ];
  const pick = (v: string) => { setState((s) => ({ ...s, area: v })); setTimeout(onNext, 250); };
  return (
    <>
      <Head eyebrow="Питання 2" question="Яка площа ділянки?" subtitle="Приблизний розмір — це нормально" />
      <div className="mt-6 flex flex-col gap-3">
        {opts.map((o) => (
          <OptionCard
            key={o.v} title={o.v} subtitle={o.sub} selected={state.area === o.v}
            onClick={() => pick(o.v)}
            leading={
              <span className="flex items-center gap-3 w-14 shrink-0">
                {o.size > 0 ? (
                  <>
                    <span className="rounded-sm" style={{ width: o.size, height: o.size, background: "#2E7D32" }} />
                    <Home className="w-4 h-4 text-muted-foreground" />
                  </>
                ) : (
                  <HelpCircle className="w-6 h-6 text-brand-emerald" />
                )}
              </span>
            }
          />
        ))}
      </div>
    </>
  );
}

function Step3A({ state, setState, onNext }: { state: State; setState: React.Dispatch<React.SetStateAction<State>>; onNext: () => void }) {
  const opts = [
    "Газон уже укладений",
    "Газону ще немає",
    "Висаджені кущі / дерева",
    "Чиста ділянка без насаджень",
    "Є старий полив (потребує демонтажу)",
  ];
  const toggle = (v: string) => setState((s) => ({
    ...s, conditions: s.conditions.includes(v) ? s.conditions.filter((x) => x !== v) : [...s.conditions, v],
  }));
  return (
    <>
      <Head eyebrow="Питання 3" question="Що вже є на ділянці?" subtitle="Можна обрати кілька варіантів" />
      <div className="mt-6 flex flex-col gap-3">
        {opts.map((o) => (
          <OptionCard key={o} title={o} multi selected={state.conditions.includes(o)} onClick={() => toggle(o)} />
        ))}
      </div>
      <ContinueBtn disabled={state.conditions.length === 0} onClick={onNext} />
    </>
  );
}

function Step4A({ state, setState, onNext }: { state: State; setState: React.Dispatch<React.SetStateAction<State>>; onNext: () => void }) {
  const opts = [
    "Одеса (місто)",
    "Фонтанка",
    "Совіньон",
    "Лиманка / Крижанівка",
    "Чорноморка / Великий Дальник",
    "Інше місто/село області",
  ];
  const isOther = state.location === "Інше місто/село області";
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (isOther) inputRef.current?.focus(); }, [isOther]);
  const pick = (v: string) => {
    setState((s) => ({ ...s, location: v, locationCustom: v === "Інше місто/село області" ? s.locationCustom : undefined }));
    if (v !== "Інше місто/село області") setTimeout(onNext, 250);
  };
  const customOk = (state.locationCustom || "").trim().length >= 2;
  return (
    <>
      <Head eyebrow="Питання 4" question="Де знаходиться ділянка?" subtitle="Працюємо по всій Одеській області" />
      <div className="mt-6 flex flex-col gap-3">
        {opts.map((o) => (
          <OptionCard key={o} icon={MapPin} title={o} selected={state.location === o} onClick={() => pick(o)} />
        ))}
        {isOther && (
          <div>
            <input
              ref={inputRef}
              value={state.locationCustom || ""}
              onChange={(e) => setState((s) => ({ ...s, locationCustom: e.target.value }))}
              placeholder="Назва населеного пункту"
              className="w-full rounded-[12px] border border-[#D1D5DB] px-4 py-3.5 text-base focus:outline-none focus:border-brand-water focus:ring-2 focus:ring-brand-water/20"
            />
            {customOk && <ContinueBtn onClick={onNext} />}
          </div>
        )}
      </div>
    </>
  );
}

function Step5A({ state, setState, onNext }: { state: State; setState: React.Dispatch<React.SetStateAction<State>>; onNext: () => void }) {
  const opts = [
    { v: "Терміново",         sub: "Найближчі 2 тижні",         icon: Zap },
    { v: "Цього місяця",      sub: "Готовий записатись на огляд", icon: Calendar },
    { v: "2-3 місяці",        sub: "Планую заздалегідь",          icon: Clock },
    { v: "Поки що дізнаюсь", sub: "Збираю інформацію",           icon: HelpCircle },
  ];
  const pick = (v: string) => { setState((s) => ({ ...s, timeline: v })); setTimeout(onNext, 250); };
  return (
    <>
      <Head eyebrow="Питання 5" question="Коли плануєте реалізувати?" subtitle="Це впливає на пріоритет" />
      <div className="mt-6 flex flex-col gap-3">
        {opts.map((o) => (
          <OptionCard key={o.v} icon={o.icon} title={o.v} subtitle={o.sub} selected={state.timeline === o.v} onClick={() => pick(o.v)} />
        ))}
      </div>
    </>
  );
}

function Step6A({ state, setState, onNext, onSkip }: { state: State; setState: React.Dispatch<React.SetStateAction<State>>; onNext: () => void; onSkip: () => void }) {
  const opts = [
    { v: "До 50 000 грн",          bar: 25 },
    { v: "50 000 — 100 000 грн",  bar: 50 },
    { v: "100 000 — 200 000 грн", bar: 75 },
    { v: "Понад 200 000 грн",      bar: 100 },
    { v: "Не знаю — порадьте",     bar: -1 },
  ];
  const pick = (v: string) => { setState((s) => ({ ...s, budget: v })); setTimeout(onNext, 250); };
  return (
    <>
      <Head eyebrow="Питання 6 — необов'язково" question="Орієнтовний бюджет?" subtitle="Це необов'язково — пропустіть якщо невпевнені" />
      <div className="mt-6 flex flex-col gap-3">
        {opts.map((o) => (
          <OptionCard
            key={o.v} title={o.v} selected={state.budget === o.v} onClick={() => pick(o.v)}
            trailing={
              <span className="hidden sm:inline-flex items-center w-24 mr-2">
                {o.bar >= 0 ? (
                  <span className="block h-1.5 w-full rounded-full bg-brand-light overflow-hidden">
                    <span className="block h-full bg-brand-water" style={{ width: `${o.bar}%` }} />
                  </span>
                ) : (
                  <Lightbulb className="w-5 h-5 text-brand-emerald ml-auto" />
                )}
              </span>
            }
          />
        ))}
      </div>
      <div className="mt-4 text-center">
        <button onClick={onSkip} className="text-sm text-muted-foreground hover:text-brand-dark underline">
          Пропустити крок
        </button>
      </div>
    </>
  );
}

function Step2B({ state, setState, onNext }: { state: State; setState: React.Dispatch<React.SetStateAction<State>>; onNext: () => void }) {
  const opts = [
    { v: "Не вмикається взагалі",      icon: Ban },
    { v: "Тече / прорвало трубу",       icon: Droplet },
    { v: "Деякі зони не поливаються",   icon: Sprout },
    { v: "Слабкий тиск / нерівномірно", icon: Wind },
    { v: "Точно не знаю — потрібна діагностика", icon: HelpCircle },
  ];
  const pick = (v: string) => { setState((s) => ({ ...s, problem: v })); setTimeout(onNext, 250); };
  return (
    <>
      <Head eyebrow="Питання 2" question="Що сталось з системою?" subtitle="Виберіть найближче" />
      <div className="mt-6 flex flex-col gap-3">
        {opts.map((o) => (
          <OptionCard key={o.v} icon={o.icon} title={o.v} selected={state.problem === o.v} onClick={() => pick(o.v)} />
        ))}
      </div>
    </>
  );
}

function Step4B({ state, setState, onNext }: { state: State; setState: React.Dispatch<React.SetStateAction<State>>; onNext: () => void }) {
  const opts = [
    { v: "Дуже терміново", sub: "Сьогодні-завтра",  icon: AlertTriangle },
    { v: "Цього тижня",    sub: "",                  icon: Zap },
    { v: "На наступному тижні", sub: "",             icon: Calendar },
    { v: "Не горить",      sub: "",                  icon: Clock },
  ];
  const pick = (v: string) => { setState((s) => ({ ...s, urgency: v })); setTimeout(onNext, 250); };
  return (
    <>
      <Head eyebrow="Питання 4" question="Наскільки терміново?" />
      <div className="mt-6 flex flex-col gap-3">
        {opts.map((o) => (
          <OptionCard key={o.v} icon={o.icon} title={o.v} subtitle={o.sub || undefined} selected={state.urgency === o.v} onClick={() => pick(o.v)} />
        ))}
      </div>
    </>
  );
}

function Step2C({ state, setState, onNext }: { state: State; setState: React.Dispatch<React.SetStateAction<State>>; onNext: () => void }) {
  const opts = [
    { v: "Запуск навесні",              sub: "Перевірка після зими", icon: Sprout },
    { v: "Консервація восени",          sub: "Підготовка до зими",   icon: Leaf },
    { v: "Повне річне обслуговування", sub: "",                      icon: RefreshCw },
    { v: "Профілактика і налаштування", sub: "",                     icon: Settings },
  ];
  const pick = (v: string) => { setState((s) => ({ ...s, maintenanceType: v })); setTimeout(onNext, 250); };
  return (
    <>
      <Head eyebrow="Питання 2" question="Що саме потрібно?" />
      <div className="mt-6 flex flex-col gap-3">
        {opts.map((o) => (
          <OptionCard key={o.v} icon={o.icon} title={o.v} subtitle={o.sub || undefined} selected={state.maintenanceType === o.v} onClick={() => pick(o.v)} />
        ))}
      </div>
    </>
  );
}

function Step2D({ state, setState, onNext }: { state: State; setState: React.Dispatch<React.SetStateAction<State>>; onNext: () => void }) {
  const opts = [
    "Орієнтовні ціни",
    "Як проходить монтаж",
    "Які бренди використовуєте",
    "Що входить в гарантію",
    "Просто подивитись роботи",
  ];
  const toggle = (v: string) => setState((s) => ({
    ...s, interests: s.interests.includes(v) ? s.interests.filter((x) => x !== v) : [...s.interests, v],
  }));
  return (
    <>
      <Head eyebrow="Питання 2" question="Що вам цікаво дізнатись?" subtitle="Підкажемо коротко і покажемо приклади" />
      <div className="mt-6 flex flex-col gap-3">
        {opts.map((o) => (
          <OptionCard key={o} title={o} multi selected={state.interests.includes(o)} onClick={() => toggle(o)} />
        ))}
      </div>
      <ContinueBtn disabled={state.interests.length === 0} onClick={onNext} />
    </>
  );
}

function StepAreaLocation({ state, setState, stepNo, onNext }: { state: State; setState: React.Dispatch<React.SetStateAction<State>>; stepNo: number; onNext: () => void }) {
  const areas = ["До 3", "3-6", "6-10", "10+", "?"];
  const locations = ["Одеса", "Фонтанка", "Совіньон", "Лиманка", "Чорноморка", "Інше"];
  const ok = !!state.area && !!state.location;
  return (
    <>
      <Head eyebrow={`Питання ${stepNo}`} question="Розкажіть про вашу систему" />
      <div className="mt-6 space-y-6">
        <div>
          <div className="text-sm font-bold text-brand-dark mb-3">Приблизна площа (соток)</div>
          <div className="flex flex-wrap gap-2">
            {areas.map((a) => <Chip key={a} label={a} selected={state.area === a} onClick={() => setState((s) => ({ ...s, area: a }))} />)}
          </div>
        </div>
        <div>
          <div className="text-sm font-bold text-brand-dark mb-3">Локація</div>
          <div className="flex flex-wrap gap-2">
            {locations.map((l) => <Chip key={l} label={l} selected={state.location === l} onClick={() => setState((s) => ({ ...s, location: l }))} />)}
          </div>
        </div>
      </div>
      <ContinueBtn disabled={!ok} onClick={onNext} />
    </>
  );
}

/* ───────── Contact ───────── */
function ContactStep({ state, setState, submit, submitting }: {
  state: State; setState: React.Dispatch<React.SetStateAction<State>>; submit: () => void; submitting: boolean;
}) {
  const valueCards = [
    { icon: FileText,   bg: "bg-green-100", color: "text-brand-emerald", title: "Детальний проєкт",   text: "Схема всіх головок" },
    { icon: Calculator, bg: "bg-blue-100",  color: "text-brand-water",   title: "Прозорий кошторис",  text: "Точна ціна без сюрпризів" },
    { icon: Car,        bg: "bg-green-100", color: "text-brand-emerald", title: "Безкоштовний виїзд", text: "Майстер приїде в зручний час" },
  ];
  const onPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((s) => ({ ...s, phone: formatUaPhone(e.target.value) }));
  };
  const onPhoneFocus = () => {
    if (!state.phone) setState((s) => ({ ...s, phone: "+380 " }));
  };
  return (
    <>
      <Head eyebrow="Останній крок" question="Готово! Зараз створимо для вас:" />
      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        {valueCards.map((c) => (
          <div key={c.title} className="rounded-xl bg-brand-light p-4">
            <span className={`grid place-items-center w-10 h-10 rounded-full ${c.bg}`}>
              <c.icon className={`w-5 h-5 ${c.color}`} />
            </span>
            <div className="mt-3 text-sm font-bold text-brand-dark">{c.title}</div>
            <div className="text-xs text-muted-foreground">{c.text}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#EFF6FF] text-brand-water px-4 py-2 text-sm font-semibold">
          <Clock className="w-4 h-4" /> Передзвонимо протягом 2 годин
        </span>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); submit(); }}
        className="mt-8 flex flex-col gap-4"
        aria-live="polite"
      >
        <Field id="lq-name" label="Ваше ім'я *" required>
          <input
            id="lq-name" type="text" value={state.name}
            onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
            placeholder="Олег" aria-required
            className="lq-input"
          />
        </Field>
        <Field id="lq-phone" label="Телефон *" required>
          <input
            id="lq-phone" type="tel" inputMode="tel" value={state.phone}
            onFocus={onPhoneFocus} onChange={onPhone}
            placeholder="+380 __ ___ __ __" aria-required
            className="lq-input"
          />
        </Field>
        <Field id="lq-time" label="Зручний час для дзвінка *" required>
          <select
            id="lq-time" value={state.callTime}
            onChange={(e) => setState((s) => ({ ...s, callTime: e.target.value }))}
            aria-required className="lq-input"
          >
            {CALL_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field id="lq-email" label="Email" helper="Для смети в PDF — необов'язково">
          <input
            id="lq-email" type="email" value={state.email}
            onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
            placeholder="your@email.com" className="lq-input"
          />
        </Field>

        <button
          type="submit" disabled={submitting}
          className="mt-2 w-full sm:w-auto sm:self-start inline-flex items-center justify-center gap-2 bg-brand-water text-white rounded-[14px] h-14 px-7 text-base font-bold hover:bg-brand-water-hover hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all"
        >
          {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Відправляємо...</> : "Записатись на безкоштовний виїзд →"}
        </button>
        <p className="text-xs text-muted-foreground text-center">
          Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних
        </p>
      </form>
    </>
  );
}

function Field({ id, label, helper, required, children }: { id: string; label: string; helper?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-brand-dark">{label}</label>
      {helper && <div className="text-xs text-muted-foreground mt-0.5">{helper}</div>}
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

/* ───────── Success ───────── */
function SuccessScreen() {
  const timeline = [
    { icon: Phone,    label: "Дзвонок", sub: "Протягом 2 годин" },
    { icon: FileText, label: "План",    sub: "Детальний проєкт" },
    { icon: Car,      label: "Виїзд",   sub: "Безкоштовно" },
  ];
  return (
    <div className="flex-1 flex flex-col items-center text-center">
      <div className="mt-8 grid place-items-center w-20 h-20 rounded-full bg-brand-emerald lq-success-bounce">
        <Check className="w-10 h-10 text-white" strokeWidth={3} />
      </div>
      <h2 className="mt-6 text-[28px] font-extrabold text-brand-dark">Дякуємо! Заявка отримана</h2>
      <p className="mt-2 text-base text-muted-foreground">Віталій передзвонить вам протягом 2 годин</p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 w-full max-w-md">
        {timeline.map((t, i) => (
          <div key={t.label} className="flex items-center w-full sm:w-auto sm:flex-1">
            <div className="flex-1 flex flex-col items-center">
              <span className="grid place-items-center w-12 h-12 rounded-full bg-brand-light text-brand-water">
                <t.icon className="w-5 h-5" />
              </span>
              <div className="mt-2 text-sm font-bold text-brand-dark">{t.label}</div>
              <div className="text-xs text-muted-foreground">{t.sub}</div>
            </div>
            {i < timeline.length - 1 && <div className="hidden sm:block flex-1 border-t border-dashed border-[#D1D5DB]" />}
          </div>
        ))}
      </div>

      <div className="mt-10 w-full relative">
        <div className="border-t border-border" />
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 text-xs text-muted-foreground">Поки чекаєте на дзвінок</span>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-3 w-full">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
           className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 hover:border-brand-water transition-colors">
          <span className="grid place-items-center w-10 h-10 rounded-full text-white" style={{ background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
            <Instagram className="w-5 h-5" />
          </span>
          <span className="text-left">
            <span className="block text-sm font-bold text-brand-dark">Подивіться роботи</span>
            <span className="block text-xs text-muted-foreground">100+ об'єктів в Instagram</span>
          </span>
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
           className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 hover:border-brand-water transition-colors">
          <span className="grid place-items-center w-10 h-10 rounded-full bg-black text-white">
            <Music2 className="w-5 h-5" />
          </span>
          <span className="text-left">
            <span className="block text-sm font-bold text-brand-dark">Корисні відео</span>
            <span className="block text-xs text-muted-foreground">Поради про полив в TikTok</span>
          </span>
        </a>
      </div>

      <button className="hidden mt-8">Закрити</button>
    </div>
  );
}