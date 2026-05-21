import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Phone, MessageCircle, Send, MapPin, Clock, Instagram, ArrowRight, ArrowDown,
  Menu, X, ChevronDown, ChevronUp, Facebook, Music2, Check,
  Star, Droplets, TrendingUp,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { LeadQuiz } from "@/components/LeadQuiz";
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
  return (
    <div className="min-h-screen bg-background text-foreground pb-[68px] md:pb-0">
      <div className="scroll-progress" id="scroll-progress" />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <Portfolio />
        <Services />
        <BeforeAfter />
        <Process />
        <SavingsTeaser />
        <Reviews />
        <Team />
        <WhyUs />
        <QuizSection />
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
  const words = ["Ваш сад", "завжди", "зеленим"];
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <img src={heroImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover -z-10" />
      {/* Overlay */}
      <div className="absolute inset-0 -z-10 opacity-90" style={{ background: "linear-gradient(135deg, #0f3d20 0%, #1B5E20 50%, #1976D2 100%)" }} />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(135deg, rgba(27,94,32,0.85) 0%, rgba(25,118,210,0.45) 100%)" }}
      />
      {/* Blob */}
      <svg className="absolute -bottom-1 left-0 right-0 w-full text-background" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,64 C240,120 480,16 720,40 C960,64 1200,112 1440,72 L1440,100 L0,100 Z" />
      </svg>

      <div className="relative h-full container-x flex flex-col justify-center items-center text-center text-white pt-16">
        <span className="glass rounded-full px-4 py-1.5 text-[12px] font-semibold tracking-wide text-white inline-flex items-center gap-2">
          🌿 Автополив • Одеса з 2011
        </span>

        <h1 className="mt-6 font-extrabold tracking-tight leading-[0.95] text-[clamp(2.6rem,8vw,6.5rem)] text-balance">
          {words.map((w, i) => (
            <span key={i} className="word-rise mr-3" style={{ animationDelay: `${0.15 + i * 0.25}s` }}>{w}</span>
          ))}
        </h1>

        <p className="mt-6 max-w-xl text-base sm:text-lg text-white/80 word-rise" style={{ animationDelay: "1.1s" }}>
          Системи автополиву під ключ. Hunter, Rain Bird, Irritec. 14 років в Одесі.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 word-rise" style={{ animationDelay: "1.3s" }}>
          <a href="#quiz"
             className="ripple inline-flex items-center justify-center gap-2 rounded-full bg-white text-brand-dark px-7 py-4 min-h-[52px] text-base font-bold shadow-2xl transition-all hover:scale-[1.03] active:scale-[0.97]">
            Розрахувати вартість
          </a>
          <a href="#process"
             className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 text-white px-7 py-4 min-h-[52px] text-base font-bold hover:bg-white/10 transition-all">
            Як ми працюємо →
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-white/75 word-rise" style={{ animationDelay: "1.5s" }}>
          <li className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-accent" /> 14 років досвіду</li>
          <li className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-accent" /> 100+ об'єктів</li>
          <li className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-accent" /> Гарантія 3 роки</li>
        </ul>

        <a href="#services" className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 hover:text-white scroll-bounce" aria-label="Прокрутити">
          <ArrowDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
}

/* ───────────── SERVICES (3 large panels) ───────────── */
function Services() {
  const items = [
    {
      n: "01",
      title: "Автоматичний полив",
      bullets: ["Проєктування під ваш участок", "Монтаж за 3-7 днів", "Обладнання Hunter / Rain Bird"],
    },
    {
      n: "02",
      title: "Крапельне зрошення",
      bullets: ["Точкова подача до кожної рослини", "Економія до 70% води", "Для клумб, кущів, теплиць"],
    },
    {
      n: "03",
      title: "Рулонний газон",
      bullets: ["Готовий газон за один день", "Якісний дерн з гарантією", "Автополив у комплексі"],
    },
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
              className="reveal group relative overflow-hidden rounded-3xl p-8 min-h-[280px] flex flex-col justify-between text-white transition-all duration-500 hover:-translate-y-2"
              style={{
                background: "linear-gradient(140deg, #0f3d20 0%, #1B5E20 60%, #2E7D32 100%)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "18px 18px" }}
              />
              <span className="absolute top-4 right-6 text-[88px] font-black leading-none text-white/10 group-hover:text-brand-accent/70 transition-colors duration-500">
                {s.n}
              </span>
              <div className="relative">
                <h3 className="text-2xl font-extrabold tracking-tight">{s.title}</h3>
                <ul className="mt-5 space-y-2 text-[14px] text-white/80">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-brand-accent shrink-0" /> {b}</li>
                  ))}
                </ul>
              </div>
              <a href="#quiz" className="relative inline-flex items-center gap-1.5 text-sm font-bold text-brand-accent group-hover:gap-3 transition-all">
                Дізнатись більше <ArrowRight className="w-4 h-4" />
              </a>
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
    <section className="relative py-16 lg:py-20 text-white overflow-hidden animated-gradient">
      <div className="container-x relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
          {items.map((it, i) => (
            <div key={i} className="px-4 py-6 text-center reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-5xl sm:text-6xl font-black tracking-tight leading-none">
                <Counter to={it.v} />{it.suffix}
              </div>
              <div className="mt-3 text-[13px] sm:text-sm uppercase tracking-wider text-white/60 font-medium">{it.label}</div>
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
function QuizSection() {
  return (
    <section id="quiz" className="relative bg-brand-light py-16 lg:py-20 overflow-hidden">
      <div className="absolute -top-16 left-0 right-0 h-20 bg-brand-light" aria-hidden />
      <svg className="absolute top-0 left-0 right-0 w-full text-brand-light -mt-px" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,32 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
      <div className="container-x relative">
        <div className="reveal max-w-2xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Калькулятор</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight text-balance">
            Розрахуйте проєкт <span className="text-brand-water">за 1 хвилину</span>
          </h2>
        </div>
        <div className="reveal mt-8">
          <LeadQuiz />
        </div>
      </div>
    </section>
  );
}

/* ───────────── PROCESS (timeline) ───────────── */
function Process() {
  const steps = [
    { n: "1", title: "Залишаєте заявку", desc: "Передзвонимо протягом 2 годин", water: true },
    { n: "2", title: "Безкоштовний виїзд", desc: "Оглядаємо ділянку, обговорюємо", water: false },
    { n: "3", title: "Проєкт та кошторис", desc: "Без прихованих доплат", water: true },
    { n: "4", title: "Монтаж та запуск", desc: "Здаємо в строк, навчаємо", water: false },
  ];
  return (
    <section id="process" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Процес</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight text-balance">
            Як ми <span className="text-brand-water">працюємо</span>
          </h2>
        </div>

        <div className="relative mt-16">
          <div aria-hidden className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand-accent via-brand-water to-brand-accent md:left-1/2" />
          <div className="space-y-12">
            {steps.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <div key={s.n} className="reveal relative md:grid md:grid-cols-2 md:gap-12" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className={`pl-16 md:pl-0 ${right ? "md:col-start-2 md:pl-12" : "md:col-start-1 md:text-right md:pr-12"}`}>
                    <h3 className="text-2xl font-extrabold text-brand-dark">{s.title}</h3>
                    <p className="mt-2 text-[15px] text-muted-foreground">{s.desc}</p>
                  </div>
                  <div
                    className={`absolute left-0 top-0 grid place-items-center w-12 h-12 rounded-full text-white text-lg font-extrabold ring-4 ring-white shadow-lg ${
                      s.water ? "bg-brand-water" : "bg-brand-accent"
                    } md:left-1/2 md:-translate-x-1/2`}
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