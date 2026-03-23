"use client";

import { FormEvent, useState } from "react";

interface PaymentFormProps {
  onPaymentSuccess: () => void;
}

export function PaymentForm({ onPaymentSuccess }: PaymentFormProps) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (cardName.trim().length < 2 || cardNumber.replaceAll(" ", "").length < 12) {
      setError("Informations de carte invalides.");
      return;
    }

    setIsProcessing(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 700);
    });

    setIsProcessing(false);
    onPaymentSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="rounded-xl bg-zinc-100 p-3 text-sm text-zinc-700">
        Abonnement mensuel : <strong>5€ / mois</strong>
      </div>

      <input
        value={cardName}
        onChange={(event) => setCardName(event.target.value)}
        placeholder="Nom sur la carte"
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-800 focus:ring"
      />
      <input
        value={cardNumber}
        onChange={(event) => setCardNumber(event.target.value)}
        placeholder="Numéro de carte"
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-800 focus:ring"
      />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={isProcessing}
        className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60"
      >
        {isProcessing ? "Paiement en cours..." : "Payer 5€ et activer l'accès"}
      </button>
    </form>
  );
}
