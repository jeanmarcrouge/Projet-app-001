import Head from "next/head";
import { useRouter } from "next/router";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/utils/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sign up | monprojet</title>
      </Head>
      <AuthForm
        mode="signup"
        onSubmit={({ name, email, password }) => {
          signup(name || "User", email, password);
          router.push("/dashboard");
        }}
      />
    </>
  );
}
