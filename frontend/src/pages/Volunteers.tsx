import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Plus, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/Button";
import { createVolunteer, fetchVolunteers } from "../services/api";

export function Volunteers() {
  const queryClient = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["volunteers"], queryFn: fetchVolunteers, retry: 1 });
  const [name, setName] = useState("Aarav Mehta");
  const [email, setEmail] = useState("aarav@signalflare.local");
  const [skills, setSkills] = useState("first aid, boat rescue, logistics");
  const [availability, setAvailability] = useState("Available today, 6 hours");
  const [currentTask, setCurrentTask] = useState("Medical triage desk");
  const mutation = useMutation({
    mutationFn: () => createVolunteer({ name, email, skills, availability, currentTask }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["volunteers"] })
  });

  return (
    <div className="grid gap-5 lg:grid-cols-[0.85fr_1fr]">
      <form className="glass rounded-lg p-5" onSubmit={(event) => { event.preventDefault(); mutation.mutate(); }}>
        <div className="flex items-center gap-3"><Users className="text-cyber" /><h2 className="text-2xl font-black">Volunteer registration</h2></div>
        <div className="mt-5 grid gap-3">
          <input value={name} onChange={(event) => setName(event.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Name" required />
          <input value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Email" type="email" required />
          <input value={skills} onChange={(event) => setSkills(event.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Skills, comma separated" required />
          <input value={availability} onChange={(event) => setAvailability(event.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Availability" required />
          <input value={currentTask} onChange={(event) => setCurrentTask(event.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Current task" />
          <Button disabled={mutation.isPending} icon={<Plus size={18} />}>{mutation.isPending ? "Registering..." : "Register Volunteer"}</Button>
        </div>
      </form>
      <div className="glass rounded-lg p-5">
        <h2 className="text-2xl font-black">Live volunteer roster</h2>
        <div className="mt-5 space-y-3">
          {data.length === 0 && <div className="rounded-lg bg-white/5 p-4 text-slate-300">No volunteers registered yet.</div>}
          {data.map((volunteer) => (
            <div key={volunteer.id} className="rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-3"><CheckCircle2 className="text-mint" /><b>{volunteer.name}</b><span className="text-sm text-slate-400">{volunteer.email}</span></div>
              <p className="mt-2 text-sm text-slate-300">{volunteer.availability}</p>
              <div className="mt-3 flex flex-wrap gap-2">{volunteer.skills.map((skill) => <span key={skill} className="rounded-full bg-cyber/10 px-3 py-1 text-xs text-cyber">{skill}</span>)}</div>
              {volunteer.currentTask && <p className="mt-3 text-sm text-ember">Assigned: {volunteer.currentTask}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
