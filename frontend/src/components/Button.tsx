import type { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  icon?: ReactNode;
}

export function Button({ className, variant = "primary", icon, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyber disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-cyber text-ink shadow-cyber hover:bg-white",
        variant === "secondary" && "glass text-white hover:border-cyber",
        variant === "danger" && "bg-ember text-white shadow-glow hover:bg-flare",
        variant === "ghost" && "text-slate-200 hover:bg-white/10",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
