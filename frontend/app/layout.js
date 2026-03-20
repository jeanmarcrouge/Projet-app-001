import '../styles/tailwind.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'SaaS Compliance MVP',
  description: 'Regulatory compliance guidance for small businesses',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
