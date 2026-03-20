import Head from "next/head";
import { useRouter } from "next/router";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/utils/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Login | monprojet</title>
      </Head>
      <AuthForm
        mode="login"
        onSubmit={({ email, password }) => {
          login(email, password);
          router.push("/dashboard");
        }}
      />
    </>
  );
}
