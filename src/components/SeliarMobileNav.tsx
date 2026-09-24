import { Link, useLocation } from "@tanstack/react-router";
import { ArrowLeftRight, ClipboardClock, ClockPlus, Home, Palmtree } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV_REVEAL_EDGE_PX = 96;
const NAV_TOP_THRESHOLD_PX = 8;
const NAV_HIDE_SCROLL_PX = 6;
const NAV_REVEAL_SCROLL_PX = 4;
const NAV_HIDE_AFTER_SCROLL_PX = 24;

const navigationItems = [
  { to: "/", label: "Inicio", icon: Home, available: true },
  { to: "/control-guardia", label: "Control", icon: ClipboardClock, available: true },
  { to: "/cambio-guardia", label: "Cambio", icon: ArrowLeftRight, available: true },
  { to: "/compensatorio", label: "Compens.", icon: ClockPlus, available: true },
  { to: "/lao", label: "LAO", icon: Palmtree, available: true },
] as const;

export function SeliarMobileNav() {
  const { pathname } = useLocation();
  const navRef = useRef<HTMLElement | null>(null);
  const visibilityRef = useRef(true);
  const [isVisible, setIsVisible] = useState(true);

  const setVisibility = useCallback((visible: boolean) => {
    if (visibilityRef.current === visible) return;
    visibilityRef.current = visible;
    setIsVisible(visible);
  }, []);

  const reveal = useCallback(() => {
    setVisibility(true);
  }, [setVisibility]);

  useEffect(() => {
    const lastScrollY = { current: window.scrollY };
    const nav = navRef.current;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      if (currentScrollY <= NAV_TOP_THRESHOLD_PX) {
        reveal();
        return;
      }

      if (nav?.contains(document.activeElement)) return;

      if (scrollDelta <= -NAV_REVEAL_SCROLL_PX) {
        reveal();
      } else if (scrollDelta >= NAV_HIDE_SCROLL_PX && currentScrollY > NAV_HIDE_AFTER_SCROLL_PX) {
        setVisibility(false);
      }
    };

    const revealNearBottomEdge = (clientY: number) => {
      if (clientY >= window.innerHeight - NAV_REVEAL_EDGE_PX) reveal();
    };

    const handlePointerMove = (event: PointerEvent) => revealNearBottomEdge(event.clientY);
    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) revealNearBottomEdge(touch.clientY);
    };
    const handleFocusIn = (event: FocusEvent) => {
      if (nav?.contains(event.target as Node)) reveal();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("focusin", handleFocusIn);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("focusin", handleFocusIn);
    };
  }, [reveal, setVisibility]);

  useEffect(() => {
    reveal();
  }, [pathname, reveal]);

  return (
    <nav
      ref={navRef}
      aria-label="Navegación principal"
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 shadow-[0_-8px_24px_oklch(0.27_0.035_202/0.12)] backdrop-blur transition-transform duration-200 motion-reduce:transition-none ${isVisible ? "translate-y-0" : "translate-y-full"}`}
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
