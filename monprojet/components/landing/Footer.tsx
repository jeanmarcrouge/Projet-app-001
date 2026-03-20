const socialLinks = [
  { href: "https://x.com", label: "X" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://github.com", label: "GitHub" },
];

export const Footer = () => {
  return (
    <footer id="contact" className="mt-20 border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 md:flex-row md:items-center">
        <p className="text-sm text-slate-400">© {new Date().getFullYear()} monprojet. All rights reserved.</p>
        <div className="flex items-center gap-5 text-sm">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-cyan-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
