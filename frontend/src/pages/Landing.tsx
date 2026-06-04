import { motion } from "framer-motion";
import { Activity, ArrowRight, BadgeCheck, BellRing, Bot, Boxes, ChartNoAxesCombined, CircleDot, Flame, Globe2, LifeBuoy, MapPin, RadioTower, Route, Satellite, Shield, Siren, Sparkles, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { SectionTitle } from "../components/SectionTitle";
import { EarthScene } from "../three/EarthScene";

const features = [
  { title: "SOS Broadcasting", icon: LifeBuoy, body: "One-tap emergency creation with severity, location, media, and live responder updates." },
  { title: "Volunteer Network", icon: Users, body: "Skill-based task routing helps responders find the most urgent nearby assignments." },
  { title: "AI Assistant", icon: Bot, body: "Emergency guidance, first aid flows, summaries, and resource allocation suggestions." },
  { title: "Resource Coordination", icon: Boxes, body: "Track food, water, medicine, shelters, and rescue equipment from request to delivery." },
  { title: "Offline Messaging", icon: RadioTower, body: "Offline-first data queues and mesh-network readiness for infrastructure failures." },
  { title: "Disaster Analytics", icon: ChartNoAxesCombined, body: "Operational dashboards reveal trends, bottlenecks, response times, and risk zones." }
];

const stats = [
  { label: "Lives Assisted", value: "128K", detail: "+18% this quarter", icon: Shield },
  { label: "Active Volunteers", value: "42,810", detail: "Across 214 districts", icon: Users },
  { label: "Resources Moved", value: "9.6M", detail: "Supplies tracked end-to-end", icon: Boxes },
  { label: "Emergency Alerts", value: "1.2M", detail: "Broadcast in real time", icon: RadioTower }
];

const commandCards = [
  { label: "Critical SOS", value: "27", tone: "text-ember", icon: Siren },
  { label: "Mesh Nodes", value: "814", tone: "text-cyber", icon: RadioTower },
  { label: "AI Triage", value: "92%", tone: "text-mint", icon: Bot }
];

const partners = ["ReliefGrid", "CivicOps", "MedBridge", "RescueNet", "UrbanShield", "FieldAid", "AeroReach", "PulseGov"];

const simulationSteps: Array<{ step: string; icon: LucideIcon; body: string }> = [
  { step: "Disaster occurs", icon: Flame, body: "Sensors, citizens, and field teams report impact." },
  { step: "SOS generated", icon: Siren, body: "Location, photos, severity, and category are broadcast." },
  { step: "Volunteers respond", icon: Users, body: "Nearby skilled responders receive ranked tasks." },
  { step: "Resources allocated", icon: Boxes, body: "Water, medicine, shelter, and equipment move fast." }
];

export function Landing() {
  return (
    <div className="overflow-hidden bg-ink text-white">
      <section className="aurora grid-bg relative min-h-screen px-4 pb-10 pt-5 sm:px-6 lg:px-10">
        <div className="pointer-events-none absolute left-[8%] top-32 h-64 w-64 rounded-full border border-ember/20">
          <div className="pulse-ring inset-0" />
          <div className="pulse-ring inset-7" style={{ animationDelay: "0.7s" }} />
          <div className="pulse-ring inset-14" style={{ animationDelay: "1.3s" }} />
        </div>
        <div className="pointer-events-none absolute bottom-24 right-[10%] h-80 w-80 rounded-full border border-cyber/20">
          <div className="pulse-ring inset-0 border-cyber/40" />
          <div className="pulse-ring inset-10 border-cyber/40" style={{ animationDelay: "0.9s" }} />
        </div>
        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ember shadow-glow">
              <RadioTower size={22} />
            </div>
            <span className="text-xl font-black">SignalFlare</span>
          </Link>
          <div className="flex gap-2">
            <Link to="/login"><Button variant="ghost">Login</Button></Link>
            <Link to="/register"><Button>Join Network</Button></Link>
          </div>
        </div>
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-8 py-10 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-5 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyber/30 bg-cyber/10 px-4 py-2 text-sm text-cyber shadow-cyber">
                <Satellite size={16} />
                Decentralized emergency command
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-4 py-2 text-sm text-ember shadow-glow">
                <BellRing size={16} />
                Live disaster response
              </div>
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Communication When Everything Else Fails
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A flashy, battle-ready emergency network for SOS broadcasts, AI triage, volunteer response, resource movement, and live disaster intelligence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register"><Button className="px-6 py-3" icon={<RadioTower size={18} />}>Launch Platform</Button></Link>
              <Link to="/dashboard"><Button variant="secondary" className="px-6 py-3" icon={<Activity size={18} />}>Watch Demo</Button></Link>
            </div>
            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Mesh Ready", Zap],
                ["AI Assisted", Bot],
                ["Geo Aware", MapPin],
                ["Real Time", CircleDot]
              ].map(([item, Icon]) => (
                <motion.div key={String(item)} whileHover={{ y: -4, scale: 1.03 }} className="signal-card rounded-lg border border-white/10 p-4 text-center shadow-glow">
                  <Icon className="mx-auto mb-2 text-cyber" size={20} />
                  <div className="text-sm font-bold text-slate-100">{String(item)}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="relative h-[520px] min-h-[420px] lg:h-[720px]">
            <div className="absolute inset-0 rounded-full bg-cyber/10 blur-3xl" />
            <EarthScene />
            <div className="absolute left-2 top-10 grid gap-3 sm:left-10">
              {commandCards.map(({ label, value, tone, icon: Icon }, index) => (
                <motion.div key={label} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + index * 0.12 }} className="glass signal-card w-44 rounded-lg p-4 shadow-cyber">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-slate-400">{label}</span>
                    <Icon className={tone} size={18} />
                  </div>
                  <div className={`mt-2 text-3xl font-black ${tone}`}>{value}</div>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="glass absolute bottom-8 right-2 w-72 rounded-lg p-4 shadow-glow sm:right-10">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-slate-400">Live routing</span>
                <Route className="text-mint" size={18} />
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                <div className="scanline absolute inset-y-0 h-full w-1/2" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded bg-white/5 p-2"><b className="block text-cyber">04m</b>triage</div>
                <div className="rounded bg-white/5 p-2"><b className="block text-ember">18</b>units</div>
                <div className="rounded bg-white/5 p-2"><b className="block text-mint">96%</b>sync</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-navy/80 px-4 py-8 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {stats.map(({ label, value, detail, icon: Icon }) => (
            <div key={label} className="signal-card relative overflow-hidden rounded-lg border border-white/10 p-5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber to-transparent" />
              <div className="flex items-center justify-between text-cyber">
                <span className="text-xs uppercase tracking-widest text-slate-400">{label}</span>
                <Icon size={20} />
              </div>
              <div className="mt-3 text-4xl font-black">{value}</div>
              <p className="mt-2 text-sm text-slate-300">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6">
        <SectionTitle kicker="Capabilities" title="Built for the first 72 hours" description="When chaos peaks, SignalFlare turns fragmented field reports into coordinated action with a command center that actually feels alive." />
        <div className="mx-auto mt-12 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, body, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="signal-card group relative overflow-hidden rounded-lg border border-white/10 p-6 shadow-glow"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyber/10 blur-2xl transition group-hover:bg-ember/20" />
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyber/10 text-cyber shadow-cyber">
                <Icon />
              </div>
              <h3 className="mt-5 text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{body}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-bold text-cyber">
                Deploy module <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-navy/70 px-4 py-24 sm:px-6">
        <SectionTitle kicker="Simulation" title="From signal to rescue" description="A disaster report becomes a verified route, task queue, and resource plan in minutes." />
        <div className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-4">
          {simulationSteps.map(({ step, icon: Icon, body }, index) => (
            <motion.div key={step} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.12 }} className="signal-card relative overflow-hidden rounded-lg border border-white/10 p-6 text-center">
              <div className="absolute left-1/2 top-10 h-28 w-28 -translate-x-1/2 rounded-full bg-ember/10 blur-2xl" />
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ember text-lg font-black shadow-glow"><Icon /></div>
              <p className="mt-5 font-semibold">{step}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <SectionTitle kicker="Field Proof" title="Trusted by response teams" description="Designed for the way real emergency teams scan, decide, coordinate, and act under pressure." />
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 lg:grid-cols-3">
          {[
            ["The dashboard gave our team a single operational truth during the first hour.", "Incident Commander"],
            ["Resource tracking finally felt fast enough for field movement, not just paperwork.", "NGO Logistics Lead"],
            ["The AI summaries helped volunteers understand risk without waiting for central command.", "Volunteer Coordinator"]
          ].map(([quote, person]) => (
            <div key={person} className="signal-card rounded-lg border border-white/10 p-6 shadow-cyber">
              <BadgeCheck className="text-mint" />
              <p className="mt-5 text-lg leading-8 text-slate-100">"{quote}"</p>
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-cyber">{person}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] py-6">
        <div className="flex overflow-hidden">
          <div className="marquee-track flex min-w-max gap-3 pr-3">
            {[...partners, ...partners].map((partner, index) => (
              <div key={`${partner}-${index}`} className="glass flex h-16 w-44 items-center justify-center rounded-lg text-sm font-black uppercase tracking-widest text-slate-200">
                <Globe2 className="mr-2 text-cyber" size={18} />{partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {["Free", "Community", "Enterprise"].map((tier, index) => (
            <div key={tier} className={`signal-card rounded-lg border border-white/10 p-7 ${index === 1 ? "border-cyber shadow-cyber" : ""}`}>
              {index === 1 && <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyber/10 px-3 py-1 text-xs font-bold text-cyber"><Sparkles size={14} /> Most deployed</div>}
              <h3 className="text-2xl font-black">{tier}</h3>
              <p className="mt-3 text-slate-300">{index === 0 ? "For citizens and local groups." : index === 1 ? "For NGOs and response teams." : "For governments and large operators."}</p>
              <div className="mt-6 text-4xl font-black">{index === 2 ? "Custom" : index === 1 ? "$49" : "$0"}</div>
              <Button className="mt-6 w-full" variant={index === 1 ? "primary" : "secondary"}>Choose Plan</Button>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="aurora signal-card relative mx-auto max-w-7xl overflow-hidden rounded-lg border border-white/10 p-8 text-center shadow-glow sm:p-14">
          <div className="relative z-10">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyber">Ready network</p>
            <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black sm:text-6xl">Turn every phone, volunteer, and supply depot into a response node.</h2>
            <div className="mt-8 flex justify-center gap-3">
              <Link to="/register"><Button className="px-6 py-3" icon={<Zap size={18} />}>Create Account</Button></Link>
              <Link to="/dashboard"><Button variant="secondary" className="px-6 py-3">Open Console</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-400">
        SignalFlare connects communities, volunteers, NGOs, authorities, and responders when infrastructure is under pressure.
      </footer>
    </div>
  );
}
