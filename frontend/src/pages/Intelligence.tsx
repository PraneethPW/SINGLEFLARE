import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { trendData } from "../utils/data";

export function Intelligence() {
  return (
    <div className="glass rounded-lg p-5">
      <h2 className="text-2xl font-black">Disaster intelligence</h2>
      <p className="mt-2 text-slate-300">Incident trends, resource usage, response times, and volunteer efficiency.</p>
      <div className="mt-6 h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="incidentFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff3d2e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff3d2e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: "#07111f", border: "1px solid rgba(255,255,255,0.14)", color: "white" }} />
            <Area type="monotone" dataKey="incidents" stroke="#ff3d2e" fill="url(#incidentFill)" />
            <Area type="monotone" dataKey="resources" stroke="#00d1ff" fill="rgba(0,209,255,0.12)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
