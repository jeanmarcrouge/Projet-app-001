export type SessionUser = {
  name: string;
  email: string;
};

const STORAGE_KEY = "monprojet_session_user";

export const saveSessionUser = (user: SessionUser): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const getSessionUser = (): SessionUser | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const clearSessionUser = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};
