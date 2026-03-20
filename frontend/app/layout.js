import "../styles/globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "Compliance MVP",
  description: "SaaS compliance guidance for small businesses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
