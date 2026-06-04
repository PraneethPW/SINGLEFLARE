import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload, UserSearch } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/Button";
import { createMissingPerson, fetchMissingPersons } from "../services/api";

export function MissingPersons() {
  const queryClient = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["missing-persons"], queryFn: fetchMissingPersons, retry: 1 });
  const [name, setName] = useState("Unknown child");
  const [photoUrl, setPhotoUrl] = useState("");
  const [lastSeen, setLastSeen] = useState("Riverside shelter gate");
  const [details, setDetails] = useState("Blue jacket, approximately 8 years old, separated during evacuation.");
  const mutation = useMutation({
    mutationFn: () => createMissingPerson({ name, photoUrl, lastSeen, details }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["missing-persons"] })
  });

  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1fr]">
      <form className="glass rounded-lg p-5" onSubmit={(event) => { event.preventDefault(); mutation.mutate(); }}>
        <div className="flex items-center gap-3"><UserSearch className="text-cyber" /><h2 className="text-2xl font-black">Missing person report</h2></div>
        <div className="mt-5 grid gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/5 p-10 text-slate-300"><Upload /> Upload photo</button>
          <input value={photoUrl} onChange={(event) => setPhotoUrl(event.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Photo URL optional" />
          <input value={name} onChange={(event) => setName(event.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Full name" required />
          <input value={lastSeen} onChange={(event) => setLastSeen(event.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Last seen location" required />
          <textarea value={details} onChange={(event) => setDetails(event.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Details" required />
          <Button disabled={mutation.isPending}>{mutation.isPending ? "Matching..." : "Create Report And Run Match"}</Button>
        </div>
      </form>
      <div className="glass rounded-lg p-5">
        <h2 className="text-2xl font-black">Active reports and AI match score</h2>
        <div className="mt-5 space-y-3">
          {data.length === 0 && <div className="rounded-lg bg-cyber/10 p-5 text-cyber">No active reports yet.</div>}
          {data.map((person) => (
            <div key={person.id} className="rounded-lg bg-white/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <b>{person.name}</b>
                <span className="rounded-full bg-ember/10 px-3 py-1 text-sm text-ember">{person.matchScore ?? 0}% match</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">Last seen: {person.lastSeen}</p>
              <p className="mt-2 text-sm text-slate-400">{person.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
