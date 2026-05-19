import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Droplets, Sprout, Leaf, Award, Shield, Ruler, BadgeCheck, PiggyBank, Headphones,
  Phone, MessageCircle, Send, MapPin, Clock, Instagram, ArrowRight, Check, Menu, X,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { useReveal } from "@/hooks/use-reveal";
import { LeadQuiz } from "@/components/LeadQuiz";
import heroImg from "@/assets/hero-sprinkler.jpg";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Автополив Одеса",
        image: heroImg,
        telephone: "+380930305820",
        address: { "@type": "PostalAddress", addressLocality: "Одеса", addressCountry: "UA" },
        areaServed: "Одеська область",
        priceRange: "$$",
        description: "Автоматичні системи поливу, крапельне зрошення, рулонний газон в Одесі та області.",
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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Portfolio />
        <Process />
        <Faq />
        <LeadForm />
        <Contact />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
}

/* ───────────────────────────── HEADER ───────────────────────────── */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const nav = [
    { href: "#services", label: "Послуги" },
    { href: "#portfolio", label: "Роботи" },
    { href: "#process", label: "Як працюємо" },
    { href: "#contact", label: "Контакти" },
  ];
  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border/70" : "bg-background/0"
      }`}
    >
      <div className="container-x flex h-16 sm:h-20 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-brand-dark text-background shadow-soft">
            <Droplets className="w-5 h-5 text-brand-accent" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[15px] font-extrabold tracking-tight text-brand-dark">Автополив</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Одеса</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-foreground/80 hover:text-brand-dark transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${PHONE_PRIMARY_TEL}`}
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-brand-dark"
          >
            <Phone className="w-4 h-4 text-brand-accent" />
            {PHONE_PRIMARY}
          </a>
          <a
            href="#lead"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-dark text-background px-5 py-2.5 text-sm font-semibold hover:bg-brand-emerald transition-colors shadow-soft"
          >
            Розрахунок безкоштовно
          </a>
          <a
            href={`tel:${PHONE_PRIMARY_TEL}`}
            className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-accent text-white"
            aria-label="Подзвонити"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-border text-brand-dark"
            aria-label="Меню"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-x py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-foreground/90"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ───────────────────────────── HERO ───────────────────────────── */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[620px] -z-10 bg-gradient-to-b from-brand-accent/10 via-background to-background" />
      <div className="container-x pt-10 lg:pt-16 pb-16 lg:pb-24 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-emerald px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            Працюємо з 2011 року
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-[1.05] tracking-tight text-brand-dark text-balance">
            Автополив для газону <br className="hidden sm:block" />
            <span className="text-brand-accent">в Одесі</span> та області
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Робимо системи поливу з 2011 року. Працюємо з <span className="font-semibold text-foreground">Hunter</span>,{" "}
            <span className="font-semibold text-foreground">Rain Bird</span>,{" "}
            <span className="font-semibold text-foreground">Irritec</span>. Гарантія на роботи та обладнання.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#lead"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white px-7 py-4 text-base font-semibold shadow-glow transition-all hover:-translate-y-0.5"
            >
              Безкоштовний розрахунок
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-dark/15 bg-card text-brand-dark px-7 py-4 text-base font-semibold hover:border-brand-dark/40 transition-colors"
            >
              Подивитись наші роботи
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 max-w-lg">
            {[
              { k: "14", l: "років досвіду" },
              { k: "100+", l: "об'єктів" },
              { k: "3 роки", l: "гарантії" },
            ].map((b) => (
              <div key={b.l} className="text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">{b.k}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{b.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative reveal">
          <div className="absolute -inset-4 bg-gradient-to-tr from-brand-accent/30 to-brand-dark/20 rounded-[28px] blur-2xl -z-10" />
          <div className="relative rounded-[24px] overflow-hidden shadow-glow ring-1 ring-brand-dark/10">
            <img
              src={heroImg}
              alt="Автоматичний полив газону Hunter в Одесі"
              width={1536}
              height={1280}
              className="w-full h-[420px] sm:h-[520px] object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-background/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-card">
              <div className="flex items-center gap-3">
                <div className="grid place-items-center w-10 h-10 rounded-xl bg-brand-accent/15 text-brand-accent">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-dark">Офіційний партнер</div>
                  <div className="text-xs text-muted-foreground">Hunter · Rain Bird · Irritec</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── SERVICES ───────────────────────────── */
function Services() {
  const items = [
    {
      icon: Droplets,
      title: "Автоматичний полив",
      desc: "Повноцінна система автополиву під ключ. Проєктування, монтаж, налаштування. Обладнання Hunter та Rain Bird.",
    },
    {
      icon: Sprout,
      title: "Крапельне зрошення",
      desc: "Точкова подача води до кожної рослини. Економія до 70% води. Ідеально для клумб, чагарників, теплиць.",
    },
    {
      icon: Leaf,
      title: "Рулонний газон",
      desc: "Готовий газон за один день. Якісний дерн, професійна укладка, гарантія приживання.",
    },
  ];
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="Послуги" title="Наші послуги" />
        <div className="mt-12 grid md:grid-cols-3 gap-5 lg:gap-6">
          {items.map((s, i) => (
            <article
              key={s.title}
              className="reveal group relative bg-card border border-border/60 rounded-2xl p-7 lg:p-8 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-500"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-dark text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                <s.icon className="w-7 h-7" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-brand-dark">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.desc}</p>
              <a href="#lead" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent hover:gap-3 transition-all">
                Дізнатись більше <ArrowRight className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── WHY US ───────────────────────────── */
function WhyUs() {
  const items = [
    { icon: Award, title: "Працюємо з 2011 року", desc: "Понад 14 років досвіду на ринку Одеси. Сотні реалізованих проєктів." },
    { icon: Shield, title: "Тільки перевірені бренди", desc: "Hunter, Rain Bird, Irritec — світовий стандарт надійності." },
    { icon: Ruler, title: "Індивідуальний проєкт", desc: "Не працюємо за шаблонами. Враховуємо рельєф, рослини, тиск води." },
    { icon: BadgeCheck, title: "Гарантія на роботи", desc: "Несемо відповідальність за результат. Гарантія до 3 років." },
    { icon: PiggyBank, title: "Економія води", desc: "Грамотна система не переливає і не сушить. Економите гроші щомісяця." },
    { icon: Headphones, title: "Підтримка після монтажу", desc: "Не зникаємо після здачі об'єкта. Допомагаємо з обслуговуванням." },
  ];
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-brand-accent/[0.04]">
      <div className="container-x">
        <SectionHeader eyebrow="Переваги" title="Чому обирають нас" />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/70 rounded-3xl overflow-hidden border border-border/70">
          {items.map((it) => (
            <div key={it.title} className="reveal bg-card p-7 lg:p-9 hover:bg-brand-accent/[0.04] transition-colors">
              <div className="inline-grid place-items-center w-11 h-11 rounded-xl bg-brand-accent/10 text-brand-emerald">
                <it.icon className="w-5 h-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-dark">{it.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── PORTFOLIO ───────────────────────────── */
function Portfolio() {
  const items = [
    { img: p1, label: "Совіньон" },
    { img: p2, label: "Фонтанка" },
    { img: p3, label: "Чорноморка" },
    { img: p4, label: "Великий Дальник" },
    { img: p5, label: "Аркадія" },
    { img: p6, label: "Південний" },
  ];
  return (
    <section id="portfolio" className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Портфоліо"
          title="Наші роботи"
          subtitle="Кілька прикладів реалізованих об'єктів в Одесі та області"
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <a
              key={it.label}
              href="#"
              className="reveal group relative block rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <img
                src={it.img}
                alt={`Об'єкт у локації ${it.label}`}
                width={1024}
                height={768}
                loading="lazy"
                className="w-full h-72 object-cover group-hover:scale-[1.06] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/10 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-white font-semibold text-base">
                  <MapPin className="w-4 h-4 text-brand-accent" />
                  {it.label}
                </span>
                <span className="text-white/80 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  Дивитись →
                </span>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand-dark/15 px-6 py-3.5 text-sm font-semibold text-brand-dark hover:bg-brand-dark hover:text-background transition-colors"
          >
            <Instagram className="w-4 h-4" />
            Більше робіт в Instagram
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── PROCESS ───────────────────────────── */
function Process() {
  const steps = [
    { n: "01", title: "Залишаєте заявку", desc: "На сайті або по телефону. Передзвонимо протягом 2 годин." },
    { n: "02", title: "Виїзд та заміри", desc: "Безкоштовно приїжджаємо, оглядаємо ділянку, обговорюємо побажання." },
    { n: "03", title: "Проєкт та кошторис", desc: "Готуємо індивідуальний проєкт з прозорою ціною. Без прихованих доплат." },
    { n: "04", title: "Монтаж та запуск", desc: "Виконуємо роботи в обумовлені терміни. Запускаємо систему та навчаємо користуватись." },
  ];
  return (
    <section id="process" className="py-20 lg:py-28 bg-brand-dark text-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-brand-accent/15 rounded-full blur-3xl -z-0" />
      <div className="container-x relative">
        <SectionHeader eyebrow="Процес" title="Як ми працюємо" theme="dark" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((s, i) => (
            <div key={s.n} className="reveal relative" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="text-[64px] font-extrabold leading-none text-brand-accent/30 tracking-tighter">{s.n}</div>
              <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-background/70">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 text-brand-accent/40">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── FAQ ───────────────────────────── */
function Faq() {
  const items = [
    { q: "Скільки коштує автополив в Одесі?", a: "Вартість залежить від розміру ділянки, складності рельєфу та обраного обладнання. Точну ціну скажемо після безкоштовного виїзду та замірів." },
    { q: "Скільки часу займає монтаж?", a: "Для типової ділянки 5-10 соток — від 3 до 7 днів. Точні терміни узгоджуємо після проєктування." },
    { q: "Чи можна встановити автополив після укладання газону?", a: "Так, але це складніше і дорожче. Краще робити перед укладанням газону — швидше і дешевше." },
    { q: "Яка гарантія на роботи?", a: "На обладнання — гарантія виробника (Hunter, Rain Bird — до 5 років). На наші роботи — до 3 років." },
    { q: "Як готувати систему до зими?", a: "Робимо консервацію восени — продуваємо систему стисненим повітрям. Це обов'язково в нашому кліматі. Послуга окремо або в пакеті." },
    { q: "Чи працюєте за межами Одеси?", a: "Так, виїжджаємо по всій Одеській області. Виїзд за межі міста обговорюється індивідуально." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x max-w-3xl">
        <SectionHeader eyebrow="FAQ" title="Часті питання" align="left" />
        <div className="mt-10 divide-y divide-border border-y border-border">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className="reveal">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="text-base sm:text-lg font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">
                    {it.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-brand-dark transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-400 ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
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

/* ───────────────────────────── LEAD FORM ───────────────────────────── */
function LeadForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    if (name.length < 2) return toast.error("Введіть ваше ім'я");
    if (phone.length < 7) return toast.error("Введіть номер телефону");

    setSubmitting(true);
    try {
      // TODO: integrate with Telegram bot webhook
      await new Promise((r) => setTimeout(r, 700));
      setDone(true);
      toast.success("Дякуємо! Передзвонимо найближчим часом");
      form.reset();
    } catch {
      toast.error("Щось пішло не так. Спробуйте ще раз.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="lead" className="py-20 lg:py-28 bg-brand-dark text-background relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-brand-accent/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 right-0 w-[520px] h-[520px] bg-brand-accent/10 rounded-full blur-3xl" />
      <div className="container-x relative grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/15 border border-brand-accent/30 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-accent">
            Безкоштовно
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.1] text-balance">
            Залиште заявку на безкоштовний розрахунок
          </h2>
          <p className="mt-5 text-lg text-background/75 max-w-md">
            Передзвонимо протягом 2 годин в робочий час. Виїзд та консультація — безкоштовно.
          </p>
          <div className="mt-8 space-y-3 text-background/80">
            {[
              "Виїзд та заміри — безкоштовно",
              "Прозорий кошторис без прихованих доплат",
              "Гарантія до 3 років",
            ].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <span className="grid place-items-center w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="text-[15px]">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal">
          <form
            onSubmit={onSubmit}
            className="bg-background text-foreground rounded-3xl p-7 sm:p-9 shadow-glow border border-white/10"
          >
            {done ? (
              <div className="py-12 text-center">
                <div className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-brand-accent/15 text-brand-accent">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-brand-dark">Дякуємо!</h3>
                <p className="mt-2 text-muted-foreground">Передзвонимо найближчим часом.</p>
                <button
                  type="button"
                  onClick={() => setDone(false)}
                  className="mt-6 text-sm font-semibold text-brand-accent hover:underline"
                >
                  Надіслати ще одну заявку
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <Field label="Ім'я" required>
                    <input
                      name="name"
                      required
                      maxLength={80}
                      placeholder="Як до вас звертатись"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-[15px] outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition"
                    />
                  </Field>
                  <Field label="Телефон" required>
                    <input
                      name="phone"
                      required
                      type="tel"
                      maxLength={32}
                      placeholder="+380 ___ ___ __ __"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-[15px] outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition"
                    />
                  </Field>
                  <Field label="Площа ділянки">
                    <div className="relative">
                      <select
                        name="area"
                        defaultValue=""
                        className="w-full appearance-none rounded-xl border border-input bg-background px-4 py-3.5 text-[15px] outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition pr-10"
                      >
                        <option value="">Не знаю / уточню</option>
                        <option value="до 3">до 3 соток</option>
                        <option value="3-6">3–6 соток</option>
                        <option value="6-10">6–10 соток</option>
                        <option value="10+">більше 10 соток</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </Field>
                  <Field label="Коментар">
                    <textarea
                      name="comment"
                      maxLength={600}
                      rows={3}
                      placeholder="Розкажіть про ділянку або задайте питання"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-[15px] outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition resize-none"
                    />
                  </Field>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white py-4 text-base font-semibold shadow-glow transition-colors disabled:opacity-70"
                >
                  {submitting ? "Надсилаємо..." : "Отримати розрахунок"}
                  {!submitting && <ArrowRight className="w-4 h-4" />}
                </button>
                <p className="mt-4 text-xs text-muted-foreground text-center leading-relaxed">
                  Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
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

/* ───────────────────────────── CONTACT ───────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div className="reveal">
          <SectionHeader eyebrow="Контакти" title="Зв'яжіться з нами" align="left" />
          <div className="mt-10 space-y-5">
            <ContactRow icon={Phone} label="Віталій">
              <a href={`tel:${PHONE_PRIMARY_TEL}`} className="text-lg font-bold text-brand-dark hover:text-brand-accent">
                {PHONE_PRIMARY}
              </a>
            </ContactRow>
            <ContactRow icon={Phone} label="Максим">
              <a href={`tel:${PHONE_SECONDARY_TEL}`} className="text-lg font-bold text-brand-dark hover:text-brand-accent">
                {PHONE_SECONDARY}
              </a>
            </ContactRow>
            <ContactRow icon={Clock} label="Графік роботи">
              <span className="text-base font-semibold text-brand-dark">Пн–Сб: 9:00 — 19:00</span>
            </ContactRow>
            <ContactRow icon={MapPin} label="Зона обслуговування">
              <span className="text-base font-semibold text-brand-dark">Одеса та Одеська область</span>
            </ContactRow>
          </div>
          <div className="mt-8 flex gap-3">
            <SocialBtn href="https://instagram.com" icon={Instagram} label="Instagram" />
            <SocialBtn href="https://t.me/" icon={Send} label="Telegram" />
            <SocialBtn href="viber://chat" icon={MessageCircle} label="Viber" />
          </div>
        </div>
        <div className="reveal rounded-3xl overflow-hidden shadow-card border border-border/70 min-h-[380px]">
          <iframe
            title="Автополив Одеса на карті"
            src="https://www.google.com/maps?q=Odesa,Ukraine&output=embed"
            className="w-full h-full min-h-[380px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon, label, children,
}: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid place-items-center w-11 h-11 rounded-xl bg-brand-accent/10 text-brand-emerald shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</span>
        <span className="mt-0.5">{children}</span>
      </div>
    </div>
  );
}

function SocialBtn({
  href, icon: Icon, label,
}: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid place-items-center w-12 h-12 rounded-xl border border-border bg-card text-brand-dark hover:bg-brand-dark hover:text-background transition-colors"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

/* ───────────────────────────── FOOTER ───────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="container-x py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-brand-dark text-background">
            <Droplets className="w-5 h-5 text-brand-accent" />
          </span>
          <span className="text-sm font-extrabold tracking-tight text-brand-dark">
            Автополив <span className="text-muted-foreground font-medium">Одеса</span>
          </span>
        </a>
        <p className="text-sm text-muted-foreground">© 2026 Автополив Одеса. Всі права захищені.</p>
        <div className="flex items-center gap-5 text-sm">
          <a href="#" className="text-muted-foreground hover:text-brand-dark">Політика конфіденційності</a>
          <a href="#" className="text-muted-foreground hover:text-brand-dark">Договір оферти</a>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────────── FLOATING CHAT ───────────────────────────── */
function FloatingChat() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <ChatLink href="https://t.me/" label="Telegram" icon={Send} color="bg-[#229ED9]" />
          <ChatLink href="viber://chat" label="Viber" icon={MessageCircle} color="bg-[#7360F2]" />
          <ChatLink href={`tel:${PHONE_PRIMARY_TEL}`} label="Подзвонити" icon={Phone} color="bg-brand-accent" />
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="grid place-items-center w-14 h-14 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white shadow-glow transition-transform hover:scale-105"
        aria-label="Зв'язатись"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}

function ChatLink({
  href, label, icon: Icon, color,
}: { href: string; label: string; icon: React.ComponentType<{ className?: string }>; color: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 ${color} text-white rounded-full pl-3 pr-4 py-2.5 text-sm font-semibold shadow-card`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </a>
  );
}

/* ───────────────────────────── SHARED ───────────────────────────── */
function SectionHeader({
  eyebrow, title, subtitle, align = "center", theme = "light",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}) {
  const isDark = theme === "dark";
  return (
    <div className={`reveal max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ${
            isDark ? "bg-brand-accent/15 text-brand-accent border border-brand-accent/30" : "bg-brand-accent/10 text-brand-emerald border border-brand-accent/30"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance ${
          isDark ? "text-background" : "text-brand-dark"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg ${isDark ? "text-background/70" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
