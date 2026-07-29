"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import type { Permission } from "@/lib/types";

export function PermissionToggleRow({
  permission,
  onToggle,
}: {
  permission: Permission;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <div>
        <p className="text-sm font-medium text-white">{permission.label}</p>
        <p className="text-xs text-muted">{permission.description}</p>
      </div>
      <SwitchPrimitive.Root
        checked={permission.enabled}
        onCheckedChange={onToggle}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          permission.enabled ? "bg-accent" : "bg-border"
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform",
            permission.enabled && "translate-x-[22px]"
          )}
        />
      </SwitchPrimitive.Root>
    </div>
  );
}
