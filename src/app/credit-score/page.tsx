'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

const scoreBreakdown = [
  { category: 'GST Filing History', score: 180, max: 200, status: 'excellent', color: '#22c55e' },
  { category: 'MCA Compliance', score: 165, max: 200, status: 'good', color: '#22c55e' },
  { category: 'Labour Law Adherence', score: 142, max: 175, status: 'warning', color: '#f59e0b' },
  { category: 'License Renewals', score: 155, max: 175, status: 'good', color: '#22c55e' },
  { category: 'Document Compliance', score: 88, max: 100, status: 'good', color: '#22c55e' },
];

const totalScore = scoreBreakdown.reduce((sum, s) => sum + s.score, 0);
const maxScore = 850;

const benefits = [
  { icon: '🏦', title: 'Pre-approved Loans', desc: 'Partner NBFCs offer instant credit lines based on your score', available: true },
  { icon: '📊', title: 'Lower Interest Rates', desc: 'Higher score = lower borrowing costs from lenders', available: true },
  { icon: '🛡️', title: 'Insurance Optimization', desc: 'Better premiums with demonstrated compliance history', available: true },
  { icon: '🏛️', title: 'GeM Vendor Trust', desc: 'Higher procurement platform trust score', available: false },
  { icon: '📋', title: 'Investor Confidence', desc: 'Share compliance scores with potential investors', available: true },
  { icon: '⚡', title: 'Faster Approvals', desc: 'Pre-verified status speeds up government applications', available: false },
];

const history = [
  { month: 'Mar 2026', score: 730, change: '+12' },
  { month: 'Feb 2026', score: 718, change: '+8' },
  { month: 'Jan 2026', score: 710, change: '-5' },
  { month: 'Dec 2025', score: 715, change: '+15' },
  { month: 'Nov 2025', score: 700, change: '+20' },
  { month: 'Oct 2025', score: 680, change: '+10' },
];

function AnimatedCounter({ target }: { target: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2, ease: 'easeOut' });
    const unsubscribe = rounded.on('change', (v) => setDisplay(v));
    return () => { controls.stop(); unsubscribe(); };
  }, [target, count, rounded]);

  return <span>{display}</span>;
}

export default function CreditScorePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <AnimatedSection>
            <span className="badge badge-orange">PILLAR 6</span>
            <h1>Compliance <span className="gradient-text">Credit Score</span></h1>
            <p className={styles.heroDesc}>
              Your business&apos;s regulatory health — quantified. A 0-850 score that unlocks pre-approved loans, better insurance, and investor trust.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container">
        {/* Score Display */}
        <AnimatedSection>
          <div className={styles.scoreDisplay}>
            <div className={styles.scoreRing}>
              <svg viewBox="0 0 200 200" className={styles.ringSvg}>
                <circle cx="100" cy="100" r="85" fill="none" stroke="var(--dark-700)" strokeWidth="10" />
                <motion.circle
                  cx="100" cy="100" r="85"
                  fill="none"
                  stroke="url(#creditGradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="534"
                  initial={{ strokeDashoffset: 534 }}
                  animate={{ strokeDashoffset: 534 * (1 - totalScore / maxScore) }}
                  transition={{ duration: 2.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  transform="rotate(-90 100 100)"
                />
                <defs>
                  <linearGradient id="creditGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="50%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className={styles.scoreCenter}>
                <span className={styles.scoreNum}>
                  <AnimatedCounter target={totalScore} />
                </span>
                <span className={styles.scoreMax}>/ {maxScore}</span>
                <span className={styles.scoreLabel}>COMPLIANCE SCORE</span>
              </div>
            </div>

            <div className={styles.scoreStatus}>
              <div className={styles.statusCard}>
                <span className="status-dot success" />
                <span>Excellent Compliance Standing</span>
              </div>
              <p>Your compliance score is in the <strong>top 15%</strong> of businesses in your category.</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Score Breakdown */}
        <AnimatedSection>
          <h3 className={styles.sectionTitle}>📊 Score Breakdown</h3>
          <div className={styles.breakdownGrid}>
            {scoreBreakdown.map((item, i) => (
              <motion.div
                key={item.category}
                className={styles.breakdownCard}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className={styles.breakdownHeader}>
                  <span>{item.category}</span>
                  <span style={{ color: item.color }}>{item.score}/{item.max}</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.score / item.max) * 100}%` }}
                    transition={{ duration: 1.5, delay: 0.8 + i * 0.1 }}
                    style={{ background: item.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Score History */}
        <AnimatedSection>
          <h3 className={styles.sectionTitle}>📈 Score History</h3>
          <div className={styles.historyGrid}>
            {history.map((h, i) => (
              <div key={h.month} className={styles.historyCard}>
                <span className={styles.historyMonth}>{h.month}</span>
                <span className={styles.historyScore}>{h.score}</span>
                <span className={`${styles.historyChange} ${h.change.startsWith('+') ? styles.positive : styles.negative}`}>
                  {h.change}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Benefits */}
        <AnimatedSection>
          <h3 className={styles.sectionTitle}>🎁 Score Benefits</h3>
          <div className={styles.benefitsGrid}>
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                className={`${styles.benefitCard} ${!b.available ? styles.locked : ''}`}
                whileHover={{ y: -4 }}
              >
                <div className={styles.benefitIcon}>{b.icon}</div>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
                <span className={`badge ${b.available ? 'badge-recommended' : 'badge-high'}`}>
                  {b.available ? '✅ Unlocked' : '🔒 Score 800+'}
                </span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
