'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import styles from './page.module.css';

const HeroModel = dynamic(() => import('@/components/HeroModel'), {
  ssr: false,
  loading: () => (
    <div className={styles.modelLoader}>
      <div className={styles.loaderRing} />
    </div>
  ),
});

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  {
    icon: '🗺️',
    number: '01',
    title: 'Compliance Map Generator',
    description: 'Tell us about your business. We\'ll tell you everything you legally need — personalised, prioritised compliance roadmap.',
    href: '/compliance-map',
    color: '#f97316',
  },
  {
    icon: '📊',
    number: '02',
    title: 'Financial Compliance Engine',
    description: 'GST filing, MCA/ROC compliance, TDS returns, ITC reconciliation — all automated with penalty prediction.',
    href: '/financial',
    color: '#fb923c',
  },
  {
    icon: '⚖️',
    number: '03',
    title: 'Labour Law Engine',
    description: 'PF, ESIC, Professional Tax, Shop Act, Gratuity — every HR compliance tracked and calculated automatically.',
    href: '/labour-law',
    color: '#f59e0b',
  },
  {
    icon: '🏛️',
    number: '04',
    title: 'License Manager',
    description: 'Industry-specific, state-aware license database. From FSSAI to RERA — know exactly what you need.',
    href: '/licenses',
    color: '#ef4444',
  },
  {
    icon: '🎯',
    number: '05',
    title: 'Govt Schemes Tracker',
    description: 'Discover government schemes worth lakhs that you\'re eligible for — Startup India, MSME benefits, state subsidies.',
    href: '/schemes',
    color: '#22c55e',
  },
  {
    icon: '💳',
    number: '06',
    title: 'Compliance Credit Score',
    description: 'A 0-850 score based on your regulatory health. Unlock pre-approved loans and better insurance rates.',
    href: '/credit-score',
    color: '#3b82f6',
  },
  {
    icon: '📝',
    number: '07',
    title: 'Legal Documents Engine',
    description: 'AI-powered document generation — NDAs, agreements, ESOP plans, privacy policies, all legally compliant.',
    href: '/documents',
    color: '#8b5cf6',
  },
  {
    icon: '🔔',
    number: '08',
    title: 'Alert & Action Center',
    description: 'Smart alerts via WhatsApp, email, SMS. Not just reminders — actionable intelligence with one-click actions.',
    href: '/alerts',
    color: '#ec4899',
  },
];

const stats = [
  { value: '50+', label: 'Compliance Categories' },
  { value: '28', label: 'States Covered' },
  { value: '200+', label: 'Document Templates' },
  { value: '₹14L+', label: 'Avg. Schemes Unlocked' },
];

