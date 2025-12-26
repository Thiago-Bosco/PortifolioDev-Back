import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "About", to: "about" },
  { name: "Skills", to: "skills" },
  { name: "Experience", to: "experience" },
  { name: "Projects", to: "projects" },
  { name: "Contact", to: "contact" },
];

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-4 bg-background/80 backdrop-blur-md border-b border-white/5" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link
            to="hero"
            smooth={true}
            className="text-2xl font-bold font-display tracking-tighter cursor-pointer text-foreground hover:text-primary transition-colors"
          >
            <span className="text-primary">&lt;</span>TB<span className="text-primary">/&gt;</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, i) => (
              <Link
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-100}
                className="text-sm font-mono text-muted-foreground hover:text-primary cursor-pointer transition-colors"
              >
                <span className="text-primary mr-1">0{i + 1}.</span>
                {item.name}
              </Link>
            ))}
            <a 
              href="/resume.pdf" 
              className="px-4 py-1.5 text-sm font-mono text-primary border border-primary rounded hover:bg-primary/10 transition-colors"
              target="_blank"
            >
              Resume
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 z-40 bg-background md:hidden pt-24 px-6"
          >
            <nav className="flex flex-col space-y-6 items-center">
              {navItems.map((item, i) => (
                <Link
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  className="text-xl font-mono text-foreground hover:text-primary cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-primary mr-2">0{i + 1}.</span>
                  {item.name}
                </Link>
              ))}
              <a 
                href="/resume.pdf" 
                className="mt-8 px-8 py-3 text-base font-mono text-primary border border-primary rounded hover:bg-primary/10 transition-colors"
                target="_blank"
              >
                Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
