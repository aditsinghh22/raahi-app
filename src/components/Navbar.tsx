'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/compliance-map', label: 'Compliance Map' },
  { href: '/financial', label: 'Financial Engine' },
  { href: '/labour-law', label: 'Labour Law' },
  { href: '/licenses', label: 'Licenses' },
  { href: '/schemes', label: 'Govt Schemes' },
  { href: '/credit-score', label: 'Credit Score' },
  { href: '/documents', label: 'Documents' },
  { href: '/alerts', label: 'Alerts' },
  { href: '/pricing', label: 'Pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo}>
            <motion.div
              className={styles.logoIcon}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L28 8V24L16 30L4 24V8L16 2Z" stroke="#f97316" strokeWidth="2" fill="none"/>
                <path d="M16 8L22 11V21L16 24L10 21V11L16 8Z" fill="#f97316" opacity="0.3"/>
                <circle cx="16" cy="16" r="3" fill="#f97316"/>
              </svg>
            </motion.div>
            <span className={styles.logoText}>RAAHI</span>
          </Link>

          <div className={styles.navLinks}>
            {navLinks.slice(0, 6).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <div className={styles.moreMenu}>
              <button className={styles.navLink}>
                More
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ marginLeft: 4 }}>
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </button>
              <div className={styles.dropdown}>
                {navLinks.slice(6).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.dropdownLink} ${pathname === link.href ? styles.active : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.navActions}>
            <Link href="/dashboard" className={styles.dashboardBtn}>
              Dashboard
            </Link>
            <button
              className={styles.menuToggle}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`${styles.menuLine} ${menuOpen ? styles.open : ''}`} />
              <span className={`${styles.menuLine} ${menuOpen ? styles.open : ''}`} />
              <span className={`${styles.menuLine} ${menuOpen ? styles.open : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileMenuInner}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`${styles.mobileLink} ${pathname === link.href ? styles.active : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/dashboard" className={`btn btn-primary ${styles.mobileDashboard}`}>
                  Go to Dashboard
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
