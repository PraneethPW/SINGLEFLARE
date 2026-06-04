import { Outlet, NavLink } from "react-router-dom";
import { Bell, Bot, Boxes, ChartNoAxesCombined, LifeBuoy, Map, RadioTower, Shield, Users, UserSearch } from "lucide-react";
import { Button } from "../components/Button";
import { useAppStore } from "../store/appStore";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: ChartNoAxesCombined },
  { to: "/sos", label: "SOS", icon: LifeBuoy },
  { to: "/map", label: "Map", icon: Map },
  { to: "/ai-center", label: "AI", icon: Bot },
  { to: "/community", label: "Community", icon: RadioTower },
  { to: "/resources", label: "Resources", icon: Boxes },
  { to: "/volunteers", label: "Volunteers", icon: Users },
  { to: "/missing-persons", label: "Missing", icon: UserSearch },
  { to: "/admin", label: "Admin", icon: Shield }
];

export function AppLayout() {
  const { emergencyMode, setEmergencyMode } = useAppStore();

  return (
    <div className="min-h-screen bg-ink text-white">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-navy/90 p-4 backdrop-blur-xl lg:block">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ember shadow-glow">
            <RadioTower size={22} />
          </div>
          <div>
            <div className="text-lg font-black">SignalFlare</div>
            <div className="text-xs text-slate-400">Emergency mesh command</div>
          </div>
        </div>
        <nav className="mt-6 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isActive ? "bg-white/10 text-cyber" : "text-slate-300 hover:bg-white/10 hover:text-white"}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-ink/82 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyber">Live operations</p>
              <h1 className="text-xl font-black">Disaster response console</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" icon={<Bell size={18} />} aria-label="Notifications" />
              <Button variant={emergencyMode ? "danger" : "secondary"} onClick={() => setEmergencyMode(!emergencyMode)}>
                {emergencyMode ? "Emergency On" : "Standby"}
              </Button>
            </div>
          </div>
        </header>
        <div className="border-b border-white/10 bg-navy/80 px-4 py-2 lg:hidden">
          <div className="flex gap-2 overflow-x-auto">
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} className="shrink-0 rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10">
                {label}
              </NavLink>
            ))}
          </div>
        </div>
        <section className="p-4 sm:p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
