import React, { useMemo, useState } from "react";

const TRACKING_API_URL = "https://script.google.com/macros/s/AKfycbzpR6QvKfxXcmIpvY3PCycwm1ht20vGFYF_GPC9IWs-b3Fl-sX6CS3eG8ytpSe3ABaD/exec";

export function createTrackingMessage(value) {
  const trimmed = String(value || "").trim();

  if (!trimmed) {
    return {
      type: "warning",
      title: "Número de pedido requerido",
      message: "Ingresa un número de pedido o guía para realizar la consulta.",
    };
  }

  return {
    type: "not-found",
    title: "Pedido no encontrado",
    message: `No encontramos información asociada al número ${trimmed}. Verifica el código ingresado o comunícate con ZORIAM para validar el estado de tu envío.`,
  };
}

export function getSectionId(label) {
  const map = {
    Inicio: "inicio",
    Nosotros: "nosotros",
    Servicios: "servicios",
    Cobertura: "cobertura",
    Tecnología: "tecnologia",
    Contacto: "contacto",
  };
  return map[label] || "inicio";
}

function IconBase({ children, className = "", strokeWidth = 1.8, viewBox = "0 0 24 24" }) {
  return (
    <svg viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

function Truck({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <path d="M1 7h12v9H1z" />
      <path d="M13 10h4l3 3v3h-7z" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M13 18H8" />
    </IconBase>
  );
}

function ShieldCheck({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <path d="M12 3l7 3v5c0 4.5-2.8 8.2-7 10-4.2-1.8-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </IconBase>
  );
}

function MapPin({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </IconBase>
  );
}

function BarChart3({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <path d="M3 21h18" />
      <path d="M7 17V9" />
      <path d="M12 17V5" />
      <path d="M17 17v-6" />
    </IconBase>
  );
}

function CheckCircle2({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </IconBase>
  );
}

function Warehouse({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <path d="M3 10l9-6 9 6" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-5h6v5" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </IconBase>
  );
}

function PackageCheck({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <path d="M21 8.5L12 4 3 8.5 12 13l9-4.5z" />
      <path d="M3 8.5V16l9 4 9-4V8.5" />
      <path d="M9 16l2 2 4-4" />
    </IconBase>
  );
}

function Route({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M8 18h3a4 4 0 0 0 4-4V10a4 4 0 0 1 4-4h1" />
    </IconBase>
  );
}

function Users({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="3" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 4.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

function Mail({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </IconBase>
  );
}

function Phone({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.61a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6.27 6.27l1.29-1.29a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.61.63A2 2 0 0 1 22 16.92z" />
    </IconBase>
  );
}

function Globe({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </IconBase>
  );
}

function ExternalLink({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <path d="M14 3h7v7" />
      <path d="M10 14L21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </IconBase>
  );
}

function ArrowRight({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </IconBase>
  );
}

function MessageCircle({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-4-.98L3 21l1.98-5.5a8.4 8.4 0 0 1-.98-4A8.5 8.5 0 1 1 21 11.5z" />
    </IconBase>
  );
}

function Building2({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
      <path d="M10 21v-4h4v4" />
    </IconBase>
  );
}

function ClipboardCheck({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4.5h6a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 9 4.5z" />
      <path d="M9 13l2 2 4-4" />
    </IconBase>
  );
}

function Plane({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </IconBase>
  );
}

function BookOpen({ className = "", strokeWidth = 1.8 }) {
  return (
    <IconBase className={className} strokeWidth={strokeWidth}>
      <path d="M2 5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3z" />
      <path d="M22 5a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3v15a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3z" />
    </IconBase>
  );
}

function HandshakeIcon(props) {
  return <Users {...props} />;
}

const services = [
  { title: "Última Milla", desc: "Entregas rápidas y seguras en entornos urbanos con estándares de calidad.", icon: Truck, image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop" },
  { title: "Distribución Nacional", desc: "Cobertura a nivel nacional con rutas optimizadas y entregas eficientes.", icon: Route, image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop" },
  { title: "Logística Inversa", desc: "Gestión de devoluciones, recupero y equipos con trazabilidad completa.", icon: PackageCheck, image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=1200&auto=format&fit=crop" },
  { title: "Trazabilidad y Control", desc: "Monitoreo en tiempo real de tus envíos con reportes e indicadores.", icon: BarChart3, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" },
  {
  title: "Operaciones Críticas",
  desc: "Soluciones especializadas para operaciones sensibles de alto valor.",
  icon: ClipboardCheck,
  image:
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=1200&auto=format&fit=crop",
},
  { title: "Almacenaje y Cross Docking", desc: "Almacenamiento seguro y distribución eficiente para tu cadena de suministro.", icon: Warehouse, image: "https://images.unsplash.com/photo-1586528116493-a029325540fa?q=80&w=1200&auto=format&fit=crop" },
];

const clients = ["entel", "Claro", "SCHARFF", "FLEET", "WODEN"];
const navItems = ["Inicio", "Nosotros", "Servicios", "Cobertura", "Tecnologia", "Contacto"];

const stats = [
  { value: "+7", label: "Años", sub: "De experiencia", icon: Building2 },
  { value: "+150", label: "Rutas diarias", sub: "A nivel nacional", icon: Route },
  { value: "+98%", label: "Entregas", sub: "A tiempo", icon: PackageCheck },
  { value: "+100", label: "Clientes corporativos", sub: "Confían en nosotros", icon: Users },
];

const coverage = [
  { text: "Cobertura en las 25 regiones del Perú", icon: MapPin },
  { text: "Alianzas estratégicas en todo el país", icon: HandshakeIcon },
  { text: "Rutas terrestres y aéreas", icon: Plane },
  { text: "Entregas seguras, sin importar la distancia", icon: ShieldCheck },
];

function Logo({ compact = false }) {
  return (
    <div className="flex items-center">
      <img
        src="/logo-zoriam.png"
        alt="ZORIAM Logística Integrada"
        className={
          compact
            ? "h-12 w-auto object-contain"
            : "h-12 w-auto max-w-[210px] object-contain md:h-16 md:max-w-[260px]"
        }
      />
    </div>
  );
}

function Button({ children, variant = "gold", className = "", ...props }) {
  const styles = variant === "gold" ? "bg-[#c79a45] text-[#07111d] hover:bg-[#d9ad5d] border-[#c79a45]" : "bg-transparent text-white hover:bg-white/10 border-white/25";
  return <button className={`inline-flex items-center justify-center gap-2 rounded border px-6 py-3 text-sm font-extrabold transition ${styles} ${className}`} {...props}>{children}</button>;
}

export default function ZoriamLandingPage() {
  const [tracking, setTracking] = useState("");
  const [trackingMessage, setTrackingMessage] = useState("");
  const [isTrackingLoading, setIsTrackingLoading] = useState(false);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const searchTracking = async () => {
    const pedido = tracking.trim();

    if (!pedido) {
      setTrackingMessage(createTrackingMessage(pedido));
      return;
    }

    setIsTrackingLoading(true);
    setTrackingMessage({
      type: "loading",
      title: "Consultando pedido",
      message: "Estamos validando la información del envío...",
    });

    try {
      const response = await fetch(`${TRACKING_API_URL}?pedido=${encodeURIComponent(pedido)}`);

      if (!response.ok) {
        throw new Error("Tracking API error");
      }

      const data = await response.json();

      if (!data.found) {
        setTrackingMessage({
          type: "not-found",
          title: "Pedido no encontrado",
          message: data.message || `No encontramos información asociada al número ${pedido}.`,
        });
        return;
      }

      const details = [
        data.detalle ? `Detalle: ${data.detalle}` : "",
        data.fecha ? `Fecha de actualización: ${data.fecha}` : "",
      ].filter(Boolean);

      setTrackingMessage({
        type: "success",
        title: `Estado del pedido: ${data.estado || "Registrado"}`,
        message: details.length ? details.join(" | ") : "El pedido fue encontrado en el sistema de tracking.",
      });
    } catch (error) {
      setTrackingMessage({
        type: "error",
        title: "No se pudo consultar el tracking",
        message: "Hubo un problema temporal al consultar el estado del pedido. Intenta nuevamente en unos minutos.",
      });
    } finally {
      setIsTrackingLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07111d] font-sans text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#07111d]/95 backdrop-blur">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-10 text-sm font-semibold text-white/90 lg:flex">
            {navItems.map((item, index) => (
              <a key={item} href={`#${getSectionId(item)}`} className="relative hover:text-[#c79a45]">
                {item}
                {index === 0 && <span className="absolute -bottom-9 left-0 h-px w-full bg-[#c79a45]" />}
              </a>
            ))}
          </nav>
          <a href="https://wa.me/51941822841" target="_blank" rel="noreferrer"><Button className="hidden lg:inline-flex">Cotizar Ahora</Button></a>
        </div>
      </header>

      <section id="inicio" className="relative min-h-[620px] overflow-hidden pt-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?q=80&w=2200&auto=format&fit=crop')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111d] via-[#07111d]/75 to-[#07111d]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111d] via-transparent to-transparent" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-20 lg:grid-cols-[1fr_420px] lg:py-24">
          <div>
            <h1 className="max-w-3xl text-3xl font-black uppercase leading-tight tracking-[0.06em] text-white sm:text-4xl md:text-6xl">Logística que conecta, controla <span className="block text-[#c79a45]">y entrega resultados.</span></h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/90 md:text-lg md:leading-8">Operaciones logísticas integrales con tecnología, trazabilidad y cumplimiento para empresas que no pueden detenerse.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="https://wa.me/51941822841" target="_blank" rel="noreferrer"><Button className="w-full sm:w-auto"><MessageCircle className="h-4 w-4" /> Cotizar Ahora <ArrowRight className="h-4 w-4" /></Button></a>
              <a href="https://wa.me/51941822841" target="_blank" rel="noreferrer"><Button variant="outline" className="w-full sm:w-auto"><MessageCircle className="h-4 w-4" /> WhatsApp </Button></a>
            </div>
            <div className="mt-14 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
              {[[ShieldCheck, "Seguridad", "Garantizada"], [MapPin, "Cobertura", "Nacional"], [BarChart3, "Trazabilidad", "en Tiempo Real"], [CheckCircle2, "Cumplimiento", "y Control"]].map(([Icon, a, b]) => (
                <div key={a} className="flex items-center gap-3"><Icon className="h-8 w-8 text-[#c79a45]" strokeWidth={1.7} /><div className="text-sm font-extrabold leading-4 text-white">{a}<br />{b}</div></div>
              ))}
            </div>
          </div>
          <div className="self-end rounded-lg border border-white/10 bg-[#07111d]/85 p-5 shadow-2xl backdrop-blur">
            <h2 className="text-lg font-black uppercase tracking-widest text-[#c79a45]">RASTREA TU ENVÍO</h2>
            <div className="mt-5 flex gap-1">
              <input value={tracking} onChange={(event) => setTracking(event.target.value)} className="min-w-0 flex-1 rounded border border-white/15 bg-[#07111d] px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#c79a45]" placeholder="Ingresa tu número de guía o pedido" />
              <button onClick={searchTracking} disabled={isTrackingLoading} className="rounded bg-[#c79a45] px-5 py-3 text-sm font-black text-[#07111d] disabled:cursor-not-allowed disabled:opacity-70">{isTrackingLoading ? "Buscando..." : "Rastrear"}</button>
            </div>
            <button
              onClick={() =>
                setTrackingMessage({
                  type: "info",
                  title: "Consulta de tracking",
                  message:
                    "Ingresa tu número de pedido o guía. El sistema validará si existe información registrada. Próximamente se conectará con una base de datos o Google Sheets para mostrar el estado real del envío.",
                })
              }
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold underline text-white/80 hover:text-[#c79a45]"
            >
              ¿Cómo funciona el tracking? <ArrowRight className="h-4 w-4" />
            </button>
            {trackingMessage && (
              <div className="mt-4 rounded border border-[#c79a45]/30 bg-[#c79a45]/10 p-4 text-sm text-white/90">
                <div className="mb-1 font-black text-[#c79a45]">{trackingMessage.title}</div>
                <p className="leading-6">{trackingMessage.message}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f0e8] text-[#07111d]"><div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-black/10 px-6 py-8 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{stats.map(({ value, label, sub, icon: Icon }) => (<div key={label} className="flex items-center gap-5 px-8 py-4"><Icon className="h-10 w-10 text-[#c79a45]" strokeWidth={1.5} /><div><div className="text-3xl font-black">{value}</div><div className="text-sm font-black uppercase tracking-wider">{label}</div><div className="text-sm">{sub}</div></div></div>))}</div></section>

      <section id="servicios" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><div className="mb-3 text-xs font-black uppercase tracking-widest text-[#c79a45]">Nuestros servicios</div><h2 className="max-w-xl text-3xl font-black leading-tight md:text-4xl">Soluciones logísticas diseñadas para operaciones exigentes.</h2></div><a href="#contacto"><Button variant="outline">Ver todos los servicios <ArrowRight className="h-4 w-4" /></Button></a></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">{services.map(({ title, desc, icon: Icon, image }) => (<article key={title} className="group overflow-hidden rounded border border-white/12 bg-white/[0.03]"><div className="relative h-40 overflow-hidden md:h-28"><img src={image} alt={title} className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#07111d] to-transparent" /></div><div className="p-4"><Icon className="mb-4 h-7 w-7 text-[#c79a45]" strokeWidth={1.8} /><h3 className="min-h-[48px] text-lg font-black leading-tight">{title}</h3><p className="mt-3 text-base leading-7 text-white/75 md:text-sm md:leading-6">>{desc}</p></div></article>))}</div>
      </section>

      <section id="nosotros" className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[410px] overflow-hidden px-6 py-16 lg:px-16"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116493-a029325540fa?q=80&w=1800&auto=format&fit=crop')" }} /><div className="absolute inset-0 bg-[#07111d]/82" />
<div className="absolute inset-0 bg-gradient-to-b from-[#07111d]/40 via-transparent to-[#07111d]/70" /><div className="relative mx-auto max-w-xl lg:ml-auto">
  <div className="mb-3 text-sm font-black uppercase tracking-widest text-[#d8b36a] drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
    Infraestructura y capacidad
  </div>

  <h2 className="text-3xl font-black leading-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] md:text-4xl">
    Operamos con infraestructura de alto nivel para garantizar continuidad y seguridad.
  </h2>

  <div className="mt-8 space-y-5 text-white/95">{[
  "Almacenes estratégicos en puntos clave",
  "Flota moderna y monitoreada",
  "Protocolos de seguridad y calidad certificados",
  "Personal capacitado y procesos estandarizados",
].map((item) => (
  <div key={item} className="flex gap-4">
    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#d8b36a]" />
    <span className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
      {item}
    </span>
  </div>
))}</div><a href="#contacto" className="mt-8 inline-block"><Button variant="outline">Conoce más sobre nosotros <ArrowRight className="h-4 w-4" /></Button></a></div></div>
        <div id="cobertura" className="bg-[#f4f0e8] px-6 py-16 text-[#07111d] lg:px-16"><div className="mx-auto max-w-xl lg:mr-auto"><div className="mb-3 text-xs font-black uppercase tracking-widest text-[#07111d]/70">Cobertura Nacional</div><h2 className="text-3xl font-black leading-tight md:text-4xl">Llegamos donde tu negocio nos necesita.</h2><div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_260px] md:items-center"><div className="relative flex min-h-[360px] items-center justify-center">
  <img
    src="/mapa-peru.png"
    alt="Mapa de cobertura nacional en Perú"
    className="h-[340px] w-auto object-contain opacity-90"
  />

  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c79a45] shadow-[0_0_0_8px_rgba(199,154,69,0.18)]" />
</div><div className="space-y-6">{coverage.map(({ text, icon: Icon }) => (<div key={text} className="flex gap-4"><Icon className="h-6 w-6 shrink-0 text-[#07111d]" strokeWidth={1.7} /><p className="text-sm leading-6">{text}</p></div>))}<a href="#contacto" className="inline-flex items-center gap-3 font-semibold hover:text-[#c79a45]">Ver cobertura completa <ArrowRight className="h-4 w-4" /></a></div></div></div></div>
      </section>

      <section id="tecnologia" className="border-y border-white/10 bg-[#07111d]"><div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[340px_1fr] lg:items-center"><div><div className="mb-3 text-xs font-black uppercase tracking-widest text-[#c79a45]">Empresas que confían en Zoriam</div><h2 className="text-3xl font-black leading-tight">Alianzas que nos impulsan a seguir entregando lo mejor.</h2></div><div className="grid grid-cols-2 gap-4 md:grid-cols-5">{clients.map((client) => (<div key={client} className="flex h-16 items-center justify-center rounded border border-white/12 bg-white/[0.03] px-4 text-xl font-black tracking-wide text-white/75">{client}</div>))}</div></div></section>

      <footer id="contacto" className="bg-[#07111d] px-6 py-12"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr_1.5fr]"><div><Logo compact /><p className="mt-5 max-w-xs text-sm leading-6 text-white/75">Brindamos soluciones logísticas integrales con tecnología, seguridad y compromiso para impulsar el crecimiento de tu negocio.</p><div className="mt-6 flex gap-3">{["in", "f", "ig"].map((item) => (<div key={item} className="flex h-8 w-8 items-center justify-center rounded bg-white/8 text-xs font-bold">{item}</div>))}</div></div><div><h3 className="mb-5 text-sm font-black uppercase tracking-widest text-[#c79a45]">Servicios</h3><ul className="space-y-3 text-sm text-white/75">{services.slice(0, 5).map((service) => (<li key={service.title}>{service.title}</li>))}</ul></div><div><h3 className="mb-5 text-sm font-black uppercase tracking-widest text-[#c79a45]">Enlaces rápidos</h3><ul className="space-y-3 text-sm text-white/75">{["Nosotros", "Cobertura", "Tecnología", "Contacto", "Libro de Reclamaciones"].map((item) => (<li key={item}>{item}</li>))}</ul></div><div><h3 className="mb-5 text-sm font-black uppercase tracking-widest text-[#c79a45]">Contacto</h3><div className="space-y-4 text-sm text-white/80"><p className="flex gap-3"><Mail className="h-4 w-4" /> comercial@zoriamlogistica.com</p><p className="flex gap-3"><Phone className="h-4 w-4" /> 941 822 841</p><p className="flex gap-3"><Globe className="h-4 w-4" /> www.zoriamlogistica.com</p><p className="flex gap-3"><MapPin className="h-4 w-4" /> Ate, Lima - Perú</p></div></div><div className="rounded border border-[#c79a45]/60 p-5"><h3 className="mb-4 text-sm font-black uppercase tracking-widest text-[#c79a45]">Libro de reclamaciones</h3><div className="flex gap-4"><BookOpen className="h-10 w-10 text-white/80" strokeWidth={1.5} /><p className="text-sm leading-6 text-white/80">Tu opinión nos ayuda a mejorar cada día.</p></div><a
  href="https://zoriam.samifact.net/reclamos"
  target="_blank"
  rel="noreferrer"
  className="mt-5 inline-flex items-center gap-2 rounded border border-white/20 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
>
  Ingresar al Libro <ExternalLink className="h-4 w-4" />
</a></div></div><div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row"><p>© {currentYear} Zoriam Logística Integrada. Todos los derechos reservados.</p><p>Política de Privacidad | Términos y Condiciones</p></div></footer>

export default function App() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* aquí va todo el contenido de tu web */}

      <a
        href="https://wa.me/51941822841"
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar a ZORIAM por WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:bg-green-400 md:bottom-6 md:right-6 md:h-14 md:w-14"
      >
        <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
      </a>
    </main>
  );
}
