import { useEffect, useRef, type RefObject } from "react";
import { Link } from "react-router";

export default function Footer({ mainRef }: { mainRef: RefObject<HTMLDivElement | null> }) {
  const height = 153;
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervale = setInterval(() => {
      if (!mainRef.current || !footerRef.current) return;

      const main = mainRef.current.getBoundingClientRect();
      const windowSize = window.innerHeight;

      const check = (44 + main.height) > (windowSize - height);

      if (check) {
        footerRef.current.style.position = "static";
        footerRef.current.style.translate = "0px";
      } else {
        footerRef.current.style.position = "fixed";
        footerRef.current.style.translate = "-50% 0%"
      }

    }, 250);

    return () => {
      clearInterval(intervale);
    }
  }, [])

  return (
    <div className="h-40 mt-2">
      <footer ref={footerRef} className="fixed z-20 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl mx-auto border-t border-teal-500/20 dark:border-emerald-500/20 bg-white dark:bg-zinc-950 ">
        <div className="px-6 pt-10 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </div>

            {/* Links */}
            <nav className="flex items-center gap-8">
              <Link
                to="/privacy"
                className="text-sm font-medium text-emerald-400 dark:text-zinc-400 text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 transition-all duration-200 hover:scale-105"
              >
                Privacy Policy
              </Link>
              {/* Add more links here later */}
            </nav>
          </div>

          {/* Accent line */}
          <div className="mt-8 h-px bg-gradient-to-r from-teal-500 to-emerald-500 opacity-30"></div>
        </div>
      </footer>
    </div>
  )
}
