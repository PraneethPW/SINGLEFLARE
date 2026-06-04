import { Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminStats } from "../services/api";

const rows = [
  ["Users", "users"],
  ["Emergencies", "emergencies"],
  ["Resources", "resources"],
  ["Reports", "reports"],
  ["NGOs", "ngos"],
  ["Volunteers", "volunteers"],
  ["Missing Persons", "missingPersons"],
  ["Notifications", "notifications"]
] as const;

export function Admin() {
  const { data = {} } = useQuery({ queryKey: ["admin-stats"], queryFn: fetchAdminStats, retry: 1 });
  return (
    <div className="glass rounded-lg p-5">
      <div className="flex items-center gap-3"><Shield className="text-cyber" /><h2 className="text-2xl font-black">Admin panel</h2></div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(([label, key]) => (
          <div key={key} className="rounded-lg border border-white/10 bg-white/5 p-5">
            <p className="text-slate-400">{label}</p>
            <div className="mt-3 text-3xl font-black">{data[key] ?? 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
