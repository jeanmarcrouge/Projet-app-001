import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export const useRequireAuth = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (user) {
      setIsChecking(false);
      return;
    }

    router.replace("/login");
  }, [router, user]);

  return { user, isChecking };
};
