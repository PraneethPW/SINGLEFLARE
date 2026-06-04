import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Camera, LifeBuoy, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/Button";
import { createIncident } from "../services/api";
import type { EmergencyCategory, Severity } from "../types/domain";

export function SOSPage() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("Flood rescue request");
  const [description, setDescription] = useState("Family stranded near main road. Need boat and medical check.");
  const [category, setCategory] = useState<EmergencyCategory>("Flood");
  const [severity, setSeverity] = useState<Severity>("Critical");
  const mutation = useMutation({
    mutationFn: () => createIncident({ title, description, category, severity, lat: 28.6139, lng: 77.209 }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["incidents"] })
  });

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
      <form className="glass rounded-lg p-5" onSubmit={(event) => { event.preventDefault(); mutation.mutate(); }}>
        <div className="flex items-center gap-3">
          <LifeBuoy className="text-ember" />
          <h2 className="text-2xl font-black">Create emergency SOS</h2>
        </div>
        <div className="mt-6 grid gap-4">
          <input value={title} onChange={(event) => setTitle(event.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Emergency title" />
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="min-h-32 rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Describe the emergency" />
          <div className="grid gap-4 sm:grid-cols-2">
            <select value={category} onChange={(event) => setCategory(event.target.value as EmergencyCategory)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber">
              {["Flood", "Earthquake", "Fire", "Cyclone", "Medical", "Missing Person", "Infrastructure Damage"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={severity} onChange={(event) => setSeverity(event.target.value as Severity)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber">
              {["Low", "Medium", "High", "Critical"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <button type="button" className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/5 p-6 text-slate-300">
            <Camera /> Upload photos
          </button>
          <Button variant="danger" disabled={mutation.isPending}>{mutation.isPending ? "Broadcasting..." : "Broadcast SOS"}</Button>
        </div>
      </form>
      <div className="glass rounded-lg p-5">
        <div className="flex items-center gap-2 text-cyber"><MapPin /> Location locked</div>
        <div className="mt-5 rounded-lg bg-white/5 p-5">
          <p className="text-sm uppercase tracking-widest text-slate-400">Broadcast radius</p>
          <div className="mt-3 text-4xl font-black">25 km</div>
          <p className="mt-4 text-slate-300">Authorities, volunteers, NGOs, and local channels will receive the alert instantly.</p>
        </div>
        {mutation.isSuccess && <div className="mt-4 rounded-lg bg-mint/10 p-4 text-mint">SOS created and sent to live operations.</div>}
      </div>
    </div>
  );
}
