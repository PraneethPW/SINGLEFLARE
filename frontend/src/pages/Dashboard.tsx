import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Bot, Boxes, Clock, LifeBuoy, MapPin, RadioTower } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { MetricCard } from "../components/MetricCard";
import { fetchIncidents, fetchResources } from "../services/api";

export function Dashboard() {
  const { data: incidents = [], isLoading: incidentsLoading } = useQuery({ queryKey: ["incidents"], queryFn: fetchIncidents, retry: 1 });
  const { data: resources = [] } = useQuery({ queryKey: ["resources"], queryFn: fetchResources, retry: 1 });
  const priorityIncidents = [...incidents].sort((a, b) => {
    const rank = { Critical: 4, High: 3, Medium: 2, Low: 1 };
    return rank[b.severity] - rank[a.severity];
  });
  const criticalCount = incidents.filter((incident) => incident.severity === "Critical").length;
  const totalResources = resources.reduce((sum, resource) => sum + resource.quantity, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Live Alerts" value={String(incidents.length)} detail={`${criticalCount} critical incident${criticalCount === 1 ? "" : "s"} active`} icon={<RadioTower />} />
        <MetricCard label="Nearby Incidents" value={String(incidents.length)} detail="Pulled from live SOS reports" icon={<MapPin />} />
        <MetricCard label="Resources" value={String(totalResources)} detail={`${resources.length} inventory record${resources.length === 1 ? "" : "s"}`} icon={<Boxes />} />
        <MetricCard label="Response Avg" value={incidents.length ? "11m" : "--"} detail={incidents.length ? "Estimated from active queue" : "No active incidents yet"} icon={<Clock />} />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="glass min-h-[420px] rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black">Priority incidents</h2>
              <p className="mt-1 text-sm text-slate-400">Urgent SOS reports sorted by severity for responder action.</p>
            </div>
            <AlertTriangle className="text-ember" />
          </div>
          <div className="mt-5 space-y-3">
            {incidentsLoading && <div className="rounded-lg bg-white/5 p-4 text-slate-300">Loading live incidents...</div>}
            {!incidentsLoading && priorityIncidents.length === 0 && (
              <div className="grid min-h-64 place-items-center rounded-lg border border-dashed border-white/15 bg-white/5 p-6 text-center">
                <div>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-ember/15 text-ember">
                    <LifeBuoy />
                  </div>
                  <h3 className="mt-4 text-lg font-black">No priority incidents yet</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-300">
                    Create an SOS report to start live response tracking. Critical and high severity incidents will appear here first.
                  </p>
                  <Link to="/sos">
                    <Button className="mt-5" variant="danger" icon={<LifeBuoy size={18} />}>Create SOS Report</Button>
                  </Link>
                </div>
              </div>
            )}
            {priorityIncidents.map((incident) => (
              <div key={incident.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold">{incident.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{incident.description}</p>
                    <p className="mt-2 text-xs uppercase tracking-widest text-slate-500">{incident.category} • {incident.status}</p>
                  </div>
                  <span className="rounded-full bg-ember/20 px-3 py-1 text-xs font-bold text-ember">{incident.severity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-lg p-5">
          <div className="flex items-center gap-2">
            <Bot className="text-cyber" />
            <h2 className="text-xl font-black">AI recommendations</h2>
          </div>
          <div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
            <p>Route water supplies through Sector 12 to avoid bridge congestion.</p>
            <p>Move two medical volunteers to the Riverside camp before nightfall.</p>
            <p>Prepare a missing-person broadcast for vulnerable groups in low-lying blocks.</p>
          </div>
          <div className="mt-6 rounded-lg bg-cyber/10 p-4 text-sm text-cyber">
            Situation summary confidence: 92%
          </div>
        </div>
      </div>
    </div>
  );
}
