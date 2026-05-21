import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Phone, MessageCircle, Send, MapPin, Clock, Instagram, ArrowRight, ArrowDown,
  Menu, X, ChevronDown, ChevronUp, Facebook, Music2, Check,
  Star, Droplets, TrendingUp,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { LeadQuiz, type PrefilledService } from "@/components/LeadQuiz";
import logoImg from "@/assets/garden-keeper-logo.jpg";
import heroImg from "@/assets/hero-sprinkler.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Garden Keeper — Автополив в Одесі з 2011 року" },
      { name: "description", content: "Системи автополиву, крапельного зрошення та рулонний газон в Одесі та області. Hunter, Rain Bird, Irritec. Гарантія до 3 років." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Garden Keeper — Автополив Одеса",
        image: heroImg,
        telephone: "+380930305820",
        address: { "@type": "PostalAddress", addressLocality: "Одеса", addressCountry: "UA" },
        areaServed: "Одеська область",
        priceRange: "$$",
      }),
    }],
  }),
});

const PHONE_PRIMARY = "093 030 58 20";
const PHONE_PRIMARY_TEL = "+380930305820";
const PHONE_SECONDARY = "099 320 98 41";
const PHONE_SECONDARY_TEL = "+380993209841";

function LandingPage() {
  useReveal();
  useScrollProgress();
  const [prefilledService, setPrefilledService] = useState<PrefilledService | undefined>(undefined);
  const quizSectionRef = useRef<HTMLElement | null>(null);

  const triggerQuiz = (svc: PrefilledService) => {
    setPrefilledService(svc);
    quizSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      const card = document.querySelector("#quiz [data-quiz-card]");
      if (card) {
        card.classList.add("quiz-pulse");
        setTimeout(() => card.classList.remove("quiz-pulse"), 1600);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-[68px] md:pb-0">
      <div className="scroll-progress" id="scroll-progress" />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <Portfolio />
        <Services onPick={triggerQuiz} />
        <BeforeAfter />
        <Process />
        <SavingsTeaser />
        <Reviews />
        <Team />
        <WhyUs />
        <PhotoStrip />
        <QuizSection ref={quizSectionRef} prefilledService={prefilledService} />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingChat />
      <ScrollToTop />
      <MobileBottomBar />
    </div>
  );
}

/* ───────────── hooks ───────────── */
function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = `${pct}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ───────────── HEADER ───────────── */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const nav = [
    { href: "#services", label: "Послуги" },
    { href: "#process", label: "Як працюємо" },
    { href: "#why", label: "Чому ми" },
    { href: "#contact", label: "Контакти" },
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_24px_-10px_rgba(27,94,32,0.25)]" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 sm:h-20 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoImg} alt="Garden Keeper" className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-brand-accent/40" />
          <span className="flex flex-col leading-tight">
            <span className={`text-[16px] sm:text-[18px] font-extrabold tracking-tight ${scrolled ? "text-brand-dark" : "text-white"}`}>Garden Keeper</span>
            <span className={`text-[11px] font-medium uppercase tracking-[0.18em] hidden sm:block ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>Автополив · Одеса</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((n) => (
            <a key={n.href} href={n.href}
               className={`text-sm font-semibold transition-colors ${scrolled ? "text-foreground/80 hover:text-brand-water" : "text-white/90 hover:text-white"}`}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${PHONE_PRIMARY_TEL}`}
             className={`hidden md:inline-flex items-center gap-2 text-sm font-semibold ${scrolled ? "text-brand-dark" : "text-white"}`}>
            <Phone className={`w-4 h-4 phone-pulse ${scrolled ? "text-brand-water" : "text-brand-accent"}`} />
            {PHONE_PRIMARY}
          </a>
          <a href="#quiz"
             className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-water text-white px-5 py-2.5 text-sm font-bold hover:bg-brand-water-hover active:scale-[0.97] transition-all shadow-water ripple">
            Розрахунок
          </a>
          <a href={`tel:${PHONE_PRIMARY_TEL}`}
             className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-water text-white" aria-label="Подзвонити">
            <Phone className="w-4 h-4" />
          </a>
          <button onClick={() => setOpen((v) => !v)}
                  className={`lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border ${scrolled ? "border-border text-brand-dark" : "border-white/40 text-white"}`}
                  aria-label="Меню">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container-x py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}
                 className="py-3 text-base font-medium text-foreground/90">{n.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ───────────── HERO ───────────── */
function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden noise-overlay">
      <img src={heroImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover -z-10" />
      {/* Overlay */}
      <div className="absolute inset-0 -z-10 opacity-90" style={{ background: "linear-gradient(135deg, #0f3d20 0%, #1B5E20 50%, #1976D2 100%)" }} />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(135deg, rgba(27,94,32,0.85) 0%, rgba(25,118,210,0.45) 100%)" }}
      />
      {/* Blob */}
      <svg className="absolute -bottom-1 left-0 right-0 w-full text-background" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,48 C360,72 1080,24 1440,56 L1440,80 L0,80 Z" />
      </svg>

      <div className="relative h-full container-x flex flex-col justify-center items-center text-center text-white pt-16">
        <span className="glass rounded-full pl-3 pr-4 py-1.5 text-[11px] font-semibold uppercase text-white inline-flex items-center gap-2" style={{ letterSpacing: "0.18em" }}>
          <span aria-hidden className="w-2 h-2 rounded-full bg-brand-accent" />
          Автополив в Одесі з 2011
        </span>

        <h1 className="mt-6 font-display text-[clamp(2.6rem,8vw,6.5rem)] text-balance" style={{ fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.95 }}>
          <span className="word-rise mr-3" style={{ animationDelay: "0.15s" }}>Ваш сад</span>
          <span className="word-rise mr-3 italic text-brand-accent" style={{ animationDelay: "0.40s", fontWeight: 600 }}>завжди</span>
          <span className="word-rise" style={{ animationDelay: "0.65s" }}>зеленим</span>
        </h1>

        <p className="mt-8 max-w-2xl text-base sm:text-lg font-normal text-white/80 word-rise" style={{ animationDelay: "1.1s" }}>
          Системи автополиву під ключ. Hunter, Rain Bird, Irritec. 14 років в Одесі.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 word-rise" style={{ animationDelay: "1.3s" }}>
          <a href="#quiz"
             className="ripple inline-flex items-center justify-center gap-2 rounded-full bg-white text-brand-dark px-7 py-4 min-h-[52px] text-base font-bold border border-transparent shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white">
            Розрахувати вартість
          </a>
          <a href="#process"
             className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 text-white px-7 py-4 min-h-[52px] text-base font-bold hover:bg-white/10 hover:border-white transition-all duration-200">
            Як ми працюємо →
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 word-rise" style={{ animationDelay: "1.5s" }}>
          {["14 років досвіду", "100+ об'єктів", "Гарантія 3 роки"].map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-[13px] font-medium text-white">
              <Check className="w-3 h-3 text-brand-accent" strokeWidth={2.5} /> {t}
            </li>
          ))}
        </ul>

        <a href="#services" className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 hover:text-white scroll-bounce" aria-label="Прокрутити">
          <ArrowDown className="w-6 h-6" strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
}

/* ───────────── SERVICES (3 large panels) ───────────── */
function Services({ onPick }: { onPick: (svc: PrefilledService) => void }) {
  const items = [
    { n: "01", title: "Автоматичний полив", svc: "Новий автополив" as PrefilledService,
      bullets: ["Проєктування під ваш участок", "Монтаж за 3-7 днів", "Обладнання Hunter / Rain Bird"] },
    { n: "02", title: "Крапельне зрошення", svc: "Крапельний полив" as PrefilledService,
      bullets: ["Точкова подача до кожної рослини", "Економія до 70% води", "Для клумб, кущів, теплиць"] },
    { n: "03", title: "Рулонний газон", svc: "Рулонний газон" as PrefilledService,
      bullets: ["Готовий газон за один день", "Якісний дерн з гарантією", "Автополив у комплексі"] },
  ];
  return (
    <section id="services" className="relative py-20 lg:py-28 bg-background">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Послуги</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight text-balance">
            Три напрямки. <span className="text-brand-water">Один підхід.</span>
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {items.map((s, i) => (
            <article
              key={s.n}
              role="button" tabIndex={0}
              onClick={() => onPick(s.svc)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick(s.svc); } }}
              className="reveal noise-overlay group relative overflow-hidden p-8 min-h-[280px] flex flex-col justify-between text-white transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-water"
              style={{
                background: "linear-gradient(140deg, #0f3d20 0%, #1B5E20 60%, #2E7D32 100%)",
                transitionDelay: `${i * 80}ms`,
                borderRadius: "22px",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "18px 18px" }}
              />
              <span className="absolute top-4 right-6 font-display text-[96px] leading-none text-brand-earth-light/40 group-hover:text-brand-earth-light/80 transition-colors duration-500 tabular-nums" style={{ fontWeight: 700, letterSpacing: "-0.04em" }}>
                {s.n}
              </span>
              <div className="relative">
                <h3 className="text-2xl font-extrabold tracking-tight">{s.title}</h3>
                <ul className="mt-5 space-y-2 text-[14px] text-white/80">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-brand-accent shrink-0" strokeWidth={1.5} /> {b}</li>
                  ))}
                </ul>
              </div>
              <span className="relative inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-accent/80 group-hover:gap-3 transition-all">
                Натисніть для розрахунку <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── STATS ───────────── */
function Stats() {
  const items = [
    { v: 14, suffix: "", label: "років на ринку" },
    { v: 100, suffix: "+", label: "реалізованих об'єктів" },
    { v: 3, suffix: "", label: "роки гарантії" },
    { v: 2, suffix: "", label: "години до передзвону" },
  ];
  return (
    <section className="relative py-16 lg:py-20 text-white overflow-hidden noise-overlay" style={{ background: "linear-gradient(135deg, #0F3D2E 0%, #1B5E20 50%, #2E7D32 100%)" }}>
      <div className="container-x relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {items.map((it, i) => (
            <div key={i} className="px-4 py-6 text-center reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tabular-nums" style={{ letterSpacing: "-0.03em" }}>
                <Counter to={it.v} />{it.suffix}
              </div>
              <div className="mt-3 text-[12px] sm:text-[13px] uppercase text-white/60 font-semibold" style={{ letterSpacing: "0.2em" }}>{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1500;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

/* ───────────── QUIZ SECTION ───────────── */
const QuizSection = React.forwardRef<HTMLElement, { prefilledService?: PrefilledService }>(function QuizSection(
  { prefilledService }, ref,
) {
  return (
    <section ref={ref} id="quiz" className="relative bg-brand-light py-16 lg:py-20 overflow-hidden">
      <div className="absolute -top-16 left-0 right-0 h-20 bg-brand-light" aria-hidden />
      <svg className="absolute top-0 left-0 right-0 w-full text-brand-light -mt-px" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,32 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
      <div className="container-x relative">
        <div className="reveal max-w-2xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Готові почати?</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight text-balance" style={{ letterSpacing: "-0.02em" }}>
            Розрахуйте проєкт <span className="text-brand-water">за 1 хвилину</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
            Без зобов'язань. Після опитування підготуємо персональну пропозицію.
          </p>
        </div>
        <div className="reveal mt-8" data-quiz-card>
          <LeadQuiz prefilledService={prefilledService} />
        </div>
      </div>
    </section>
  );
});

/* ───────────── PROCESS (timeline) ───────────── */
function Process() {
  const steps = [
    { n: "1", title: "Залишаєте заявку", desc: "Передзвонимо протягом 2 годин", water: true },
    { n: "2", title: "Безкоштовний виїзд", desc: "Оглядаємо ділянку, обговорюємо", water: false },
    { n: "3", title: "Проєкт та кошторис", desc: "Без прихованих доплат", water: true },
    { n: "4", title: "Монтаж та запуск", desc: "Здаємо в строк, навчаємо", water: false },
  ];
  return (
    <section id="process" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: "var(--brand-cream)" }}>
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Процес</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight text-balance">
            Як ми <span className="text-brand-water">працюємо</span>
          </h2>
        </div>

        <div className="relative mt-16">
          <div aria-hidden className="absolute left-6 top-0 bottom-0 border-l border-dashed md:left-1/2" style={{ borderColor: "var(--brand-stone)" }} />
          <div className="space-y-12">
            {steps.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <div key={s.n} className="reveal relative md:grid md:grid-cols-2 md:gap-12" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className={`pl-16 md:pl-0 ${right ? "md:col-start-2 md:pl-12" : "md:col-start-1 md:text-right md:pr-12"}`}>
                    <h3 className="font-display text-2xl text-brand-dark" style={{ fontWeight: 700 }}>{s.title}</h3>
                    <p className="mt-2 text-[15px] text-muted-foreground">{s.desc}</p>
                  </div>
                  <div
                    className={`absolute left-0 top-0 grid place-items-center w-12 h-12 rounded-full font-display text-white text-lg ring-4 shadow-md ${
                      s.water ? "bg-brand-water" : "bg-brand-accent"
                    } md:left-1/2 md:-translate-x-1/2`}
                    style={{ fontWeight: 700, ["--tw-ring-color" as any]: "var(--brand-cream)" }}
                  >
                    {s.n}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── WHY US (asymmetric + accordion) ───────────── */
function WhyUs() {
  const items = [
    { q: "Індивідуальний підхід", a: "Кожен проєкт під конкретну ділянку. Враховуємо рельєф, рослини і тиск." },
    { q: "Лише перевірені бренди", a: "Hunter та Rain Bird — світовий стандарт надійності." },
    { q: "Прозора ціна", a: "Кошторис до копійки, без сюрпризів у процесі." },
    { q: "Гарантія до 3 років", a: "На роботи та обладнання." },
    { q: "Підтримка після здачі", a: "Не зникаємо після монтажу." },
  ];
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="why" className="py-20 lg:py-28 bg-brand-light relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-brand-accent/15 blur-3xl" />
      <div className="container-x relative grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">
        <div className="reveal">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Чому ми</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight leading-[1.05]">
            Робимо як <br /> <span className="text-brand-water">для себе.</span><br /> З 2011 року.
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Hunter", "Rain Bird", "Irritec"].map((b) => (
              <span key={b} className="inline-flex items-center rounded-lg bg-brand-dark text-white px-3.5 py-2 text-sm font-bold tracking-wide">
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="reveal divide-y divide-brand-dark/10 border-y border-brand-dark/10">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q}>
                <button onClick={() => setOpen(isOpen ? -1 : i)}
                        className="w-full py-5 flex items-center justify-between gap-6 text-left">
                  <span className={`text-lg font-bold transition-colors ${isOpen ? "text-brand-water" : "text-brand-dark"}`}>{it.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? "rotate-180 text-brand-water" : "text-brand-dark"}`} />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="text-[15px] leading-relaxed text-muted-foreground pr-8">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── FAQ ───────────── */
function Faq() {
  const items = [
    { q: "Скільки коштує автополив в Одесі?", a: "Вартість залежить від розміру ділянки, складності рельєфу та обраного обладнання. Точну ціну скажемо після безкоштовного виїзду та замірів." },
    { q: "Скільки часу займає монтаж?", a: "Для типової ділянки 5-10 соток — від 3 до 7 днів. Точні терміни узгоджуємо після проєктування." },
    { q: "Чи можна встановити автополив після укладання газону?", a: "Так, але це складніше і дорожче. Краще робити перед укладанням газону." },
    { q: "Яка гарантія на роботи?", a: "На обладнання — гарантія виробника (до 5 років). На наші роботи — до 3 років." },
    { q: "Як готувати систему до зими?", a: "Робимо консервацію восени — продуваємо систему стисненим повітрям." },
    { q: "Чи працюєте за межами Одеси?", a: "Так, виїжджаємо по всій Одеській області." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-x max-w-3xl">
        <div className="reveal">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">FAQ</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">Часті питання</h2>
        </div>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className="reveal">
                <button onClick={() => setOpen(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-6 py-6 text-left">
                  <span className={`text-base sm:text-lg font-semibold ${isOpen ? "text-brand-water" : "text-brand-dark"}`}>{it.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? "rotate-180 text-brand-water" : "text-brand-dark"}`} />
                </button>
                <div className={`grid transition-all duration-400 ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="text-[15px] leading-relaxed text-muted-foreground pr-8">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── CONTACT ───────────── */
function Contact() {
  return (
    <section id="contact" className="grid lg:grid-cols-[45fr_55fr]">
      <div className="relative animated-gradient text-white p-8 sm:p-12 lg:p-16 overflow-hidden">
        <div className="reveal max-w-md">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-accent">Контакти</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight">Зв'яжіться з нами</h2>
          <p className="mt-4 text-white/75">Передзвонимо протягом 2 годин у робочий час.</p>

          <div className="mt-8 space-y-4">
            <ContactCard icon={Phone} label="Віталій" value={`+38 ${PHONE_PRIMARY}`} href={`tel:${PHONE_PRIMARY_TEL}`} />
            <ContactCard icon={Phone} label="Максим" value={`+38 ${PHONE_SECONDARY}`} href={`tel:${PHONE_SECONDARY_TEL}`} />
            <div className="glass rounded-2xl px-5 py-4 inline-flex items-center gap-3">
              <Clock className="w-5 h-5 text-brand-accent" />
              <span className="font-semibold">Пн–Сб: 9:00 — 19:00</span>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            {[
              { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
              { href: "https://tiktok.com", icon: Music2, label: "TikTok" },
              { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                 className="grid place-items-center w-11 h-11 rounded-full glass hover:bg-white/20 transition-colors">
                <s.icon className="w-5 h-5 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="relative min-h-[420px]">
        <iframe
          title="Garden Keeper Одеса на карті"
          src="https://www.google.com/maps?q=Odesa,Ukraine&output=embed"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon, label, value, href,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href: string }) {
  return (
    <a href={href} className="glass rounded-2xl px-5 py-4 flex items-center gap-4 hover:bg-white/15 transition-colors block">
      <div className="grid place-items-center w-11 h-11 rounded-xl bg-brand-accent/30 text-white">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-white/60 font-semibold">{label}</div>
        <div className="text-lg font-bold">{value}</div>
      </div>
    </a>
  );
}

/* ───────────── FOOTER ───────────── */
function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-x py-14 grid gap-10 md:grid-cols-3">
        <div>
          <a href="#top" className="flex items-center gap-3">
            <img src={logoImg} alt="Garden Keeper" className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-accent/40" />
            <span className="text-xl font-extrabold tracking-tight">Garden Keeper</span>
          </a>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">Системи автополиву з 2011 року.<br />Одеса та Одеська область.</p>
          <div className="mt-5 flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-brand-accent transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-brand-accent transition-colors">
              <Music2 className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-brand-accent transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-accent">Навігація</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li><a href="#services" className="hover:text-brand-accent">Послуги</a></li>
              <li><a href="#process" className="hover:text-brand-accent">Процес</a></li>
              <li><a href="#why" className="hover:text-brand-accent">Чому ми</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-accent">Більше</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li><a href="#quiz" className="hover:text-brand-accent">Калькулятор</a></li>
              <li><a href="#contact" className="hover:text-brand-accent">Контакти</a></li>
              <li><a href="#" className="hover:text-brand-accent">Політика</a></li>
            </ul>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-brand-accent">Контакти</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            <li><a href={`tel:${PHONE_PRIMARY_TEL}`} className="hover:text-brand-accent">Віталій: +38 {PHONE_PRIMARY}</a></li>
            <li><a href={`tel:${PHONE_SECONDARY_TEL}`} className="hover:text-brand-accent">Максим: +38 {PHONE_SECONDARY}</a></li>
            <li>Пн–Сб: 9:00 — 19:00</li>
            <li>Одеса та область</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-white/60 flex flex-wrap items-center justify-between gap-3">
          <span>© 2026 Garden Keeper. Всі права захищені.</span>
          <a href="#" className="hover:text-brand-accent">Політика конфіденційності</a>
        </div>
      </div>
    </footer>
  );
}

/* ───────────── TRUST BAR ───────────── */
function TrustBar() {
  const brands = ["HUNTER", "RAIN BIRD", "IRRITEC"];
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-x text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
          Працюємо з перевіреними брендами
        </p>
        <div className="mt-6 flex items-center justify-center flex-wrap gap-x-8 sm:gap-x-12 gap-y-4">
          {brands.map((b, i) => (
            <div key={b} className="flex items-center gap-x-8 sm:gap-x-12">
              <span
                className="text-[18px] sm:text-[24px] font-black opacity-50 hover:opacity-100 transition-opacity duration-200"
                style={{ color: "#1A1A1A", letterSpacing: "-0.02em" }}
              >
                {b}
              </span>
              {i < brands.length - 1 && <span aria-hidden className="w-px h-10 bg-[#E5E7EB]" />}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Офіційне обладнання з гарантією виробника до 5 років
        </p>
      </div>
    </section>
  );
}

/* ───────────── PORTFOLIO ───────────── */
function Portfolio() {
  const items = [
    { src: portfolio1, location: "Совіньон", type: "Автополив, 8 соток", span: "md:col-span-2" },
    { src: portfolio2, location: "Фонтанка", type: "Hunter система", span: "" },
    { src: portfolio3, location: "Лиманка", type: "Крапельний полив", span: "" },
    { src: portfolio4, location: "Чорноморка", type: "Туї + полив", span: "" },
    { src: portfolio5, location: "Одеса", type: "Рулонний газон", span: "md:col-span-2" },
    { src: portfolio6, location: "Совіньон", type: "Комплекс", span: "" },
  ];
  return (
    <section id="portfolio" className="py-20 lg:py-32" style={{ background: "var(--brand-cream)" }}>
      <div className="container-x">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Наші роботи</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-brand-dark text-balance" style={{ letterSpacing: "-0.02em" }}>
              Об'єкти які доглядаємо
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-[600px]">
              Кожен проєкт — індивідуальне рішення під рельєф, рослини та побажання власника
            </p>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
             className="text-sm font-bold text-brand-water hover:underline whitespace-nowrap">
            Більше робіт в Instagram →
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <a key={i} href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className={`reveal group relative overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300 ${it.span}`}
               style={{ transitionDelay: `${i * 60}ms`, borderRadius: "18px" }}>
              <span className="absolute top-3 right-3 z-10 text-[11px] font-semibold text-white opacity-0 group-hover:opacity-60 transition-opacity duration-300 tabular-nums">
                {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              <img src={it.src} alt={`${it.location} — ${it.type}`} loading="lazy"
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(15,61,32,0.5)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                <div className="font-display text-lg italic" style={{ fontWeight: 600 }}>{it.type}</div>
                <div className="text-sm font-bold opacity-90">{it.location}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── BEFORE / AFTER ───────────── */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dragging) return;
    const move = (clientX: number) => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const p = ((clientX - r.left) / r.width) * 100;
      setPos(Math.max(0, Math.min(100, p)));
    };
    const onMouse = (e: MouseEvent) => move(e.clientX);
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) move(e.touches[0].clientX); };
    const stop = () => setDragging(false);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onTouch);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", stop);
    };
  }, [dragging]);

  const stats = [
    { k: "Площа", v: "8 соток" },
    { k: "Термін", v: "3 тижні" },
    { k: "Обладнання", v: "Hunter" },
    { k: "Гарантія", v: "3 роки" },
  ];
  const blocks = [
    { h: "Задача", t: "Двір з висадженими туями, без газону та поливу. Власник хотів ідеальну зелену зону для відпочинку." },
    { h: "Рішення", t: "Спроєктували систему з 16 головок Hunter PGP, проклали 180 м труб, встановили автоматичний контролер. Уклали 240 м² рулонного газону." },
    { h: "Результат", t: "Готовий двір через 3 тижні. Власник економить 4 години щотижня на догляді та 30% води." },
  ];

  return (
    <section id="case-study" className="py-20 lg:py-32 bg-white">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Один з кейсів</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-brand-dark text-balance" style={{ letterSpacing: "-0.02em" }}>
            Трансформація двору в Совіньоні
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Як ділянка 8 соток перетворилась на ідеальний газон за 3 тижні
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-[3fr_2fr] gap-10 items-start">
          <div className="reveal">
            <div
              ref={ref}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden select-none"
              style={{ cursor: dragging ? "grabbing" : "grab" }}
              onMouseDown={(e) => { e.preventDefault(); setDragging(true); }}
              onTouchStart={() => setDragging(true)}
            >
              <img src={portfolio5} alt="До" className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
              <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
                <img src={portfolio6} alt="Після" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
              </div>
              <div className="absolute top-3 left-3 inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold text-white" style={{ background: "#991B1B" }}>ДО</div>
              <div className="absolute top-3 right-3 inline-flex items-center rounded-md bg-brand-emerald px-2.5 py-1 text-xs font-bold text-white">ПІСЛЯ</div>
              <div className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none" style={{ left: `${pos}%`, transform: "translateX(-50%)" }} />
              <div
                className="absolute top-1/2 grid place-items-center w-12 h-12 rounded-full bg-white shadow-xl"
                style={{ left: `${pos}%`, transform: "translate(-50%, -50%)", cursor: dragging ? "grabbing" : "grab" }}
              >
                <div className="flex items-center gap-0.5 text-brand-dark">
                  <ChevronDown className="w-4 h-4 rotate-90" />
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">← Перетягніть, щоб порівняти →</p>
          </div>

          <div className="reveal">
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.k} className="rounded-2xl border border-border bg-white p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{s.k}</div>
                  <div className="mt-1 text-xl font-extrabold text-brand-dark tabular-nums">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-5">
              {blocks.map((b) => (
                <div key={b.h}>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-water">{b.h}</h4>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{b.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── SAVINGS TEASER ───────────── */
function SavingsTeaser() {
  const items = [
    { icon: Droplets, value: "−35%", label: "витрат на воду" },
    { icon: Clock, value: "0 годин", label: "на ручний полив" },
    { icon: TrendingUp, value: "3–5 років", label: "термін окупності" },
  ];
  return (
    <section id="savings" className="py-20 lg:py-28 bg-brand-light">
      <div className="container-x">
        <div className="reveal max-w-[720px] mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Економія</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-brand-dark text-balance" style={{ letterSpacing: "-0.02em" }}>
            Автополив окупається за 3–5 років
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Грамотно налаштована система економить 30–40% води та звільняє ваш час.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {items.map((it) => (
              <div key={it.label} className="rounded-2xl bg-white p-6 border border-border shadow-soft">
                <div className="grid place-items-center w-11 h-11 rounded-xl bg-brand-light text-brand-water mx-auto">
                  <it.icon className="w-5 h-5" />
                </div>
                <div className="mt-4 text-3xl font-black text-brand-dark tabular-nums" style={{ letterSpacing: "-0.02em" }}>{it.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{it.label}</div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted-foreground">Точний розрахунок окупності — безкоштовно після виїзду</p>
          <a href="#quiz"
             className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-water text-white px-7 py-3.5 text-base font-bold hover:bg-brand-water-hover transition-colors shadow-card">
            Замовити розрахунок <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────── REVIEWS ───────────── */
function Reviews() {
  const reviews = [
    {
      quote: "Поставили автополив на 6 соток в Совіньоні. Хлопці працювали 4 дні, все чисто і охайно. Газон тепер ідеальний — не треба думати про полив.",
      letter: "О", name: "Олег П.", meta: "Совіньон • Автополив 6 соток",
    },
    {
      quote: "Замовляла рулонний газон з крапельним поливом для квітників. Все під ключ, пояснили як користуватись. Радять від душі.",
      letter: "І", name: "Ірина Б.", meta: "Фонтанка • Рулонний газон + полив",
    },
    {
      quote: "Стара система від іншого підрядника постійно ламалась. Хлопці зробили новий проєкт на Hunter — третій сезон без жодного збою.",
      letter: "М", name: "Михайло К.", meta: "Чорноморка • Заміна системи",
    },
  ];
  return (
    <section id="reviews" className="py-20 lg:py-32 bg-white">
      <div className="container-x">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Відгуки</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-brand-dark" style={{ letterSpacing: "-0.02em" }}>
              Що кажуть наші клієнти
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-2 text-sm font-bold text-brand-dark">
            <Star className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" /> 4.9 / 5.0 на Google Maps
          </span>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <article key={i} className="reveal flex flex-col rounded-2xl border border-border p-8" style={{ background: "var(--brand-cream)", transitionDelay: `${i * 80}ms` }}>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                ))}
              </div>
              <p className="mt-4 text-[15px] italic leading-[1.6] text-foreground/90 flex-1">"{r.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid place-items-center w-10 h-10 rounded-full bg-brand-water text-white font-bold">{r.letter}</div>
                <div>
                  <div className="text-sm font-bold text-brand-dark">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.meta}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-water hover:underline">
            Читати всі відгуки на Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────── TEAM ───────────── */
function Team() {
  const cards = [
    { letter: "В", bg: "bg-brand-emerald", name: "Віталій", role: "Засновник", bio: "14 років в ніші. Особисто веде кожен проєкт від замірів до здачі.", phone: PHONE_PRIMARY, tel: PHONE_PRIMARY_TEL },
    { letter: "М", bg: "bg-brand-water", name: "Максим", role: "Головний інженер", bio: "Спеціаліст з систем Hunter та Rain Bird. Відповідає за технічні рішення.", phone: PHONE_SECONDARY, tel: PHONE_SECONDARY_TEL },
  ];
  return (
    <section id="team" className="py-20 lg:py-32" style={{ background: "var(--brand-cream)" }}>
      <div className="container-x grid lg:grid-cols-[45fr_55fr] gap-12 items-start">
        <div className="reveal">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Команда</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-brand-dark text-balance" style={{ letterSpacing: "-0.02em" }}>
            Хто буде працювати на вашому об'єкті
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-md">
            Не випадкові виконавці. Реальні люди з 14-річним досвідом в Одесі.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {cards.map((c) => (
            <div key={c.name} className="reveal rounded-2xl border border-border bg-white p-7 transition-shadow hover:shadow-card">
              <div className={`grid place-items-center w-20 h-20 rounded-full text-white text-2xl font-black ${c.bg}`}>
                {c.letter}
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-brand-dark">{c.name}</h3>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-brand-water">{c.role}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.bio}</p>
              <a href={`tel:${c.tel}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-water">
                <Phone className="w-4 h-4" /> {c.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── FLOATING ───────────── */
function FloatingChat() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-[88px] md:bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <a href={`tel:${PHONE_PRIMARY_TEL}`} className="inline-flex items-center gap-2.5 bg-brand-accent text-white rounded-full pl-3 pr-4 py-2.5 text-sm font-semibold shadow-card">
            <Phone className="w-4 h-4" /> Зателефонувати
          </a>
          <a href="https://t.me/gardenkeeper_odesa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#229ED9] text-white rounded-full pl-3 pr-4 py-2.5 text-sm font-semibold shadow-card">
            <Send className="w-4 h-4" /> Telegram
          </a>
        </div>
      )}
      <button onClick={() => setOpen((v) => !v)}
              className="grid place-items-center w-14 h-14 rounded-full bg-brand-water hover:bg-brand-water-hover text-white shadow-water transition-transform hover:scale-105 active:scale-95"
              aria-label="Зв'язатись">
        {open ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
      </button>
    </div>
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setShow(pct > 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Нагору"
            className="fixed bottom-[160px] md:bottom-24 right-5 z-40 grid place-items-center w-11 h-11 rounded-full bg-white border border-brand-accent/40 text-brand-dark shadow-card hover:bg-brand-light transition-all">
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-[0_-4px_20px_-4px_rgba(27,94,32,0.15)]">
      <div className="grid grid-cols-2">
        <a href={`tel:${PHONE_PRIMARY_TEL}`} className="flex items-center justify-center gap-2 py-4 text-sm font-bold text-white bg-brand-water">
          <Phone className="w-4 h-4" /> Подзвонити
        </a>
        <a href="https://t.me/gardenkeeper_odesa" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-4 text-sm font-bold text-white bg-brand-accent">
          <MessageCircle className="w-4 h-4" /> Написати
        </a>
      </div>
    </div>
  );
}