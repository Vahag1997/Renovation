"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import { siteRoutes } from "@/app/_data/routes";
import { LinkPendingHint } from "@/app/_components/LinkPendingHint";

export function SiteShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isScrolledRef = useRef(false);
  const [headerHeight, setHeaderHeight] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    isScrolledRef.current = isScrolled;
  }, [isScrolled]);

  // The header is fixed, so content below it needs padding equal to its height.
  // That height depends on how the utility bar and nav labels wrap, which no
  // hardcoded value can track — so measure it at its resting (unscrolled) size.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const measure = () => {
      if (isScrolledRef.current) return;
      setHeaderHeight(el.getBoundingClientRect().height);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // The admin panel has its own chrome — render it without the public header/footer.
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  const hasOverlayHero = pathname === "/" || pathname === "/o-kompanii";

  return (
    <div className="relative w-full max-w-full overflow-x-hidden flex flex-col min-h-screen bg-background text-on-background selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Header Container */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-outline-variant ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        {/* Utility Bar */}
        <div className="utility-bar w-full bg-primary text-on-primary py-2.5 px-margin-mobile lg:px-margin-desktop flex flex-col md:flex-row md:justify-center items-center text-[10px] font-sans font-medium uppercase tracking-widest text-center gap-1.5">
          <span>Премиум ремонт и архитектурное проектирование</span>
        </div>

        {/* Navigation Bar */}
        <nav
          className={`mx-auto max-w-container-max-width w-full flex justify-between items-center px-margin-mobile lg:px-margin-desktop transition-all duration-300 ${
            isScrolled ? "py-3" : "py-5"
          }`}
        >
          {/* Logo */}
          <Link
            className="font-serif text-[22px] sm:text-[26px] lg:text-[28px] xl:text-[32px] tracking-widest text-primary hover:opacity-85 transition-opacity whitespace-nowrap leading-tight"
            href="/"
          >
            STUDIO AURA
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex gap-4 xl:gap-8 items-center">
            {siteRoutes.map((route) => {
              const isActive = pathname === route.href || pathname.startsWith(route.href + "/");
              const hasChildren = !!route.children && route.children.length > 0;
              return (
                <div key={route.href} className="relative group py-2">
                  <Link
                    className={`font-sans text-[11px] lg:text-xs leading-none tracking-widest font-medium uppercase transition-colors duration-300 pb-1 hover:text-primary flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? "text-primary"
                        : "text-on-surface-variant"
                    }`}
                    href={route.href}
                  >
                    {route.label}
                    {hasChildren && (
                      <svg
                        className="w-3.5 h-3.5 opacity-60 transition-transform group-hover:rotate-180 duration-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    <LinkPendingHint />
                  </Link>
                  {hasChildren && route.children && (
                    <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-background border border-outline-variant min-w-[240px] shadow-lg flex flex-col py-3">
                        {route.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`px-6 py-2.5 hover:bg-surface-container font-sans text-[10px] tracking-widest font-medium uppercase transition-colors text-left block ${
                                isChildActive ? "text-primary font-medium" : "text-on-surface-variant hover:text-primary"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Header CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              className="hidden lg:block font-sans text-[11px] leading-none tracking-widest font-medium uppercase bg-primary text-on-primary px-4 xl:px-6 py-3.5 hover:bg-secondary hover:text-on-secondary transition-all duration-300 whitespace-nowrap"
              href="/kontakty"
            >
              Обсудить проект
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center text-primary p-2 hover:opacity-80 transition-opacity"
              aria-label="Открыть меню"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full border-t border-b border-outline-variant bg-background/98 backdrop-blur-lg p-8 flex flex-col gap-6 shadow-xl animate-fade-in z-50 max-h-[80vh] overflow-y-auto px-margin-mobile">
            {siteRoutes.map((route) => {
              const isActive = pathname === route.href || pathname.startsWith(route.href + "/");
              const hasChildren = !!route.children && route.children.length > 0;
              return (
                <div key={route.href} className="flex flex-col gap-2">
                  <Link
                    className={`font-sans text-xs leading-none tracking-widest font-medium uppercase block py-2 border-b border-outline-variant/30 hover:text-primary ${
                      isActive ? "text-primary font-semibold" : "text-on-surface-variant"
                    }`}
                    href={route.href}
                    onClick={closeMobileMenu}
                  >
                    {route.label}
                  </Link>
                  {hasChildren && route.children && (
                    <div className="pl-4 flex flex-col gap-3 border-l border-outline-variant/30 ml-1 mt-1">
                      {route.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            className={`font-sans text-[10px] leading-none tracking-widest font-medium uppercase block py-1 hover:text-primary ${
                              isChildActive ? "text-primary font-semibold" : "text-on-surface-variant/70"
                            }`}
                            href={child.href}
                            onClick={closeMobileMenu}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              className="w-full text-center font-sans text-xs leading-none tracking-widest font-medium uppercase bg-primary text-on-primary py-4 hover:bg-secondary transition-all duration-300 mt-2"
              href="/kontakty"
              onClick={closeMobileMenu}
            >
              Обсудить проект
            </Link>
          </div>
        )}
      </header>

      {/* Main Content Area. Pages with a full-bleed hero deliberately run under
          the header; every other page is offset by the measured header height,
          with a class fallback for the first paint before measurement lands. */}
      <div
        className={`flex-grow ${
          hasOverlayHero ? "pt-0" : "pt-[131px] sm:pt-[116px] lg:pt-[126px] xl:pt-[116px]"
        }`}
        style={
          hasOverlayHero || headerHeight === null
            ? undefined
            : { paddingTop: `${Math.ceil(headerHeight)}px` }
        }
      >
        {children}
      </div>

      {/* Footer */}
      <footer className="site-footer w-full mt-section-gap border-t border-outline-variant bg-background">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-6 md:px-margin-desktop py-16 max-w-container-max-width mx-auto items-start">
          {/* Logo & Description */}
          <div className="col-span-12 md:col-span-4 mb-8 md:mb-0">
            <span className="font-serif text-2xl tracking-widest text-primary block mb-6">
              STUDIO AURA
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mb-8">
              Создаем пространства тихой роскоши, балансирующие между вневременным
              минимализмом и архитектурной чистотой.
            </p>
            <p className="font-sans text-[10px] leading-none tracking-wider font-normal uppercase text-on-surface-variant/60">
              © {new Date().getFullYear()} STUDIO AURA. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-6 md:col-span-3 flex flex-col gap-2 items-start">
            <span className="font-sans text-xs leading-none tracking-widest font-semibold uppercase text-primary mb-2">Навигация</span>
            {siteRoutes.map((route) => (
              <Link
                key={route.href}
                className="font-sans text-xs leading-none tracking-widest font-medium uppercase text-on-surface-variant hover:text-secondary transition-colors duration-300 py-1.5"
                href={route.href}
              >
                {route.label}
              </Link>
            ))}
            <Link
              className="font-sans text-xs leading-none tracking-widest font-medium uppercase text-on-surface-variant hover:text-secondary transition-colors duration-300 py-1.5"
              href="/kontakty"
            >
              Контакты
            </Link>
          </div>

          {/* Location / Office Column */}
          <div className="col-span-6 md:col-span-3 flex flex-col gap-4">
            <span className="font-sans text-xs leading-none tracking-widest font-semibold uppercase text-primary mb-2">Связаться</span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              ул. Амиряна, 12, Ереван, Армения
              <br />
              ул. Кутузовский Проспект, 21, Москва
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              <span className="font-sans text-[10px] leading-none tracking-wider font-normal uppercase block text-on-surface-variant/60 mb-1">
                Email
              </span>
              hello@studioaura.design
            </p>
          </div>

          {/* Legal and Back To Top Column */}
          <div className="col-span-12 md:col-span-2 flex flex-col items-start md:items-end gap-2 mt-8 md:mt-0">
            <span className="font-sans text-xs leading-none tracking-widest font-semibold uppercase text-primary mb-2">Инфо</span>
            <Link
              className="font-sans text-xs leading-none tracking-widest font-medium uppercase text-on-surface-variant hover:text-secondary transition-colors duration-300 py-1.5"
              href="/o-kompanii"
            >
              О студии
            </Link>
            <Link
              className="font-sans text-xs leading-none tracking-widest font-medium uppercase text-on-surface-variant hover:text-secondary transition-colors duration-300 py-1.5"
              href="/partnery"
            >
              Партнеры
            </Link>
            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 py-2 text-on-surface-variant cursor-pointer group hover:text-primary transition-colors"
            >
              <span className="font-sans text-xs leading-none tracking-widest font-medium uppercase">ВВЕРХ</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-y-1 duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7 7 7M12 3v18" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
