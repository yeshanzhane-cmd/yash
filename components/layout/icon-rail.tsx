"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Crown,
  LayoutGrid,
  LifeBuoy,
  Landmark,
  Megaphone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RailItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const TOP_ITEMS: RailItem[] = [
  { href: "/", label: "Home", icon: LayoutGrid },
  { href: "/ceo", label: "CEO", icon: Crown },
  { href: "/marketing", label: "Marketing", icon: Megaphone },
  { href: "/sales", label: "Sales", icon: TrendingUp },
  { href: "/support", label: "Support", icon: LifeBuoy },
  { href: "/finance", label: "Finance", icon: Landmark },
];

const BOTTOM_ITEMS: RailItem[] = [{ href: "/admin", label: "Admin", icon: ShieldCheck }];

export function IconRail() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-16 shrink-0 flex-col items-center justify-between border-r border-border bg-canvas py-4">
      <div className="flex flex-col items-center gap-4">
        <Sparkles className="mb-2 h-6 w-6 text-accent" aria-hidden />
        <div className="flex flex-col items-center gap-1">
          {TOP_ITEMS.map((item) => (
            <RailLink key={item.href} item={item} active={isActive(pathname, item.href)} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 border-t border-border pt-4">
        {BOTTOM_ITEMS.map((item) => (
          <RailLink key={item.href} item={item} active={isActive(pathname, item.href)} />
        ))}
      </div>
    </nav>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function RailLink({ item, active }: { item: RailItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      title={item.label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors",
        active ? "bg-accent-soft text-accent" : "hover:bg-surface-hover hover:text-white"
      )}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </Link>
  );
}
