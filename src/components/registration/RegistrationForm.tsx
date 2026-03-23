"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/common/Card";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { useAppContext } from "@/context/AppContext";
import { CompanyType, TaxRegime } from "@/types/domain";

const companyTypes: CompanyType[] = ["micro-entreprise", "sarl", "sas", "eurl"];
const taxRegimes: TaxRegime[] = ["micro-fiscal", "reel-simplifie", "reel-normal"];

export function RegistrationForm() {
  const router = useRouter();
  const { registerAndSubscribe } = useAppContext();

  const [step, setStep] = useState<"profile" | "payment">("profile");
  const [profile, setProfile] = useState({
    companyName: "",
    ownerName: "",
    email: "",
    companyType: "sas" as CompanyType,
    taxRegime: "reel-simplifie" as TaxRegime,
    yearlyRevenue: 0,
    employeeCount: 0,
    selectedRole: "user" as "user" | "admin",
  });

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!profile.companyName || !profile.ownerName || !profile.email) {
      return;
    }

    setStep("payment");
  };

  const handlePaid = () => {
    registerAndSubscribe(profile);
    router.push("/dashboard");
  };

  return (
    <Card
      title="Inscription"
      subtitle="Renseignez le profil de l'entreprise puis activez l'abonnement"
    >
      {step === "profile" ? (
        <form onSubmit={handleProfileSubmit} className="grid gap-3 md:grid-cols-2">
          <input
            value={profile.companyName}
            onChange={(event) =>
              setProfile((prev) => ({ ...prev, companyName: event.target.value }))
            }
            placeholder="Nom de l'entreprise"
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-800 focus:ring md:col-span-2"
          />
          <input
            value={profile.ownerName}
            onChange={(event) =>
              setProfile((prev) => ({ ...prev, ownerName: event.target.value }))
            }
            placeholder="Nom du dirigeant"
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-800 focus:ring"
          />
          <input
            type="email"
            value={profile.email}
            onChange={(event) =>
              setProfile((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Email"
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-800 focus:ring"
          />

          <select
            value={profile.companyType}
            onChange={(event) =>
              setProfile((prev) => ({
                ...prev,
                companyType: event.target.value as CompanyType,
              }))
            }
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-800 focus:ring"
          >
            {companyTypes.map((companyType) => (
              <option key={companyType} value={companyType}>
                {companyType}
              </option>
            ))}
          </select>

          <select
            value={profile.taxRegime}
            onChange={(event) =>
              setProfile((prev) => ({
                ...prev,
                taxRegime: event.target.value as TaxRegime,
              }))
            }
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-800 focus:ring"
          >
            {taxRegimes.map((taxRegime) => (
              <option key={taxRegime} value={taxRegime}>
                {taxRegime}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={0}
            value={profile.yearlyRevenue}
            onChange={(event) =>
              setProfile((prev) => ({ ...prev, yearlyRevenue: Number(event.target.value) }))
            }
            placeholder="Chiffre d'affaires annuel"
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-800 focus:ring"
          />
          <input
            type="number"
            min={0}
            value={profile.employeeCount}
            onChange={(event) =>
              setProfile((prev) => ({ ...prev, employeeCount: Number(event.target.value) }))
            }
            placeholder="Nombre de salariés"
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-800 focus:ring"
          />

          <label className="flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-sm md:col-span-2">
            <input
              type="checkbox"
              checked={profile.selectedRole === "admin"}
              onChange={(event) =>
                setProfile((prev) => ({
                  ...prev,
                  selectedRole: event.target.checked ? "admin" : "user",
                }))
              }
            />
            Simuler un compte administrateur
          </label>

          <button
            type="submit"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 md:col-span-2"
          >
            Continuer vers le paiement
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <PaymentForm onPaymentSuccess={handlePaid} />
          <button
            type="button"
            onClick={() => setStep("profile")}
            className="text-sm text-zinc-600 underline"
          >
            Modifier mes informations
          </button>
        </div>
      )}

      <div className="mt-6 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
        Déjà inscrit ? Ouvrez le <Link href="/dashboard" className="text-blue-600 underline">tableau de bord</Link>.
      </div>
    </Card>
  );
}
