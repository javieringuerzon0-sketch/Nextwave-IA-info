import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  LineChart,
  ShieldCheck,
  Cog,
  Code2,
  Cloud,
  Gauge,
  Check,
  ArrowLeftRight,
  ExternalLink,
} from "lucide-react";
import logo from "@assets/logo-inphografic.png";

type PackageItem = {
  id: number;
  name: string;
  price: string;
  time: string;
  accent: string;
  includes: string[];
  idealFor: string;
  badge?: { label: string; tone: "recommended" | "premium" };
};

const ICONS = [Rocket, LineChart, ShieldCheck, Cog, Code2, Cloud, Gauge] as const;

function Chip({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      data-testid={`chip-${label.toLowerCase().replace(/\s+/g, "-")}`}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide"
      style={{
        borderColor: `color-mix(in oklab, ${accent} 45%, transparent)`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))",
      }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: accent, boxShadow: `0 0 14px ${accent}` }}
      />
      <span className="text-[hsl(var(--nw-muted))]">{label}</span>
    </span>
  );
}

function Badge({
  label,
  tone,
}: {
  label: string;
  tone: "recommended" | "premium";
}) {
  const isPremium = tone === "premium";
  return (
    <span
      data-testid={`badge-${tone}`}
      className={
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase " +
        (isPremium
          ? "nw-premium-badge"
          : "nw-recommended-badge")
      }
    >
      {label}
    </span>
  );
}

function Card({
  item,
  index,
}: {
  item: PackageItem;
  index: number;
}) {
  const Icon = ICONS[index % ICONS.length];

  return (
    <motion.article
      data-testid={`card-product-${item.id}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="nw-card group relative overflow-hidden rounded-2xl border p-5"
      style={{
        borderColor: `color-mix(in oklab, ${item.accent} 22%, rgba(148,163,184,.22))`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-70 blur-2xl transition duration-500 group-hover:opacity-90"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${item.accent}, transparent 65%)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              data-testid={`text-package-number-${item.id}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold"
              style={{
                background: `linear-gradient(180deg, color-mix(in oklab, ${item.accent
                  } 28%, rgba(255,255,255,.10)), rgba(0,0,0,.0))`,
                border: `1px solid color-mix(in oklab, ${item.accent
                  } 40%, rgba(148,163,184,.25))`,
                boxShadow: `0 0 18px color-mix(in oklab, ${item.accent
                  } 35%, transparent)`,
              }}
            >
              {item.id}
            </span>
            <h3
              data-testid={`text-package-name-${item.id}`}
              className="truncate font-display text-[18px] font-bold tracking-wide"
            >
              {item.name}
            </h3>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Chip label={item.time} accent={item.accent} />
            {item.badge ? (
              <Badge label={item.badge.label} tone={item.badge.tone} />
            ) : null}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div
            data-testid={`text-price-${item.id}`}
            className="font-display text-[22px] font-extrabold tracking-tight"
            style={{
              color: "#ffffff",
              textShadow: `0 0 22px color-mix(in oklab, ${item.accent
                } 35%, transparent)`,
            }}
          >
            {item.price}
          </div>
          <div
            data-testid={`text-currency-${item.id}`}
            className="mt-1 text-xs font-semibold text-[hsl(var(--nw-muted))]"
          >
            MXN
          </div>
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-[auto,1fr] items-start gap-3">
        <div
          className="nw-icon-tile"
          style={{
            borderColor: `color-mix(in oklab, ${item.accent} 28%, rgba(148,163,184,.22))`,
          }}
        >
          <Icon
            aria-hidden
            size={18}
            style={{ color: item.accent }}
            className="drop-shadow"
          />
        </div>

        <ul className="space-y-2">
          {item.includes.map((txt, i) => (
            <li
              key={txt}
              data-testid={`text-feature-${item.id}-${i}`}
              className="flex items-start gap-2 text-sm text-[hsl(var(--nw-text))]"
            >
              <span
                aria-hidden
                className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-md"
                style={{
                  background: `color-mix(in oklab, ${item.accent} 18%, rgba(255,255,255,.02))`,
                  border: `1px solid color-mix(in oklab, ${item.accent
                    } 30%, rgba(148,163,184,.18))`,
                }}
              >
                <Check size={14} style={{ color: item.accent }} />
              </span>
              <span className="leading-snug">{txt}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-4 flex flex-wrap items-center justify-between gap-2">
        <div
          data-testid={`text-ideal-${item.id}`}
          className="text-xs font-semibold text-[hsl(var(--nw-muted))]"
        >
          Ideal para: <span className="text-white/90">{item.idealFor}</span>
        </div>
      </div>
    </motion.article>
  );
}

function Infografia({
  title,
  subtitle,
  items,
  footerCta,
}: {
  title: string;
  subtitle: string;
  items: PackageItem[];
  footerCta: string;
}) {
  return (
    <div
      data-testid="section-infografia"
      className="relative mx-auto w-full max-w-[920px]"
    >
      <div className="nw-surface relative overflow-hidden rounded-[28px] border p-6 sm:p-8">
        <div aria-hidden className="nw-circuit" />
        <div aria-hidden className="nw-waves" />
        <div aria-hidden className="nw-orb" />

        <header className="relative flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div
              data-testid="text-subtitle"
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-[0.18em] uppercase text-white/80"
              style={{
                borderColor: "rgba(92,225,230,.22)",
                background:
                  "linear-gradient(180deg, rgba(92,225,230,.10), rgba(139,92,246,.06))",
              }}
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#5ce1e6", boxShadow: "0 0 14px #5ce1e6" }}
              />
              {subtitle}
            </div>
            <h1
              data-testid="text-title"
              className="mt-3 font-display text-[26px] font-extrabold leading-tight tracking-wide sm:text-[34px]"
            >
              {title}
            </h1>
            <p
              data-testid="text-tagline"
              className="mt-2 max-w-[58ch] text-sm text-[hsl(var(--nw-muted))]"
            >
              WEB | AUTOMATION | INTELLIGENCE
            </p>
          </div>

          <div className="shrink-0">
            <div
              data-testid="img-logo"
              className="nw-logo-container relative h-20 w-[220px] overflow-hidden rounded-xl border border-white/10"
            >
              <div
                className="nw-logo-glow absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.4), transparent 70%)',
                }}
              />
              <img
                src={logo}
                alt="NextWave IA"
                loading="eager"
                className="nw-logo-img h-full w-full object-fill"
                style={{
                  imageRendering: 'auto',
                  filter: 'contrast(1.1) brightness(1.1)',
                }}
              />
              {/* Nuevo efecto HUD Scan sutil */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(92, 225, 230, 0.1) 50%, transparent 60%)',
                  willChange: 'transform', // Force GPU layer
                  animation: 'nw-hud-scan 3s linear infinite',
                }}
              />
            </div>
          </div>
        </header>

        <div className="relative mt-6 grid gap-4">
          {items.map((item, idx) => (
            <Card key={item.id} item={item} index={idx} />
          ))}
        </div>

        <footer className="relative mt-6 flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div
              data-testid="text-location"
              className="text-xs font-semibold text-[hsl(var(--nw-muted))]"
            >
              La Paz, Baja California Sur
            </div>
            <div
              data-testid="text-copyright"
              className="text-[11px] text-white/45"
            >
              © 2025 NextWave IA
            </div>
          </div>

          <a
            data-testid="button-cta"
            href="https://wa.me/526122893294"
            target="_blank"
            rel="noreferrer"
            className="nw-cta inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold"
          >
            {footerCta}
            <span aria-hidden className="nw-cta-arrow">
              →
            </span>
          </a>
        </footer>
      </div>
    </div>
  );
}

