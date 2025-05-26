import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const collapseRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Coffee", path: "/coffee" },
  ];

  useEffect(() => {
    if (!navRef.current || !collapseRef.current) return;

    const collapseEl = collapseRef.current;
    const toggler = navRef.current.querySelector(".navbar-toggler");

    if (!toggler) return;

    const MOBILE_BREAKPOINT = 992; // lg breakpoint Bootstrap (px)

    // Fungsi untuk reset style pas resize desktop
    const resetCollapseForDesktop = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        // Desktop: collapse selalu terbuka
        collapseEl.style.height = "auto";
        collapseEl.classList.add("show");
        collapseEl.setAttribute("data-collapsed", "false");
      } else {
        // Mobile: collapse tertutup awalnya
        collapseEl.style.height = "0";
        collapseEl.classList.remove("show");
        collapseEl.setAttribute("data-collapsed", "true");
      }
    };

    resetCollapseForDesktop();

    // Handler klik toggle button
    const onToggle = (e: Event) => {
      e.preventDefault();

      if (window.innerWidth >= MOBILE_BREAKPOINT) return; // di desktop, skip animasi toggle

      if (isAnimatingRef.current) return;

      const isCollapsed = collapseEl.getAttribute("data-collapsed") === "true";

      isAnimatingRef.current = true;

      if (isCollapsed) {
        collapseEl.classList.add("show");
        gsap.to(collapseEl, {
          height: "auto",
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            collapseEl.style.height = "auto";
            isAnimatingRef.current = false;
            collapseEl.setAttribute("data-collapsed", "false");
          },
        });
      } else {
        gsap.to(collapseEl, {
          height: 0,
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => {
            collapseEl.classList.remove("show");
            isAnimatingRef.current = false;
            collapseEl.setAttribute("data-collapsed", "true");
          },
        });
      }
    };

    toggler.addEventListener("click", onToggle);

    // Tambah event listener untuk reset saat resize window
    window.addEventListener("resize", resetCollapseForDesktop);

    return () => {
      toggler.removeEventListener("click", onToggle);
      window.removeEventListener("resize", resetCollapseForDesktop);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="navbar navbar-expand-lg fixed-top"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/">
          Tentang Kopi
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          // jangan pake data-bs-toggle supaya bootstrap gak otomatis handle collapse
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          ref={collapseRef}
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.name}>
                <Link className="nav-link text-white" to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