const painPoints = [
  { pain: '"What licenses do I even need?"', solution: 'Compliance Map answers this clearly', icon: '🔍' },
  { pain: '"Am I filing everything correctly?"', solution: 'Financial Engine auto-tracks everything', icon: '📋' },
  { pain: '"Am I following labour laws?"', solution: 'Labour Law Engine monitors for SMBs', icon: '⚖️' },
  { pain: '"What government benefits am I missing?"', solution: 'Schemes Tracker surfaces hidden benefits', icon: '🎯' },
  { pain: '"Are my contracts & IP protected?"', solution: 'Document Engine generates legal docs in minutes', icon: '🛡️' },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    const pillarsSection = pillarsRef.current;
    if (!pillarsSection) return;

    const scrollContainer = pillarsSection.querySelector(`.${styles.pillarsTrack}`);
    if (!scrollContainer) return;

    gsap.to(scrollContainer, {
      x: () => -(scrollContainer.scrollWidth - window.innerWidth + 100),
      ease: 'none',
      scrollTrigger: {
        trigger: pillarsSection,
        pin: true,
        scrub: 1,
        end: () => '+=' + scrollContainer.scrollWidth,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: pillarsRef });

  // Auto-rotate active card
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % painPoints.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <motion.section
        ref={heroRef}
        className={styles.hero}
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className={styles.heroGrid}>
          {/* Left Content */}
          <div className={styles.heroContent}>
            <motion.div
              className={styles.heroBadge}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className={styles.badgeDot} />
              The Business Operating System for India
            </motion.div>

            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              FROM IDEA TO{' '}
              <span className="gradient-text">OPERATION</span>
              <br />
              IN ONE PLACE
            </motion.h1>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Every legal, regulatory, financial, and administrative thing your startup needs — unified in a single intelligent platform.
            </motion.p>

            <motion.div
              className={styles.heroCTA}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link href="/compliance-map" className="btn btn-primary">
                Generate Your Compliance Map
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" transform="rotate(180, 8, 8)"/>
                </svg>
              </Link>
              <Link href="/pricing" className="btn btn-outline">
                View Pricing
              </Link>
            </motion.div>

            <motion.div
              className={styles.heroStats}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {stats.map((stat, i) => (
                <div key={i} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - 3D Model */}
          <motion.div
            className={styles.heroModel}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroModel />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </motion.section>

      {/* ===== PAIN POINTS SECTION ===== */}
      <section className={`${styles.painSection} section`}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.sectionHeader}>
              <span className="badge badge-orange">THE PROBLEM</span>
              <h2>5 Pains. 5 Vendors. <span className="gradient-text">One Solution.</span></h2>
              <p>Indian founders face 5 distinct compliance nightmares. Nobody has stitched them together — until now.</p>
            </div>
          </AnimatedSection>

          <div className={styles.painGrid}>
            {painPoints.map((point, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  className={`${styles.painCard} ${activeCard === i ? styles.painCardActive : ''}`}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setActiveCard(i)}
                >
                  <div className={styles.painIcon}>{point.icon}</div>
                  <div className={styles.painContent}>
                    <p className={styles.painText}>{point.pain}</p>
                    <div className={styles.painArrow}>→</div>
                    <p className={styles.solutionText}>{point.solution}</p>
                  </div>
                  <div className={styles.painGlow} />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8 PILLARS HORIZONTAL SCROLL ===== */}
      <section className={styles.pillarsSection} ref={pillarsRef}>
        <div className={styles.pillarsStickyHeader}>
          <div className="container">
            <AnimatedSection>
              <span className="badge badge-orange">THE PLATFORM</span>
              <h2>8 Pillars. <span className="gradient-text">One Dashboard.</span></h2>
            </AnimatedSection>
          </div>
        </div>

        <div className={styles.pillarsTrack}>
          {pillars.map((pillar, i) => (
            <Link href={pillar.href} key={i} className={styles.pillarCard}>
              <div className={styles.pillarNumber} style={{ color: pillar.color }}>
                {pillar.number}
              </div>
              <div className={styles.pillarIcon}>{pillar.icon}</div>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarDesc}>{pillar.description}</p>
              <div className={styles.pillarArrow} style={{ color: pillar.color }}>
                Explore →
              </div>
              <div
                className={styles.pillarGlow}
                style={{ background: `radial-gradient(circle, ${pillar.color}15 0%, transparent 70%)` }}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className={`${styles.howSection} section`}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.sectionHeader}>
              <span className="badge badge-orange">HOW IT WORKS</span>
              <h2>3 Steps to <span className="gradient-text">Full Compliance</span></h2>
            </div>
          </AnimatedSection>

          <div className={styles.stepsGrid}>
            {[
              {
                step: '01',
                title: 'Tell Us About Your Business',
                desc: 'Answer 7 smart questions — business type, structure, state, employees, turnover, premises, and sales channels.',
                detail: 'Takes less than 2 minutes',
              },
              {
                step: '02',
                title: 'Get Your Compliance Map',
                desc: 'Receive a personalised, prioritised roadmap showing every license, registration, and filing you need.',
                detail: 'AI-powered recommendations',
              },
              {
                step: '03',
                title: 'Stay Compliant Forever',
                desc: 'Smart alerts, auto-filing, document generation — we handle everything so you focus on building.',
                detail: 'WhatsApp, Email, SMS alerts',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <motion.div
                  className={styles.stepCard}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.stepNumber}>{item.step}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className={styles.stepDetail}>{item.detail}</span>
                  <div className={styles.stepLine} />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPLIANCE SCORE PREVIEW ===== */}
      <section className={`${styles.scoreSection} section`}>
        <div className="container">
          <div className={styles.scoreGrid}>
            <AnimatedSection direction="left">
              <div className={styles.scoreVisual}>
                <div className={styles.scoreRing}>
                  <svg viewBox="0 0 200 200" className={styles.scoreCircle}>
                    <circle cx="100" cy="100" r="85" fill="none" stroke="var(--dark-700)" strokeWidth="8" />
                    <motion.circle
                      cx="100" cy="100" r="85"
                      fill="none"
                      stroke="url(#scoreGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="534"
                      initial={{ strokeDashoffset: 534 }}
                      whileInView={{ strokeDashoffset: 534 * 0.22 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      transform="rotate(-90 100 100)"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className={styles.scoreValue}>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 }}
                    >
                      782
                    </motion.span>
                    <small>/ 850</small>
                  </div>
                </div>
                <div className={styles.scoreLabels}>
                  <div className={styles.scoreLabel}>
                    <span className="status-dot success" /> GST Filing
                  </div>
                  <div className={styles.scoreLabel}>
                    <span className="status-dot success" /> MCA Compliance
                  </div>
                  <div className={styles.scoreLabel}>
                    <span className="status-dot warning" /> Labour Law
                  </div>
                  <div className={styles.scoreLabel}>
                    <span className="status-dot success" /> Active Licenses
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className={styles.scoreContent}>
                <span className="badge badge-orange">COMPLIANCE CREDIT SCORE</span>
                <h2>Your Business&apos;s <span className="gradient-text">Regulatory Health</span> — Quantified</h2>
                <p>
                  A score from 0 to 850 based on GST filings, MCA compliance, labour law adherence, and license renewals. 
                  Unlock pre-approved loans, better insurance rates, and government procurement trust.
                </p>
                <div className={styles.scoreFeatures}>
                  <div className={styles.scoreFeature}>
                    <span>🏦</span> Pre-approved loan offers from partner NBFCs
                  </div>
                  <div className={styles.scoreFeature}>
                    <span>📊</span> Real-time score updates with every filing
                  </div>
                  <div className={styles.scoreFeature}>
                    <span>🛡️</span> Insurance premium optimization
                  </div>
                </div>
                <Link href="/credit-score" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                  Check Your Score →
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={`${styles.ctaSection} section`}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.ctaBox}>
              <div className={styles.ctaGlow} />
              <h2>Ready to make compliance <span className="gradient-text">effortless</span>?</h2>
              <p>Join 1000+ Indian founders who&apos;ve already mapped their compliance journey with Raahi.</p>
              <div className={styles.ctaButtons}>
                <Link href="/compliance-map" className="btn btn-primary">
                  Start Free — Generate Your Map
                </Link>
                <Link href="/pricing" className="btn btn-outline">
                  See All Plans
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
