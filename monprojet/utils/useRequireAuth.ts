import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

export const useRequireAuth = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [router, user]);

  return { user, isChecking: !user };
};
