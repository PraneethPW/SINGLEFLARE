import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Boxes, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/Button";
import { createResource, fetchResources } from "../services/api";
import type { ResourceItem } from "../types/domain";
import { demoResources } from "../utils/data";

export function Resources() {
  const queryClient = useQueryClient();
  const { data = demoResources } = useQuery({ queryKey: ["resources"], queryFn: fetchResources, retry: 1 });
  const [name, setName] = useState("Water cans");
  const [type, setType] = useState<ResourceItem["type"]>("Water");
  const [quantity, setQuantity] = useState(100);
  const [location, setLocation] = useState("Central depot");
  const mutation = useMutation({
    mutationFn: () => createResource({ name, type, quantity, location, status: "available" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resources"] })
  });

  return (
    <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
      <form className="glass rounded-lg p-5" onSubmit={(event) => { event.preventDefault(); mutation.mutate(); }}>
        <div className="flex items-center gap-3"><Boxes className="text-cyber" /><h2 className="text-2xl font-black">Add resource</h2></div>
        <div className="mt-5 grid gap-3">
          <input value={name} onChange={(event) => setName(event.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Item name" required />
          <select value={type} onChange={(event) => setType(event.target.value as ResourceItem["type"])} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber">
            {["Food", "Water", "Medicine", "Shelter", "Rescue Equipment"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <input value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Quantity" type="number" min={0} required />
          <input value={location} onChange={(event) => setLocation(event.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Location" required />
          <Button disabled={mutation.isPending} icon={<Plus size={18} />}>{mutation.isPending ? "Saving..." : "Add Resource"}</Button>
        </div>
      </form>
      <div className="glass rounded-lg p-5">
        <div className="flex items-center gap-3"><Boxes className="text-cyber" /><h2 className="text-2xl font-black">Resource inventory</h2></div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="text-slate-400"><tr><th className="p-3">Item</th><th>Type</th><th>Quantity</th><th>Location</th><th>Status</th></tr></thead>
            <tbody>
              {data.map((resource) => (
                <tr key={resource.id} className="border-t border-white/10">
                  <td className="p-3 font-semibold">{resource.name}</td>
                  <td>{resource.type}</td>
                  <td>{resource.quantity}</td>
                  <td>{resource.location}</td>
                  <td><span className="rounded-full bg-cyber/10 px-3 py-1 text-cyber">{resource.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
