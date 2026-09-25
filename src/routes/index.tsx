import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeftRight, CalendarDays, ChevronRight, ClockPlus, HeartPulse } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SeLIAR Enfermería" },
      {
        name: "description",
        content: "Panel operativo de los flujos de Enfermería SeLIAR.",
      },
    ],
  }),
  component: Home,
});

const managementWorkflows = [
  {
    to: "/horarios" as const,
    title: "Horarios de guardia",
    description: "Consultá el cronograma vigente.",
    icon: CalendarDays,
  },
  {
    to: "/cambio-guardia" as const,
    title: "Cambio de guardia",
    description: "Iniciá una solicitud de cambio de guardia.",
    icon: ArrowLeftRight,
  },
  {
    to: "/compensatorio" as const,
    title: "Compensatorio",
    description: "Gestioná solicitudes de horas compensatorias.",
    icon: ClockPlus,
  },
  {
    to: "/lao" as const,
    title: "Solicitud de LAO",
    description: "Prepará tu solicitud de licencia anual ordinaria.",
    icon: HeartPulse,
  },
];

function ManagementLink({
  to,
  title,
  description,
  icon: Icon,
}: (typeof managementWorkflows)[number]) {
  return (
    <Link
      to={to}
      className="group flex min-h-16 items-center gap-3 border-b border-border px-1 py-4 text-foreground transition-colors motion-safe:duration-150 hover:bg-muted focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:brightness-95 motion-reduce:transition-none"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
        <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg font-bold leading-tight">{title}</span>
        <span className="mt-0.5 block text-sm leading-5 text-muted-foreground">{description}</span>
      </span>
      <ChevronRight
        className="size-5 shrink-0 text-muted-foreground transition-transform motion-safe:duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </Link>
  );
}

function Home() {
  return (
    <main className="workflow-background min-h-screen">
      <div className="mx-auto min-h-screen w-full max-w-lg px-4 pb-28 pt-6 sm:px-5">
        <header className="rounded-2xl bg-primary px-4 py-4 text-primary-foreground shadow-[0_12px_32px_oklch(0.27_0.035_202/0.22)] sm:px-5 sm:py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[3px] bg-white p-1">
              <img src="/logoSIES.jpg" alt="Logo SIES" className="h-full w-full object-contain" />
            </span>
            <h1 className="min-w-0 font-display text-2xl font-bold leading-tight">
              Enfermería SeLIAR
            </h1>
          </div>
          <p className="mt-2 max-w-md text-xs leading-5 text-primary-foreground/85 sm:text-sm">
            Panel operativo para el equipo de enfermería de la SeLIAR de Santa Fe.
          </p>
        </header>

        <section className="mt-5" aria-labelledby="control-guardia-heading">
          <article className="rounded-2xl bg-primary p-4 text-primary-foreground shadow-[0_18px_40px_oklch(0.2_0.04_202/0.28)] sm:p-5">
            <h2
              id="control-guardia-heading"
              className="font-display text-2xl font-bold leading-tight sm:text-3xl"
            >
              Control de guardia
            </h2>
            <p className="mt-2 text-sm leading-6 text-primary-foreground/85">
              Registrá el ingreso, egreso e inventario de cada guardia.
            </p>
            <Link
              to="/control-guardia"
              className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--brand-orange)] px-4 py-3 text-center text-sm font-bold text-primary transition-colors hover:bg-[var(--brand-orange)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary active:brightness-95 motion-safe:duration-150 motion-reduce:transition-none"
            >
              Ir a control de guardia →
            </Link>
          </article>
        </section>

        <section
          className="mt-5 min-h-[calc(100vh-17rem)] rounded-t-[24px] bg-white px-4 pb-8 pt-6 shadow-[0_-10px_28px_oklch(0.27_0.035_202/0.12)] sm:px-6"
          aria-labelledby="gestiones-title"
        >
          <h2 id="gestiones-title" className="font-display text-2xl font-semibold text-foreground">
            Gestiones
          </h2>
          <div className="mt-2 divide-y divide-border">
            {managementWorkflows.map((workflow) => (
              <ManagementLink key={workflow.to} {...workflow} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
