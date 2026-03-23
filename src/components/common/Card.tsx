import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
}

export function Card({ title, subtitle, children }: CardProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      {(title || subtitle) && (
        <header className="mb-4">
          {title ? <h2 className="text-lg font-semibold text-zinc-900">{title}</h2> : null}
          {subtitle ? <p className="text-sm text-zinc-500">{subtitle}</p> : null}
        </header>
      )}
      {children}
    </section>
  );
}
