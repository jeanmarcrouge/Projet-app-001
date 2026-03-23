"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import {
  adminUserAccount,
  defaultUserAccount,
  mockForumPosts,
  mockObligations,
  mockUpcomingTaxes,
} from "@/lib/mockData";
import {
  filterObligationsForProfile,
  filterUpcomingTaxesForProfile,
} from "@/lib/filtering";
import { useNotifications } from "@/hooks/useNotifications";
import { CompanyProfile, ForumPost, UserAccount } from "@/types/domain";

interface RegistrationPayload extends CompanyProfile {
  selectedRole?: UserAccount["role"];
}

interface AppContextValue {
  currentUser: UserAccount | null;
  obligationsForUser: ReturnType<typeof filterObligationsForProfile>;
  upcomingTaxesForUser: ReturnType<typeof filterUpcomingTaxesForProfile>;
  forumPosts: ForumPost[];
  notifications: ReturnType<typeof useNotifications>;
  registerAndSubscribe: (payload: RegistrationPayload) => void;
  addForumPost: (title: string, content: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

function buildAccountFromProfile(payload: RegistrationPayload): UserAccount {
  const baseUser = payload.selectedRole === "admin" ? adminUserAccount : defaultUserAccount;

  return {
    ...baseUser,
    id: `user-${Date.now()}`,
    role: payload.selectedRole ?? "user",
    subscriptionActive: true,
    profile: {
      companyName: payload.companyName,
      ownerName: payload.ownerName,
      email: payload.email,
      companyType: payload.companyType,
      taxRegime: payload.taxRegime,
      yearlyRevenue: Number(payload.yearlyRevenue),
      employeeCount: Number(payload.employeeCount),
    },
    createdAt: new Date().toISOString(),
  };
}

export function AppProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(defaultUserAccount);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(mockForumPosts);

  const obligationsForUser = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    return filterObligationsForProfile(currentUser.profile, mockObligations);
  }, [currentUser]);

  const upcomingTaxesForUser = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    return filterUpcomingTaxesForProfile(currentUser.profile, mockUpcomingTaxes);
  }, [currentUser]);

  const notifications = useNotifications({
    obligations: obligationsForUser,
    upcomingTaxes: upcomingTaxesForUser,
  });

  const value = useMemo<AppContextValue>(
    () => ({
      currentUser,
      obligationsForUser,
      upcomingTaxesForUser,
      forumPosts,
      notifications,
      registerAndSubscribe: (payload) => {
        setCurrentUser(buildAccountFromProfile(payload));
      },
      addForumPost: (title, content) => {
        if (!currentUser) {
          return;
        }

        const post: ForumPost = {
          id: `post-${Date.now()}`,
          authorName: currentUser.profile.ownerName,
          authorCompanyType: currentUser.profile.companyType,
          title,
          content,
          createdAt: new Date().toISOString(),
          likes: 0,
        };

        setForumPosts((prev) => [post, ...prev]);
      },
      logout: () => setCurrentUser(null),
    }),
    [
      currentUser,
      obligationsForUser,
      upcomingTaxesForUser,
      forumPosts,
      notifications,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return ctx;
}
