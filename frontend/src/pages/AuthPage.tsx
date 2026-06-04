import { AlertCircle, Loader2, Mail, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { loginUser, registerUser, requestPasswordReset } from "../services/api";
import type { Role } from "../types/domain";

interface AuthPageProps {
  mode: "login" | "register" | "forgot-password" | "reset-password" | "email-verification";
}

const copy = {
  login: ["Welcome back", "Access emergency operations."],
  register: ["Join SignalFlare", "Create a responder-ready account."],
  "forgot-password": ["Recover access", "We will send a secure reset link."],
  "reset-password": ["Reset password", "Choose a new secure password."],
  "email-verification": ["Verify email", "Confirm your identity to continue."]
};

export function AuthPage({ mode }: AuthPageProps) {
  const [title, subtitle] = copy[mode];
  const needsPassword = mode === "login" || mode === "register" || mode === "reset-password";
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("Citizen");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "login") {
        const data = await loginUser({ email, password });
        localStorage.setItem("signalflare-token", data.accessToken);
        localStorage.setItem("signalflare-refresh-token", data.refreshToken);
        localStorage.setItem("signalflare-user", JSON.stringify(data.user));
        navigate("/dashboard");
        return;
      }

      if (mode === "register") {
        const data = await registerUser({ name, email, password, role });
        localStorage.setItem("signalflare-token", data.accessToken);
        localStorage.setItem("signalflare-refresh-token", data.refreshToken);
        localStorage.setItem("signalflare-user", JSON.stringify(data.user));
        navigate("/dashboard");
        return;
      }

      if (mode === "forgot-password") {
        const message = await requestPasswordReset(email);
        setSuccess(message);
        return;
      }

      setSuccess("Request completed. You can return to login.");
    } catch (err) {
      const maybeError = err as { response?: { data?: { message?: string } } };
      setError(maybeError.response?.data?.message ?? "Something went wrong. Check the backend is running on port 5153.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="aurora grid min-h-screen place-items-center px-4">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="glass relative z-10 w-full max-w-md rounded-lg p-7 shadow-glow">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ember"><ShieldCheck /></div>
          <div>
            <h1 className="text-2xl font-black">{title}</h1>
            <p className="text-sm text-slate-300">{subtitle}</p>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "register" && <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Full name" required />}
          <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Email address" type="email" required />
          {needsPassword && <input value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber" placeholder="Password, minimum 8 characters" type="password" minLength={8} required />}
          {mode === "register" && (
            <select value={role} onChange={(event) => setRole(event.target.value as Role)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber">
              {["Citizen", "Volunteer", "NGO", "First Responder"].map((item) => <option key={item}>{item}</option>)}
            </select>
          )}
          {error && <div className="flex items-start gap-2 rounded-lg border border-ember/30 bg-ember/10 p-3 text-sm text-ember"><AlertCircle size={18} />{error}</div>}
          {success && <div className="rounded-lg border border-mint/30 bg-mint/10 p-3 text-sm text-mint">{success}</div>}
          <Button className="w-full" disabled={loading} icon={loading ? <Loader2 className="animate-spin" size={18} /> : <Mail size={18} />}>{mode === "login" ? "Login" : "Continue"}</Button>
        </form>
        <div className="mt-5 flex justify-between text-sm text-slate-300">
          <Link to="/register">Register</Link>
          <Link to="/forgot-password">Forgot password</Link>
        </div>
      </div>
    </main>
  );
}
