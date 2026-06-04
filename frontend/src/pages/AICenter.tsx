import { useMutation } from "@tanstack/react-query";
import { Bot, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/Button";
import { askEmergencyAI } from "../services/api";

export function AICenter() {
  const [message, setMessage] = useState("What should volunteers do first during an urban flood?");
  const [answers, setAnswers] = useState<string[]>([]);
  const mutation = useMutation({
    mutationFn: askEmergencyAI,
    onSuccess: (answer) => setAnswers((items) => [...items, answer])
  });

  return (
    <div className="glass mx-auto max-w-4xl rounded-lg p-5">
      <div className="flex items-center gap-3"><Bot className="text-cyber" /><h2 className="text-2xl font-black">AI emergency center</h2></div>
      <div className="mt-6 min-h-80 space-y-4 rounded-lg bg-white/5 p-4">
        {answers.length === 0 && <p className="text-slate-300">Ask for first aid, evacuation, resource allocation, or incident summaries.</p>}
        {answers.map((answer, index) => <div key={index} className="rounded-lg bg-navy p-4 leading-7 text-slate-100">{answer}</div>)}
      </div>
      <form className="mt-4 flex gap-2" onSubmit={(event) => { event.preventDefault(); mutation.mutate(message); }}>
        <input value={message} onChange={(event) => setMessage(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" />
        <Button disabled={mutation.isPending} icon={<Send size={18} />}>{mutation.isPending ? "Thinking" : "Send"}</Button>
      </form>
    </div>
  );
}
