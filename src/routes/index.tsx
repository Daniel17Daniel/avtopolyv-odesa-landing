import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Phone, MessageCircle, Send, MapPin, Clock, Instagram, ArrowRight, ArrowDown,
  Menu, X, ChevronDown, ChevronUp, Facebook, Music2, Check,
  Star, Droplets, TrendingUp, ChevronRight, CheckCircle2, AlertCircle, Info,
  Link2,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useMagnetic, useTilt } from "@/hooks/use-interactions";
import { LeadQuiz, type PrefilledService } from "@/components/LeadQuiz";
import logoImg from "@/assets/garden-keeper-logo.jpg";
import heroImg from "@/assets/hero-sprinkler.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const SITE_URL = "https://avtopolyv-odesa-landing.lovable.app";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: "Garden Keeper",
  alternateName: "Автополив Одеса",
  description: "Системи автополиву, крапельного зрошення та рулонний газон в Одесі та області з 2011 року. Hunter, Rain Bird, Irritec.",
  image: `${SITE_URL}${heroImg}`,
  logo: `${SITE_URL}${logoImg}`,
  telephone: ["+380930305820", "+380993209841"],
  email: "info@gardenkeeper.ua",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Одеса",
    addressRegion: "Одеська область",
    addressCountry: "UA",
  },
  areaServed: ["Одеса", "Фонтанка", "Совіньон", "Лиманка", "Чорноморка", "Одеська область"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  priceRange: "$$",
  foundingDate: "2011",
  founder: [
    { "@type": "Person", name: "Віталій", jobTitle: "Засновник, головний інженер" },
    { "@type": "Person", name: "Максим", jobTitle: "Засновник, керівник проєктів" },
  ],
  sameAs: [
    "https://instagram.com",
    "https://tiktok.com",
    "https://facebook.com",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "100",
    bestRating: "5",
  },
};

const SERVICE_SCHEMAS = [
  {
    name: "Системи автополиву під ключ",
    serviceType: "Автоматичний полив",
    description: "Проєктування та монтаж систем автополиву Hunter, Rain Bird. Гарантія до 3 років.",
  },
  {
    name: "Крапельне зрошення",
    serviceType: "Крапельний полив",
    description: "Точкова подача води до кожної рослини. Економія до 70% води.",
  },
  {
    name: "Рулонний газон",
    serviceType: "Укладання рулонного газону",
    description: "Готовий газон за один день з гарантією приживаності.",
  },
].map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: s.serviceType,
  provider: { "@id": `${SITE_URL}/#organization` },
  name: s.name,
  description: s.description,
  areaServed: "Одеська область",
  offers: {
    "@type": "Offer",
    priceCurrency: "UAH",
    priceSpecification: {
      "@type": "PriceSpecification",
      description: "Ціна залежить від площі та конфігурації. Виїзд для замірів безкоштовний.",
    },
  },
}));

const FAQ_ITEMS_FOR_SCHEMA = [
  { q: "Скільки коштує автополив в Одесі?", a: "Вартість залежить від розміру ділянки, складності рельєфу та обраного обладнання. Точну ціну скажемо після безкоштовного виїзду та замірів." },
  { q: "Скільки часу займає монтаж?", a: "Для типової ділянки 5-10 соток — від 3 до 7 днів. Точні терміни узгоджуємо після проєктування." },
  { q: "Чи можна встановити автополив після укладання газону?", a: "Так, але це складніше і дорожче. Краще робити перед укладанням газону." },
  { q: "Яка гарантія на роботи?", a: "На обладнання — гарантія виробника (до 5 років). На наші роботи — до 3 років." },
  { q: "Як готувати систему до зими?", a: "Робимо консервацію восени — продуваємо систему стисненим повітрям." },
  { q: "Чи працюєте за межами Одеси?", a: "Так, виїжджаємо по всій Одеській області." },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS_FOR_SCHEMA.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
};

