import Link from "next/link";
import { FormEvent, useState } from "react";

type AuthFormProps = {
  mode: "login" | "signup";
  onSubmit: (values: { name?: string; email: string; password: string }) => void;
};

export const AuthForm = ({ mode, onSubmit }: AuthFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignup = mode === "signup";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12">
      <div className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/60">
        <h1 className="text-2xl font-bold text-white">{isSignup ? "Create account" : "Welcome back"}</h1>
        <p className="mt-2 text-sm text-slate-300">
          {isSignup
            ? "Start using your SaaS workspace in less than a minute."
            : "Log in to access your dashboard and data."}
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <label className="block">
              <span className="mb-1 block text-sm text-slate-200">Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-300 transition focus:ring-2"
              />
            </label>
          )}

          <label className="block">
            <span className="mb-1 block text-sm text-slate-200">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-300 transition focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-slate-200">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-300 transition focus:ring-2"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950 hover:bg-cyan-300"
          >
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-300">
          {isSignup ? "Already have an account?" : "No account yet?"}{" "}
          <Link href={isSignup ? "/login" : "/signup"} className="font-medium text-cyan-300 hover:text-cyan-200">
            {isSignup ? "Log in" : "Sign up"}
          </Link>
        </p>
      </div>
    </section>
  );
};
