import { FaGithub, FaEnvelope, FaRss } from "react-icons/fa";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/d3lap1ace",
    icon: FaGithub,
    external: true,
  },
  {
    label: "Gmail",
    href: "mailto:reald3lap1ace@gmail.com",
    icon: FaEnvelope,
    external: false,
  },
  {
    label: "RSS",
    href: "https://d3lap1ace.github.io/myblogs/rss.xml",
    icon: FaRss,
    external: true,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[rgba(0,0,0,0.08)] bg-white">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center sm:justify-between gap-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[rgba(0,0,0,0.55)] font-medium">
          &copy; {year} Lucas Marinotta
        </p>
        <ul className="flex items-center gap-6">
          {links.map(({ label, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 text-[rgba(0,0,0,0.55)] hover:text-pink-600 transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