const REVIEW_SCHEMAS = [
  { author: "Олег П.", text: "Поставили автополив на 6 соток в Совіньоні. Хлопці працювали 4 дні, все чисто і охайно. Газон тепер ідеальний — не треба думати про полив." },
  { author: "Ірина Б.", text: "Замовляла рулонний газон з крапельним поливом для квітників. Все під ключ, пояснили як користуватись. Радять від душі." },
  { author: "Михайло К.", text: "Стара система від іншого підрядника постійно ламалась. Хлопці зробили новий проєкт на Hunter — третій сезон без жодного збою." },
].map((r) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: { "@id": `${SITE_URL}/#organization` },
  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  author: { "@type": "Person", name: r.author },
  reviewBody: r.text,
}));

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Головна", item: SITE_URL },
  ],
};

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Garden Keeper — Автополив в Одесі з 2011 року" },
      { name: "description", content: "Системи автополиву, крапельного зрошення та рулонний газон в Одесі та області. Hunter, Rain Bird, Irritec. Гарантія до 3 років." },
      { property: "og:title", content: "Garden Keeper — Автополив в Одесі з 2011 року" },
      { property: "og:description", content: "Системи автополиву, крапельного зрошення та рулонний газон в Одесі та області. Hunter, Rain Bird, Irritec." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(ORG_SCHEMA) },
      ...SERVICE_SCHEMAS.map((s) => ({ type: "application/ld+json", children: JSON.stringify(s) })),
      { type: "application/ld+json", children: JSON.stringify(FAQ_SCHEMA) },
      ...REVIEW_SCHEMAS.map((r) => ({ type: "application/ld+json", children: JSON.stringify(r) })),
      { type: "application/ld+json", children: JSON.stringify(BREADCRUMB_SCHEMA) },
    ],
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
  const [seasonalVisible, setSeasonalVisible] = useState(false);

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

  // URL parameter pre-fill
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const serviceMap: Record<string, PrefilledService> = {
      remont: "Ремонт існуючої системи",
      avtopoliv: "Новий автополив",
      kapelnyi: "Крапельний полив",
      gazon: "Рулонний газон",
      service: "Сезонне обслуговування",
    };
    if (service && serviceMap[service]) {
      const svc = serviceMap[service];
      setPrefilledService(svc);
      setTimeout(() => {
        quizSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 600);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-[68px] md:pb-0">
      <SeasonalTimer onVisibilityChange={setSeasonalVisible} />
      <div className="scroll-progress" id="scroll-progress" />
      <Header topOffset={seasonalVisible ? 36 : 0} />
      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <Portfolio />
        <Services onPick={triggerQuiz} />
        <ExistingSystem onRepair={() => triggerQuiz("Ремонт існуючої системи")} />
        <BeforeAfter />
        <Process />
        <PaybackCalculator />
        <Reviews />
        <Team />
        <WhyUs />
        <ReadinessChecklist onCta={() => triggerQuiz("Новий автополив")} />
        <PhotoStrip />
        <QuizSection ref={quizSectionRef} prefilledService={prefilledService} />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyCTABar topOffset={seasonalVisible ? 36 : 0} />
      <AssistantWidget onCta={(svc) => triggerQuiz(svc)} />
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
function Header({ topOffset = 0 }: { topOffset?: number }) {
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
              <span key={b} className="inline-flex items-center text-brand-dark px-1 py-1 text-sm font-display font-semibold border-b-2 border-brand-accent" style={{ fontWeight: 600, letterSpacing: "0.04em" }}>
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
      <div className="relative animated-gradient noise-overlay text-white p-8 sm:p-12 lg:p-16 overflow-hidden">
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
    <footer className="bg-brand-dark text-white noise-overlay">
      <div className="container-x py-14 grid gap-10 md:grid-cols-3">
        <div>
          <a href="#top" className="flex items-center gap-3">
            <img src={logoImg} alt="Garden Keeper" className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-accent/40" />
            <span className="font-display text-2xl tracking-tight" style={{ fontWeight: 700 }}>Garden Keeper</span>
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
            <h4 className="font-display italic text-base text-brand-accent" style={{ fontWeight: 400 }}>Навігація</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li><a href="#services" className="hover:text-brand-accent">Послуги</a></li>
              <li><a href="#process" className="hover:text-brand-accent">Процес</a></li>
              <li><a href="#why" className="hover:text-brand-accent">Чому ми</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display italic text-base text-brand-accent" style={{ fontWeight: 400 }}>Більше</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li><a href="#quiz" className="hover:text-brand-accent">Калькулятор</a></li>
              <li><a href="#contact" className="hover:text-brand-accent">Контакти</a></li>
              <li><a href="#" className="hover:text-brand-accent">Політика</a></li>
            </ul>
          </div>
        </div>
        <div>
          <h4 className="font-display italic text-base text-brand-accent" style={{ fontWeight: 400 }}>Контакти</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80 tabular-nums">
            <li><a href={`tel:${PHONE_PRIMARY_TEL}`} className="hover:text-brand-accent">Віталій: +38 {PHONE_PRIMARY}</a></li>
            <li><a href={`tel:${PHONE_SECONDARY_TEL}`} className="hover:text-brand-accent">Максим: +38 {PHONE_SECONDARY}</a></li>
            <li>Пн–Сб: 9:00 — 19:00</li>
            <li>Одеса та область</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="container-x py-5 text-[11px] text-white/40 flex flex-wrap items-center justify-between gap-3">
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
              <div className="absolute top-3 left-3 inline-flex items-center rounded-md px-2.5 py-1 font-display text-xs text-white" style={{ background: "#991B1B", fontWeight: 600, letterSpacing: "0.18em" }}>ДО</div>
              <div className="absolute top-3 right-3 inline-flex items-center rounded-md bg-brand-emerald px-2.5 py-1 font-display text-xs text-white" style={{ fontWeight: 600, letterSpacing: "0.18em" }}>ПІСЛЯ</div>
              <div className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none" style={{ left: `${pos}%`, transform: "translateX(-50%)" }} />
              <div
                className="absolute top-1/2 grid place-items-center w-14 h-14 rounded-full bg-white shadow-lg hover:scale-105 transition-transform"
                style={{ left: `${pos}%`, transform: "translate(-50%, -50%)", cursor: dragging ? "grabbing" : "grab" }}
              >
                <div className="flex items-center gap-0.5 text-brand-dark">
                  <ChevronDown className="w-4 h-4 rotate-90" strokeWidth={1.5} />
                  <ChevronDown className="w-4 h-4 -rotate-90" strokeWidth={1.5} />
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
    <section id="reviews" className="py-20 lg:py-32" style={{ background: "var(--brand-cream-warm)" }}>
      <div className="container-x">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Відгуки</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-brand-dark" style={{ letterSpacing: "-0.02em" }}>
              Що кажуть наші клієнти
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-dark shadow-sm tabular-nums">
            <Star className="w-4 h-4 fill-brand-gold text-brand-gold" strokeWidth={1.5} /> 4.9 / 5.0 на Google Maps
          </span>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <article key={i} className="reveal relative flex flex-col border p-8 bg-white shadow-sm hover:shadow-md transition-shadow duration-300" style={{ borderColor: "var(--brand-stone)", borderRadius: "18px", transitionDelay: `${i * 80}ms` }}>
              <span aria-hidden className="absolute top-3 left-5 font-display italic select-none pointer-events-none" style={{ color: "var(--brand-earth)", opacity: 0.3, fontSize: "60px", lineHeight: 1, fontWeight: 400 }}>"</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-brand-gold text-brand-gold" strokeWidth={1.5} />
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
    { letter: "В", bg: "bg-brand-emerald", name: "Віталій",
      role: "Засновник • Головний інженер",
      bio: "14 років в ніші. Відповідає за технічні рішення та проєктування систем.",
      phone: PHONE_PRIMARY, tel: PHONE_PRIMARY_TEL },
    { letter: "М", bg: "bg-brand-water", name: "Максим",
      role: "Засновник • Керівник проєктів",
      bio: "Особисто веде кожен проєкт від першого замірy до здачі та підтримки після монтажу.",
      phone: PHONE_SECONDARY, tel: PHONE_SECONDARY_TEL },
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
              <div className={`grid place-items-center w-20 h-20 rounded-full text-white font-display ${c.bg}`} style={{ fontSize: "40px", fontWeight: 700, background: `linear-gradient(135deg, var(--brand-emerald), var(--brand-water))` }}>
                {c.letter}
              </div>
              <h3 className="mt-5 font-display text-2xl text-brand-dark" style={{ fontWeight: 700 }}>{c.name}</h3>
              <div
                className="mt-1 text-brand-water font-bold uppercase break-words"
                style={{ fontSize: "12px", letterSpacing: "0.15em", fontWeight: 700 }}
              >
                {c.role}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.bio}</p>
              <a href={`tel:${c.tel}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-water tabular-nums">
                <Phone className="w-4 h-4" strokeWidth={1.5} /> {c.phone}
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

/* ───────────── PHOTO STRIP ───────────── */
function PhotoStrip() {
  return (
    <section aria-label="" className="relative w-full overflow-hidden" style={{ height: "40vh", minHeight: 280 }}>
      <img
        src={portfolio5}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.35) 100%)" }}
      />
      <div className="relative h-full flex items-center justify-center px-6">
        <p
          className="font-display italic text-white text-center max-w-[600px] text-3xl sm:text-4xl lg:text-5xl"
          style={{ fontWeight: 400, letterSpacing: "-0.02em", textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
        >
          Кожен об'єкт — як для себе
        </p>
      </div>
    </section>
  );
}

/* ───────────── PAYBACK CALCULATOR ───────────── */
const AVG_SYSTEM_COST = 80000;

function PaybackCalculator() {
  const [area, setArea] = useState(6);
  const [waterCost, setWaterCost] = useState(1200);
  const [hours, setHours] = useState(4);
  const [displayedSavings, setDisplayedSavings] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [demoDone, setDemoDone] = useState(false);

  const monthlyWaterSavings = Math.round(waterCost * 0.35);
  const totalSavings = monthlyWaterSavings * 60;
  const annualSavings = monthlyWaterSavings * 12;
  const payback = annualSavings > 0
    ? Math.max(3, Math.min(7, +(AVG_SYSTEM_COST / annualSavings).toFixed(1)))
    : 7;
  const freedHoursMonth = hours * 4;

  // Smooth count-up on savings
  useEffect(() => {
    const target = totalSavings;
    const start = displayedSavings;
    const startTime = performance.now();
    const dur = 300;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - startTime) / dur);
      setDisplayedSavings(Math.round(start + (target - start) * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSavings]);

  // Demo animation on first scroll into view
  useEffect(() => {
    if (demoDone) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setDemoDone(true);
          const dur = 1200;
          const t0 = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            const ease = 1 - Math.pow(1 - p, 3);
            setArea(Math.max(1, Math.round(1 + 5 * ease)));
            setWaterCost(Math.max(200, Math.round(200 + 1000 * ease)));
            setHours(Math.max(0, Math.round(0 + 4 * ease)));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [demoDone]);

  const fmt = (n: number) => n.toLocaleString("uk-UA").replace(/,/g, " ");

  return (
    <section id="savings" className="py-20 lg:py-28 bg-brand-light">
      <div className="container-x max-w-[960px]">
        <div className="reveal text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Економія</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-brand-dark text-balance" style={{ letterSpacing: "-0.02em" }}>
            Автополив окупається швидше ніж здається
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Розрахуйте окупність вашої системи за 30 секунд
          </p>
        </div>

        <div ref={ref} className="reveal mt-12 bg-white rounded-[22px] shadow-xl p-6 md:p-10 grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Inputs */}
          <div className="space-y-7">
            <CalcSlider
              label="Площа газону"
              value={area} min={1} max={20} step={1}
              display={`${area} ${area === 1 ? "сотка" : area < 5 ? "сотки" : "соток"}`}
              endLabels={["1 сотка", "20 соток"]}
              onChange={setArea}
            />
            <CalcSlider
              label="Витрати на воду влітку"
              subLabel="Орієнтовно за місяць"
              value={waterCost} min={200} max={5000} step={100}
              display={`${fmt(waterCost)} грн`}
              endLabels={["200 грн", "5 000 грн"]}
              onChange={setWaterCost}
            />
            <CalcSlider
              label="Час на ручний полив"
              subLabel="Годин на тиждень"
              value={hours} min={0} max={20} step={1}
              display={`${hours} ${hours === 1 ? "година" : hours < 5 ? "години" : "годин"}`}
              endLabels={["0 годин", "20 годин"]}
              onChange={setHours}
            />
          </div>

          {/* Results */}
          <div className="bg-brand-light rounded-2xl p-6">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-emerald">Ваша економія</div>
            <div className="mt-2 font-display text-5xl sm:text-6xl text-brand-dark tabular-nums" style={{ fontWeight: 700, letterSpacing: "-0.03em" }}>
              {fmt(displayedSavings)} грн
            </div>
            <div className="mt-1 text-sm text-muted-foreground">за 5 років</div>

            <div className="mt-6 space-y-4">
              <CalcStat
                icon={<Droplets className="w-4 h-4 text-brand-water" />}
                label="Економія води"
                value="35%"
                sub={`≈ ${fmt(monthlyWaterSavings)} грн/міс`}
              />
              <CalcStat
                icon={<Clock className="w-4 h-4 text-brand-emerald" />}
                label="Звільнений час"
                value={`${freedHoursMonth} годин/міс`}
                sub="= 2 робочих дні"
              />
              <CalcStat
                icon={<TrendingUp className="w-4 h-4" style={{ color: "var(--brand-earth)" }} />}
                label="Окупність"
                value={`~ ${payback} років`}
                sub="Залежить від конфігурації"
              />
            </div>

            <a href="#quiz"
               className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-water text-white px-6 py-3.5 text-sm font-bold hover:bg-brand-water-hover transition-colors shadow-card">
              Точний розрахунок для вашого участка <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-3 text-[11px] text-muted-foreground text-center">
              Орієнтовний розрахунок. Точна окупність залежить від тарифів та конфігурації.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalcSlider({
  label, subLabel, value, min, max, step, display, endLabels, onChange,
}: {
  label: string; subLabel?: string; value: number; min: number; max: number; step: number;
  display: string; endLabels: [string, string]; onChange: (n: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-brand-dark">{label}</div>
          {subLabel && <div className="text-[11px] text-muted-foreground mt-0.5">{subLabel}</div>}
        </div>
        <div className="font-display text-2xl text-brand-water tabular-nums" style={{ fontWeight: 700 }}>{display}</div>
      </div>
      <div className="relative mt-3 h-7 flex items-center">
        <div className="absolute inset-x-0 h-2 rounded-full" style={{ background: "var(--brand-stone)" }} />
        <div
          className="absolute h-2 rounded-full pointer-events-none"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, var(--brand-water), var(--brand-accent))" }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="calc-range relative w-full appearance-none bg-transparent cursor-pointer"
          style={{ height: 28 }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground tabular-nums">
        <span>{endLabels[0]}</span><span>{endLabels[1]}</span>
      </div>
    </div>
  );
}

function CalcStat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid place-items-center w-8 h-8 rounded-lg bg-white shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground font-semibold">{label}</div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-bold text-brand-dark tabular-nums">{value}</span>
          <span className="text-[11px] text-muted-foreground tabular-nums">{sub}</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────── READINESS CHECKLIST ───────────── */
type ReadinessAnswer = { points: number };
const READINESS_QUESTIONS: { q: string; options: { label: string; points: number }[] }[] = [
  {
    q: "Чи є на ділянці водопровід або свердловина?",
    options: [
      { label: "Так", points: 2 },
      { label: "Ні", points: 0 },
      { label: "Не знаю", points: 0 },
    ],
  },
  {
    q: "Чи планується ділянка з газоном або рослинами в цей сезон?",
    options: [
      { label: "Так, цього сезону", points: 2 },
      { label: "Можливо пізніше", points: 1 },
      { label: "Не впевнено", points: 0 },
    ],
  },
  {
    q: "Чи є місце для контролера (захищене від погоди)?",
    options: [
      { label: "Так, є гараж/підсобка", points: 2 },
      { label: "Ні, треба щось придумати", points: 1 },
      { label: "Не знаю", points: 0 },
    ],
  },
  {
    q: "Чи готова ділянка (без активних будівельних робіт)?",
    options: [
      { label: "Так, готова", points: 2 },
      { label: "Ще ведуться роботи", points: 1 },
      { label: "Тільки буде", points: 0 },
    ],
  },
  {
    q: "Який ваш орієнтовний бюджет?",
    options: [
      { label: "Готовий вкладати в якість", points: 2 },
      { label: "Шукаю оптимальний варіант", points: 1 },
      { label: "Тільки дізнаюсь ціни", points: 0 },
    ],
  },
];

function ReadinessChecklist({ onCta }: { onCta: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ReadinessAnswer[]>([]);
  const [animKey, setAnimKey] = useState(0);
  const done = step >= READINESS_QUESTIONS.length;
  const total = answers.reduce((s, a) => s + a.points, 0);

  const pick = (points: number) => {
    setAnswers((prev) => [...prev, { points }]);
    setStep((s) => s + 1);
    setAnimKey((k) => k + 1);
  };
  const reset = () => {
    setAnswers([]);
    setStep(0);
    setAnimKey((k) => k + 1);
  };

  let tier: { icon: React.ReactNode; title: string; text: string; cta: string };
  if (total >= 8) {
    tier = {
      icon: <CheckCircle2 className="w-14 h-14 text-brand-emerald" strokeWidth={1.5} />,
      title: "Чудово! Ви повністю готові",
      text: "Можемо стартувати з замірів вже на цьому тижні. Базова умова — виїзд для проєктування.",
      cta: "Записатись на безкоштовний виїзд →",
    };
  } else if (total >= 5) {
    tier = {
      icon: <AlertCircle className="w-14 h-14" style={{ color: "var(--brand-gold)" }} strokeWidth={1.5} />,
      title: "Майже все є",
      text: "Кілька моментів варто уточнити на виїзді. Допоможемо розібратись з тим що не вистачає.",
      cta: "Обговорити з майстром →",
    };
  } else {
    tier = {
      icon: <Info className="w-14 h-14 text-brand-water" strokeWidth={1.5} />,
      title: "Краще трохи зачекати",
      text: "Поки що недостатньо умов для встановлення. Можемо проконсультувати та допомогти спланувати на майбутнє.",
      cta: "Безкоштовна консультація →",
    };
  }

  const current = READINESS_QUESTIONS[step];
  const progress = (step / READINESS_QUESTIONS.length) * 100;

  return (
    <section id="readiness" className="py-20 lg:py-28" style={{ background: "var(--brand-cream)" }}>
      <div className="container-x grid lg:grid-cols-[45fr_55fr] gap-12 items-start">
        <div className="reveal">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-emerald">Перевірка готовності</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-brand-dark text-balance" style={{ letterSpacing: "-0.02em" }}>
            Чи готові ви до автополиву?
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Дайте відповіді на 5 питань — і дізнайтесь чи можна стартувати цього сезону.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">30 секунд • без контактних даних</p>
        </div>

        <div className="reveal bg-white rounded-[18px] p-5 sm:p-8 shadow-lg">
          {!done ? (
            <div key={animKey} className="lq-step-in">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Питання {step + 1} з {READINESS_QUESTIONS.length}</span>
              </div>
              <div className="mt-2 h-1 rounded-full bg-brand-stone overflow-hidden">
                <div className="h-full bg-brand-accent transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <h3 className="mt-5 text-base sm:text-lg font-semibold text-brand-dark">{current.q}</h3>
              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                {current.options.slice(0, 2).map((o) => {
                  const positive = o.points >= 2;
                  return (
                    <button key={o.label} onClick={() => pick(o.points)}
                      className={`px-4 py-3 rounded-xl text-sm font-bold border-2 transition-colors text-left ${
                        positive
                          ? "border-brand-emerald/40 text-brand-emerald hover:bg-brand-emerald/5"
                          : "border-red-300 text-red-700 hover:bg-red-50"
                      }`}>
                      {positive ? "✓ " : "✗ "}{o.label}
                    </button>
                  );
                })}
              </div>
              {current.options[2] && (
                <button onClick={() => pick(current.options[2].points)}
                  className="mt-3 w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-muted-foreground border border-border hover:bg-brand-cream-warm transition-colors">
                  {current.options[2].label}
                </button>
              )}
            </div>
          ) : (
            <div key="result" className="lq-step-in text-center py-4">
              <div className="grid place-items-center mx-auto lq-success-bounce">{tier.icon}</div>
              <h3 className="mt-5 font-display text-2xl sm:text-3xl text-brand-dark" style={{ fontWeight: 700 }}>{tier.title}</h3>
              <p className="mt-3 text-[15px] text-muted-foreground max-w-md mx-auto">{tier.text}</p>
              <button onClick={onCta}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-water text-white px-6 py-3.5 text-sm font-bold hover:bg-brand-water-hover transition-colors shadow-card">
                {tier.cta}
              </button>
              <div className="mt-4">
                <button onClick={reset} className="text-xs text-muted-foreground hover:text-brand-water underline">
                  Пройти ще раз
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ───────────── ASSISTANT WIDGET ───────────── */
type ChatMsg = { from: "bot" | "user"; text: string };
type ChatStepId =
  | "initial"
  | "new_area" | "new_plants"
  | "have_lawn"
  | "broken_what" | "broken_done"
  | "browse_topic" | "browse_done"
  | "rec_new" | "rec_maint" | "rec_repair"
  | "later" | "closed";

type ChatOption = { label: string; next: ChatStepId; finalCta?: PrefilledService };
type ChatStep = { bot: string; bot2?: string; options: ChatOption[] };

const CHAT_FLOW: Record<ChatStepId, ChatStep> = {
  initial: {
    bot: "Привіт! Я допоможу зрозуміти що вам підходить. Розкажіть трохи про ваш проєкт?",
    options: [
      { label: "У мене новий участок", next: "new_area" },
      { label: "У мене вже є газон", next: "have_lawn" },
      { label: "Щось зламалось в моєму поливі", next: "broken_what" },
      { label: "Просто дізнаюсь варіанти", next: "browse_topic" },
    ],
  },
  new_area: {
    bot: "Чудово! Яка приблизна площа?",
    options: [
      { label: "До 5 соток", next: "new_plants" },
      { label: "5-10 соток", next: "new_plants" },
      { label: "Понад 10 соток", next: "new_plants" },
      { label: "Не знаю точно", next: "new_plants" },
    ],
  },
  new_plants: {
    bot: "Що плануєте на ділянці?",
    options: [
      { label: "Газон і кілька дерев", next: "rec_new" },
      { label: "Газон і клумби", next: "rec_new" },
      { label: "Складний ландшафт з різними зонами", next: "rec_new" },
      { label: "Все разом — комплекс", next: "rec_new" },
    ],
  },
  have_lawn: {
    bot: "Зрозуміло! У вас зараз є якийсь полив?",
    options: [
      { label: "Тільки ручний (зі шланга)", next: "rec_new" },
      { label: "Старий автополив працює", next: "rec_maint" },
      { label: "Старий автополив не працює", next: "rec_repair" },
      { label: "Ніякого немає", next: "rec_new" },
    ],
  },
  broken_what: {
    bot: "Що саме сталось?",
    options: [
      { label: "Тече або прорвало", next: "broken_done" },
      { label: "Деякі зони не поливаються", next: "broken_done" },
      { label: "Не вмикається", next: "broken_done" },
      { label: "Слабкий тиск", next: "broken_done" },
    ],
  },
  broken_done: {
    bot: "Це ремонт. Виїдемо безкоштовно для діагностики.",
    options: [
      { label: "Записатись на діагностику →", next: "closed", finalCta: "Ремонт існуючої системи" },
      { label: "Поки подумаю", next: "later" },
    ],
  },
  browse_topic: {
    bot: "Звичайно! Що цікавить найбільше?",
    options: [
      { label: "Скільки коштує автополив", next: "browse_done" },
      { label: "Як працює система", next: "browse_done" },
      { label: "Які бренди використовуєте", next: "browse_done" },
      { label: "Подивитись приклади робіт", next: "browse_done" },
    ],
  },
  browse_done: {
    bot: "Зазвичай 5-10 соток коштують від 60 000 грн. Працюємо з Hunter, Rain Bird та Irritec. Точну ціну скажемо після безкоштовного виїзду.",
    options: [
      { label: "Записатись на виїзд →", next: "closed", finalCta: "Новий автополив" },
      { label: "Маю ще питання", next: "initial" },
      { label: "Поки подумаю", next: "later" },
    ],
  },
  rec_new: {
    bot: "Зрозуміло. Для вашого випадку рекомендую автополив під ключ з обладнанням Hunter. Зазвичай проєкт займає 4-7 днів.",
    bot2: "Хочете записатись на безкоштовний виїзд для точного розрахунку?",
    options: [
      { label: "Так, записатись →", next: "closed", finalCta: "Новий автополив" },
      { label: "Поки подумаю", next: "later" },
      { label: "Маю ще питання", next: "initial" },
    ],
  },
  rec_maint: {
    bot: "Рекомендую сезонне обслуговування. Перевіримо систему, налаштуємо та продовжимо її ресурс.",
    options: [
      { label: "Так, записатись →", next: "closed", finalCta: "Сезонне обслуговування" },
      { label: "Поки подумаю", next: "later" },
    ],
  },
  rec_repair: {
    bot: "Це ремонт. Приїдемо на безкоштовну діагностику та запропонуємо рішення.",
    options: [
      { label: "Так, записатись →", next: "closed", finalCta: "Ремонт існуючої системи" },
      { label: "Поки подумаю", next: "later" },
    ],
  },
  later: {
    bot: "Без проблем. Якщо потім матимете питання — натисніть на мене знизу або зателефонуйте Віталію: 093 030 58 20",
    options: [{ label: "Закрити чат", next: "closed" }],
  },
  closed: { bot: "", options: [] },
};

function AssistantWidget({ onCta }: { onCta: (svc: PrefilledService) => void }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [stepId, setStepId] = useState<ChatStepId>("initial");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [typing, setTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Appearance + pulse
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 8000);
    const t2 = setTimeout(() => setPulse(true), 8200);
    const t3 = setTimeout(() => setPulse(false), 9200);
    const t4 = setTimeout(() => setPulse(true), 12200);
    const t5 = setTimeout(() => setPulse(false), 13200);
    return () => { [t1, t2, t3, t4, t5].forEach(clearTimeout); };
  }, []);

  // Drive the step transitions
  useEffect(() => {
    if (!open) return;
    const step = CHAT_FLOW[stepId];
    if (!step || !step.bot) return;
    setShowOptions(false);
    setTyping(true);
    const t1 = setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: step.bot }]);
      setTyping(false);
      if (step.bot2) {
        setTyping(true);
        const t2 = setTimeout(() => {
          setMessages((m) => [...m, { from: "bot", text: step.bot2! }]);
          setTyping(false);
          setShowOptions(true);
        }, 800);
        return () => clearTimeout(t2);
      } else {
        setShowOptions(true);
      }
    }, 600);
    return () => clearTimeout(t1);
  }, [stepId, open]);

  // Scroll chat to bottom
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing, showOptions]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeWidget(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const openWidget = () => {
    setOpen(true);
    setStepId("initial");
    setMessages([]);
    setPulse(false);
    setTimeout(() => closeBtnRef.current?.focus(), 100);
  };
  const closeWidget = () => {
    setOpen(false);
    setMessages([]);
    setStepId("initial");
  };

  const handleOption = (opt: ChatOption) => {
    setMessages((m) => [...m, { from: "user", text: opt.label }]);
    setShowOptions(false);
    if (opt.finalCta) {
      const svc = opt.finalCta;
      setTimeout(() => { closeWidget(); onCta(svc); }, 350);
      return;
    }
    if (opt.next === "closed") {
      setTimeout(() => closeWidget(), 350);
      return;
    }
    setStepId(opt.next);
  };

  if (!visible) return null;

  return (
    <>
      {/* Collapsed */}
      {!open && (
        <button
          onClick={openWidget}
          aria-label="Відкрити помічника"
          className={`fixed z-[45] bottom-[96px] left-6 md:left-auto md:right-6 group bg-white rounded-full shadow-lg hover:scale-[1.02] transition-transform ${pulse ? "assistant-pulse" : ""}`}
          style={{
            border: "1.5px solid var(--brand-water)",
            padding: "0",
            animation: "assistantIn 350ms ease both",
          }}
        >
          {/* Desktop pill */}
          <span className="hidden md:inline-flex items-center gap-3 pl-1.5 pr-5 py-1.5">
            <span className="grid place-items-center w-10 h-10 rounded-full text-white font-bold" style={{ background: "linear-gradient(135deg, var(--brand-water), var(--brand-emerald))" }}>В</span>
            <span className="flex flex-col items-start text-left">
              <span className="text-[13px] font-bold text-brand-dark leading-tight">Не знаєте з чого почати?</span>
              <span className="text-[11px] text-muted-foreground leading-tight">Я підкажу за 30 секунд</span>
            </span>
            <ChevronRight className="w-4 h-4 text-brand-water" />
          </span>
          {/* Mobile circle */}
          <span className="md:hidden grid place-items-center w-14 h-14 rounded-full text-white font-bold" style={{ background: "linear-gradient(135deg, var(--brand-water), var(--brand-emerald))" }}>В</span>
        </button>
      )}

      {/* Expanded */}
      {open && (
        <>
          {/* Mobile backdrop */}
          <button
            aria-label="Закрити"
            onClick={closeWidget}
            className="md:hidden fixed inset-0 z-[44] bg-black/30 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-labelledby="assistant-title"
            className="fixed z-[45] flex flex-col bg-white shadow-2xl overflow-hidden"
            style={{
              borderRadius: "18px",
              bottom: "96px",
              right: "24px",
              left: "auto",
              width: "min(360px, calc(100vw - 32px))",
              maxHeight: "min(540px, 70vh)",
              animation: "assistantExpand 250ms cubic-bezier(0.16, 1, 0.3, 1)",
              transformOrigin: "bottom right",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 text-white" style={{ background: "var(--brand-water)" }}>
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white font-bold" style={{ color: "var(--brand-water)" }}>В</span>
              <div className="flex-1 min-w-0">
                <div id="assistant-title" className="text-sm font-bold">Помічник</div>
                <div className="text-[11px] opacity-85">Зазвичай відповідає за хвилину</div>
              </div>
              <button
                ref={closeBtnRef}
                onClick={closeWidget}
                aria-label="Закрити"
                className="grid place-items-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ background: "var(--brand-cream)" }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] text-sm px-3.5 py-2.5 shadow-sm ${
                      m.from === "user" ? "text-white" : "text-foreground bg-white"
                    }`}
                    style={{
                      background: m.from === "user" ? "var(--brand-water)" : undefined,
                      borderRadius: m.from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white px-3.5 py-3 shadow-sm" style={{ borderRadius: "14px 14px 14px 4px" }}>
                    <div className="flex gap-1">
                      <span className="typing-dot" />
                      <span className="typing-dot" style={{ animationDelay: "0.2s" }} />
                      <span className="typing-dot" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Options */}
            {showOptions && CHAT_FLOW[stepId].options.length > 0 && (
              <div className="p-3 border-t border-border bg-white flex flex-col gap-2">
                {CHAT_FLOW[stepId].options.map((o, i) => (
                  <button
                    key={i}
                    onClick={() => handleOption(o)}
                    autoFocus={i === 0}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    style={{
                      border: "1.5px solid color-mix(in oklab, var(--brand-water) 30%, transparent)",
                      color: "var(--brand-water)",
                    }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}