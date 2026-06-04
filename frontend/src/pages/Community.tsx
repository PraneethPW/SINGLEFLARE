import { BluetoothConnected, Megaphone, Mic, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const channels = ["Local Community", "Volunteers", "NGOs", "Authorities"];
const messages = ["Shelter A has 40 beds available.", "Volunteer medical team is heading to Riverside.", "Bridge route closed. Use eastern corridor."];

export function Community() {
  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <div className="glass rounded-lg p-4">
        {channels.map((channel) => <div key={channel} className="mb-2 rounded-lg bg-white/5 p-3 font-semibold">{channel}</div>)}
      </div>
      <div className="glass rounded-lg p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3"><h2 className="text-2xl font-black">Volunteer channel</h2><Megaphone className="text-cyber" /></div>
          <Link to="/offline-chat"><Button variant="secondary" icon={<BluetoothConnected size={18} />}>Offline Bluetooth Chat</Button></Link>
        </div>
        <div className="mt-6 space-y-3">
          {messages.map((message) => <div key={message} className="rounded-lg bg-white/5 p-4 text-slate-200">{message}</div>)}
        </div>
        <div className="mt-5 flex gap-2">
          <Button variant="secondary" icon={<Mic size={18} />} aria-label="Record voice" />
          <input className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Broadcast an update" />
          <Button icon={<Send size={18} />}>Send</Button>
        </div>
      </div>
    </div>
  );
}
