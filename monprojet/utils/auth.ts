export type UserSession = {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Pro" | "Enterprise";
};

const SESSION_KEY = "saas_session_user";
export const SESSION_CHANGE_EVENT = "saas-session-change";

function safeReadStorage(): UserSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(SESSION_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as UserSession;
  } catch {
    return null;
  }
}

export function getSessionUser(): UserSession | null {
  return safeReadStorage();
}

function persistSession(user: UserSession): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getSessionUser());
}

export function loginWithEmail(email: string): UserSession {
  const nameFromEmail = email.split("@")[0] || "User";
  const user: UserSession = {
    id: crypto.randomUUID(),
    name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
    email,
    plan: "Pro",
  };

  persistSession(user);

  return user;
}

export function signupWithProfile(name: string, email: string): UserSession {
  const cleanName = name.trim() || "User";
  const user: UserSession = {
    id: crypto.randomUUID(),
    name: cleanName,
    email,
    plan: "Free",
  };

  persistSession(user);

  return user;
}

export function updateSessionProfile(name: string, email: string): UserSession | null {
  const existing = getSessionUser();
  if (!existing) {
    return null;
  }

  const updatedUser: UserSession = {
    ...existing,
    name: name.trim() || existing.name,
    email: email.trim() || existing.email,
  };

  persistSession(updatedUser);
  return updatedUser;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
  }
}
