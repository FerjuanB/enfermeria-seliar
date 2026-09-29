import { Link, useLocation } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  CalendarDays,
  ChevronUp,
  ClipboardClock,
  ClockPlus,
  Home,
  LogIn,
  Palmtree,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV_REVEAL_EDGE_PX = 96;
const NAV_TOP_THRESHOLD_PX = 8;
const NAV_HIDE_SCROLL_PX = 6;
const NAV_REVEAL_SCROLL_PX = 4;
const NAV_HIDE_AFTER_SCROLL_PX = 24;

const navigationGroups = [
  {
    id: "guardia",
    label: "Tu guardia",
    icon: ClipboardClock,
    items: [
      { to: "/ingreso" as const, label: "Registrar ingreso", icon: LogIn },
      { to: "/control-guardia" as const, label: "Control de guardia", icon: ClipboardClock },
    ],
  },
  {
    id: "gestiones",
    label: "Gestiones",
    icon: CalendarDays,
    items: [
      { to: "/horarios" as const, label: "Horarios", icon: CalendarDays },
      { to: "/cambio-guardia" as const, label: "Cambio de guardia", icon: ArrowLeftRight },
      { to: "/compensatorio" as const, label: "Compensatorio", icon: ClockPlus },
      { to: "/lao" as const, label: "Solicitud de LAO", icon: Palmtree },
    ],
  },
] as const;

type NavigationGroupId = (typeof navigationGroups)[number]["id"];

const homeItem = { to: "/" as const, label: "Inicio", icon: Home };

function NavigationLink({
  to,
  label,
  icon: Icon,
  active,
  onNavigate,
}: {
  to: (typeof navigationGroups)[number]["items"][number]["to"];
  label: string;
  icon: (typeof navigationGroups)[number]["items"][number]["icon"];
  active: boolean;
  onNavigate: () => void;
}) {
  const IconComponent = Icon;

  return (
    <Link
      to={to}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={`flex min-h-12 items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
        active ? "bg-secondary text-secondary-foreground" : "text-foreground hover:bg-muted"
      }`}
    >
      <IconComponent className="size-5 shrink-0" aria-hidden="true" />
      <span className="min-w-0 flex-1">{label}</span>
      {active ? <span className="sr-only">Página actual</span> : null}
    </Link>
  );
}

export function SeliarMobileNav() {
  const { pathname } = useLocation();
  const navRef = useRef<HTMLElement | null>(null);
  const groupButtonRefs = useRef<Partial<Record<NavigationGroupId, HTMLButtonElement | null>>>({});
  const visibilityRef = useRef(true);
  const [isVisible, setIsVisible] = useState(true);
  const [openGroup, setOpenGroup] = useState<NavigationGroupId | null>(null);

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
    setOpenGroup(null);
  }, [pathname, reveal]);

  useEffect(() => {
    if (!openGroup) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenGroup(null);
        groupButtonRefs.current[openGroup]?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenGroup(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [openGroup]);

  return (
    <nav
      ref={navRef}
      aria-label="Navegación principal"
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 shadow-[0_-8px_24px_oklch(0.27_0.035_202/0.12)] backdrop-blur transition-transform duration-200 motion-reduce:transition-none ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      {openGroup ? (
        <div
          id={`${openGroup}-menu`}
          className="absolute inset-x-3 bottom-full mb-2 mx-auto max-w-lg rounded-2xl border border-border bg-card p-2 shadow-[0_-8px_24px_oklch(0.27_0.035_202/0.18)]"
          role="group"
          aria-label={`${navigationGroups.find(({ id }) => id === openGroup)?.label} destinos`}
        >
          <div className="grid gap-1 sm:grid-cols-2">
            {navigationGroups
              .find(({ id }) => id === openGroup)
              ?.items.map(({ to, label, icon }) => (
                <NavigationLink
                  key={to}
                  to={to}
                  label={label}
                  icon={icon}
                  active={pathname === to}
                  onNavigate={() => setOpenGroup(null)}
                />
              ))}
          </div>
        </div>
      ) : null}
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-1 px-2 pb-[max(env(safe-area-inset-bottom),0.25rem)] pt-1">
        <Link
          to={homeItem.to}
          aria-current={pathname === homeItem.to ? "page" : undefined}
          className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-lg px-2 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            pathname === homeItem.to
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <homeItem.icon className="size-5" aria-hidden="true" />
          <span>{homeItem.label}</span>
        </Link>
        {navigationGroups.map(({ id, label, icon: Icon, items }) => {
          const activeRoute = items.find(({ to }) => pathname === to);
          const isOpen = openGroup === id;

          return (
            <button
              key={id}
              ref={(element) => {
                groupButtonRefs.current[id] = element;
              }}
              type="button"
              aria-expanded={isOpen}
              aria-controls={isOpen ? `${id}-menu` : undefined}
              aria-label={`${label}${activeRoute ? `, página actual: ${activeRoute.label}` : ""}`}
              onClick={(event) => {
                if (isOpen) {
                  setOpenGroup(null);
                  return;
                }

                setOpenGroup(id);
                if (event.detail === 0) {
                  window.requestAnimationFrame(() => {
                    document.querySelector<HTMLAnchorElement>(`#${id}-menu a`)?.focus();
                  });
                }
              }}
              className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-lg px-2 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeRoute || isOpen
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-1">
                <Icon className="size-5" aria-hidden="true" />
                <ChevronUp
                  className={`size-3 transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </span>
              <span>{label}</span>
              {activeRoute ? <span className="sr-only">Página actual en este grupo</span> : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
