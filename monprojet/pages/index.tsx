import Head from "next/head";
import Link from "next/link";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { Navbar } from "@/components/landing/Navbar";
import { PricingSection } from "@/components/landing/PricingSection";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>monprojet | SaaS Platform</title>
        <meta name="description" content="Complete SaaS starter with landing page and dashboard." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <Navbar />
        <HeroSection />
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 md:p-8">
            <p className="text-sm text-slate-300">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-cyan-300 hover:text-cyan-200">
                Log in here
              </Link>
              .
            </p>
          </div>
        </div>
        <FeaturesSection />
        <PricingSection />
        <Footer />
      </div>
    </>
  );
}
