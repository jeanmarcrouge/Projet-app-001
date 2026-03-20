import { useSyncExternalStore } from "react";
import {
  getSessionUser,
  SESSION_CHANGE_EVENT,
  UserSession,
} from "@/utils/auth";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => onStoreChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener(SESSION_CHANGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(SESSION_CHANGE_EVENT, handleChange);
  };
}

function getSnapshot(): UserSession | null {
  return getSessionUser();
}

function getServerSnapshot(): UserSession | null {
  return null;
}

export function useSessionUser(): UserSession | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
