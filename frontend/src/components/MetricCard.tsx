import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
}

export function MetricCard({ label, value, detail, icon }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="glass rounded-lg p-5 shadow-glow"
    >
      <div className="flex items-center justify-between text-cyber">
        <span className="text-sm uppercase tracking-wider text-slate-400">{label}</span>
        {icon}
      </div>
      <div className="mt-4 text-3xl font-black text-white">{value}</div>
      <p className="mt-2 text-sm text-slate-300">{detail}</p>
    </motion.div>
  );
}