export default function Infografias() {
  const [part, setPart] = useState<1 | 2>(1);

  const packs1 = useMemo<PackageItem[]>(
    () => [
      {
        id: 1,
        name: "ECONÓMICO",
        price: "$5,550",
        time: "5–7 días",
        accent: "#22d3ee",
        includes: [
          "Hasta 2 secciones de información",
          "Diseño Web 100% responsivo",
          "Certificado SSL incluido",
          "Hosting por 1 año",
          "Dominio .com por 1 año",
          "Presencia rápida en Internet",
        ],
        idealFor: "Emprendedores y startups",
      },
      {
        id: 2,
        name: "EMPRENDEDOR",
        price: "$6,800",
        time: "7–10 días",
        accent: "#38bdf8",
        includes: [
          "Hasta 4 secciones de contenido",
          "Diseño Web responsivo premium",
          "Certificado SSL incluido",
          "Hosting optimizado 1 año",
          "Dominio .com por 1 año",
          "Muestra tus productos/servicios",
        ],
        idealFor: "Emprendedores en crecimiento",
      },
      {
        id: 3,
        name: "NEGOCIOS",
        price: "$8,800",
        time: "7–10 días",
        accent: "#818cf8",
        includes: [
          "Hasta 6 secciones profesionales",
          "Diseño responsive avanzado",
          "Compatibilidad total móviles",
          "Certificado SSL Premium",
          "Hosting + Dominio 1 año",
          "Imagen profesional de marca",
        ],
        idealFor: "Negocios establecidos",
      },
      {
        id: 4,
        name: "MICROEMPRESA",
        price: "$10,800",
        time: "7–10 días",
        accent: "#a78bfa",
        includes: [
          "Hasta 8 secciones completas",
          "Diseño Web moderno 2025",
          "Seguridad informática avanzada",
          "Cifrado SSL de alto nivel",
          "Hosting + Dominio premium",
          "Formularios de contacto",
        ],
        idealFor: "Microempresas y PyMEs",
      },
    ],
    [],
  );

  const packs2 = useMemo<PackageItem[]>(
    () => [
      {
        id: 5,
        name: "PYME",
        price: "$12,800",
        time: "7–14 días",
        accent: "#c084fc",
        includes: [
          "Hasta 10 secciones completas",
          "Diseño moderno y profesional",
          "Enfoque en venta de productos",
          "SEO básico optimizado",
          "Hosting + Dominio + SSL",
          "Formularios avanzados",
          "Integración redes sociales",
        ],
        idealFor: "Pequeñas y Medianas Empresas",
      },
      {
        id: 6,
        name: "EMPRESARIAL",
        price: "$14,800",
        time: "7–14 días",
        accent: "#f472b6",
        includes: [
          "Hasta 12 secciones premium",
          "Diseño web de alta eficiencia",
          "Seguridad informática SSL+",
          "Velocidad de carga optimizada",
          "Panel administrativo CMS",
          "Soporte técnico prioritario",
          "Analytics integrado",
        ],
        idealFor: "Empresas establecidas",
      },
      {
        id: 7,
        name: "WEB PRO ⭐",
        price: "$14,499",
        time: "20–25 días",
        accent: "#fb923c",
        badge: { label: "RECOMENDADO", tone: "recommended" },
        includes: [
          "Secciones ilimitadas",
          "Optimización SEO Local completa",
          "Google My Business integrado",
          "Retoque profesional de textos",
          "Panel administrativo avanzado",
          "Capacitación de 2 horas",
          "Auditoría de posicionamiento",
        ],
        idealFor: "Dueños de negocio ambiciosos",
      },
      {
        id: 8,
        name: "WEB PRO PLUS ⭐⭐",
        price: "$17,799",
        time: "+20 días",
        accent: "#fbbf24",
        badge: { label: "PREMIUM", tone: "premium" },
        includes: [
          "Todo de WEB PRO incluido",
          "Landing Page adicional",
          "Estructura 100% enfocada a ventas",
          "Sistema de captación de leads",
          "Auditoría completa de ventas",
          "Estrategia de conversión",
          "Soporte premium 6 meses",
        ],
        idealFor: "Empresas enfocadas en ventas",
      },
    ],
    [],
  );

  return (
    <div data-testid="page-infografias" className="nw-page">
      <div className="nw-bg" aria-hidden />

      <div className="relative mx-auto w-full max-w-[980px] px-4 py-10 sm:py-14">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div
              data-testid="text-brand"
              className="text-xs font-bold tracking-[0.22em] uppercase text-white/60"
            >
              NextWave IA
            </div>
            <div
              data-testid="text-helper"
              className="mt-1 text-sm text-[hsl(var(--nw-muted))]"
            >
              Infografías listas para Stories (1080×1920) y formato largo.
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl border bg-white/5 p-1">
            <button
              data-testid="button-toggle-part1"
              onClick={() => setPart(1)}
              className={
                "nw-toggle px-4 py-2 text-sm font-extrabold " +
                (part === 1 ? "nw-toggle-active" : "")
              }
            >
              Parte 1
            </button>
            <button
              data-testid="button-toggle-part2"
              onClick={() => setPart(2)}
              className={
                "nw-toggle px-4 py-2 text-sm font-extrabold " +
                (part === 2 ? "nw-toggle-active" : "")
              }
            >
              Parte 2
            </button>
            <span
              data-testid="icon-toggle"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/70"
            >
              <ArrowLeftRight size={18} />
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {part === 1 ? (
            <motion.div
              key="p1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <Infografia
                title="PAQUETES DE DESARROLLO WEB"
                subtitle="PARTE 1 DE 2"
                items={packs1}
                footerCta="AGENDA TU CONSULTA GRATIS"
              />
            </motion.div>
          ) : (
            <motion.div
              key="p2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <Infografia
                title="PAQUETES PREMIUM"
                subtitle="PARTE 2 DE 2"
                items={packs2}
                footerCta="CONTÁCTANOS HOY"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 text-center">
          <div
            data-testid="text-note"
            className="mx-auto max-w-[70ch] text-xs text-white/45"
          >
            Tip: si quieres exportarlas como imagen, dime si las necesitas en 1080×1920
            (Stories) o 800×2000 y preparo la versión exacta lista para descargar.
          </div>
        </div>
      </div>
    </div>
  );
}
