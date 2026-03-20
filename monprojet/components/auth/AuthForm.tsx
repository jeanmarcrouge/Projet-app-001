import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { loginWithEmail, signupWithProfile } from "@/utils/auth";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === "login";
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const title = useMemo(
    () => (isLogin ? "Login to your account" : "Create your account"),
    [isLogin],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim() || (!isLogin && !name.trim())) {
      setError("Please fill all required fields.");
      return;
    }

    if (isLogin) {
      loginWithEmail(email.trim());
    } else {
      signupWithProfile(name.trim(), email.trim());
    }

    void router.push("/dashboard");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">
        {isLogin
          ? "Welcome back! Enter your credentials."
          : "Start your free trial in a few seconds."}
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {!isLogin ? (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-cyan-400/30 transition focus:ring"
              placeholder="Jane Doe"
            />
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-cyan-400/30 transition focus:ring"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-cyan-400/30 transition focus:ring"
            placeholder="••••••••"
          />
        </div>

        {error ? <p className="text-sm text-rose-600">{error}</p> : null}

        <button
          type="submit"
          className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {isLogin ? "Login" : "Sign up"}
        </button>
      </form>

      <p className="mt-5 text-sm text-slate-600">
        {isLogin ? "New here?" : "Already have an account?"}{" "}
        <Link
          href={isLogin ? "/signup" : "/login"}
          className="font-semibold text-cyan-700 hover:text-cyan-600"
        >
          {isLogin ? "Create one" : "Login"}
        </Link>
      </p>
    </div>
  );
}
