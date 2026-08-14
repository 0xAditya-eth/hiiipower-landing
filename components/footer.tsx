import { Logo } from "@/components/logo";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Compare", href: "#compare" },
    { label: "FAQ", href: "#faq" },
  ],
  Resources: [
    { label: "Documentation", href: "https://docs.hiiipower.app", external: true },
    { label: "Join waitlist", href: "#join" },
    { label: "Terms of Service", href: "/tos" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-zinc-200/60 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
          <div className="col-span-2 sm:col-span-1">
            <a href="#" className="inline-flex">
              <Logo />
            </a>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed max-w-xs">
              The social network where authenticity wins. Real people. Real moments. Real power.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} HiiiPower Technologies Private Limited. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400">Built for real people.</p>
        </div>
      </div>
    </footer>
  );
}
