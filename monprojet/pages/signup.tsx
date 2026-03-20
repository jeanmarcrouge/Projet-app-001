import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthForm } from "@/components/auth/AuthForm";
import { isAuthenticated } from "@/utils/auth";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      void router.replace("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 md:py-16">
      <div className="mx-auto mb-6 flex w-full max-w-md items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-slate-700">
          ← Back to home
        </Link>
      </div>
      <AuthForm mode="signup" />
    </div>
  );
}
