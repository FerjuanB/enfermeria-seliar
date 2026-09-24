import { Link, useLocation } from "@tanstack/react-router";
import { ArrowLeftRight, ClipboardClock, ClockPlus, Home, Palmtree } from "lucide-react";

const navigationItems = [
  { to: "/", label: "Inicio", icon: Home, available: true },
  { to: "/control-guardia", label: "Control", icon: ClipboardClock, available: true },
  { to: "/cambio-guardia", label: "Cambio", icon: ArrowLeftRight, available: true },
  { to: "/compensatorio", label: "Compens.", icon: ClockPlus, available: true },
  { to: "/lao", label: "LAO", icon: Palmtree, available: true },
] as const;

export function SeliarMobileNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 shadow-[0_-8px_24px_oklch(0.27_0.035_202/0.12)] backdrop-blur"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5 px-1 pb-[max(env(safe-area-inset-bottom),0.25rem)] pt-1">
        {navigationItems.map(({ to, label, icon: Icon, available }) => {
          const active = pathname === to;
          const itemClassName =
            "flex min-h-16 flex-col items-center justify-center gap-0.5 rounded-md px-1 text-[10px] font-bold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

          if (!available) {
            return (
              <button
                key={to}
                type="button"
                disabled
                aria-label={`${label}: Próximamente`}
                className={`${itemClassName} cursor-not-allowed text-muted-foreground/65`}
              >
                <Icon className="size-5" aria-hidden="true" />
                <span>{label}</span>
                <span className="text-[8px] font-semibold normal-case tracking-normal">
                  Próximamente
                </span>
              </button>
            );
          }

          return (
            <Link
              key={to}
              to={to}
              aria-current={active ? "page" : undefined}
              className={`${itemClassName} transition-colors ${
                active
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-5" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
