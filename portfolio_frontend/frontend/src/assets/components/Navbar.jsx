
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

// --- Hooks ---
function useTheme() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}

// --- Components ---
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  // Handle scroll for styling and active section spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple scroll spy
      const sections = ["about", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", label: "Hakkımda" },
    { id: "projects", label: "Projeler" },
    { id: "contact", label: "İletişim" },
  ];

  const pillBaseClasses =
    "backdrop-blur-md border shadow-sm transition-all duration-300";
  const pillLight = "bg-white/80 border-black/5 text-gray-800";
  const pillDark =
    "dark:bg-[var(--color-800)]/80 dark:border-white/10 dark:text-[var(--color-200)]"; // matching your existing variables

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center items-center pointer-events-none px-4">
        <div className="flex items-center gap-2 sm:gap-4 w-full max-w-5xl justify-between sm:justify-center">
          
          {/* LEFT: Theme Toggle */}
          <div className="pointer-events-auto">
             <button
              onClick={toggleTheme}
              className={`${pillBaseClasses} ${pillLight} ${pillDark} h-12 w-12 rounded-full flex items-center justify-center hover:scale-105 active:scale-95`}
              aria-label="Toggle Theme"
            >
              <FontAwesomeIcon
                icon={theme === "dark" ? faSun : faMoon}
                className="text-lg"
              />
            </button> 
          </div>

          {/* CENTER: Navigation (Desktop) */}
          <nav
            className={`${pillBaseClasses} ${pillLight} ${pillDark} hidden sm:flex pointer-events-auto px-2 h-12 rounded-full items-center`}
          >
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.id} className="relative">
                  <a
                    href={`#${link.id}`}
                    onClick={() => setActiveSection(link.id)}
                    className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-200 rounded-full
                      ${
                        activeSection === link.id
                          ? "text-black dark:text-white"
                          : "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                      }
                    `}
                  >
                    {link.label}
                  </a>
                  {/* Floating active pill background */}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full -z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT: CTA Button (Desktop) */}
          <div className="hidden sm:block pointer-events-auto">
            <a
              href="#contact"
              className={`${pillBaseClasses} h-12 px-6 rounded-full flex items-center font-semibold text-sm hover:scale-105 active:scale-95
              bg-gray-900 text-white border-transparent hover:bg-gray-800
              dark:bg-[var(--color-100)] dark:text-[var(--color-900)] dark:hover:bg-[var(--color-200)]`}
            >
              Let's Talk
            </a>
          </div>

          {/* MOBILE: Hamburger Toggle */}
          <div className="sm:hidden pointer-events-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${pillBaseClasses} ${pillLight} ${pillDark} h-12 w-12 rounded-full flex items-center justify-center`}
            >
               <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl bg-white/90 dark:bg-[var(--color-800)]/95 border border-black/5 dark:border-white/10 sm:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-4 rounded-xl text-center font-medium bg-black/5 dark:bg-white/5 text-gray-900 dark:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="p-4 rounded-xl text-center font-bold bg-gray-900 text-white dark:bg-[var(--color-100)] dark:text-[var(--color-900)] mt-2"
              >
                Let's Talk
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
