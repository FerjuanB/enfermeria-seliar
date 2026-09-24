import type { WorkflowContentWidth } from "@/components/WorkflowShell";

const contentWidths: Record<WorkflowContentWidth, string> = {
  narrow: "max-w-2xl",
  wide: "max-w-5xl",
};

type WorkflowHeaderProps = {
  contentWidth?: WorkflowContentWidth;
  description: string;
  eyebrow: string;
  title: string;
};

export function WorkflowHeader({
  contentWidth = "wide",
  description,
  eyebrow,
  title,
}: WorkflowHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b-4 border-[var(--brand-orange)] bg-primary text-primary-foreground shadow-md">
      <div className={`mx-auto w-full ${contentWidths[contentWidth]} px-4 py-2.5 sm:px-6 sm:py-3`}>
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-10 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[3px] bg-white p-1">
            <img src="/logoSIES.jpg" alt="Logo SIES" className="h-full w-full object-contain" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/65">
              {eyebrow}
            </p>
            <h1 className="font-display text-base font-semibold text-primary-foreground sm:text-lg">
              {title}
            </h1>
            <p className="mt-0.5 text-xs font-medium leading-4 text-primary-foreground/70">
              {description}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
