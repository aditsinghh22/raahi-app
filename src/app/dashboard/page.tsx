'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

const stats = [
  { label: 'Compliance Score', value: '730', change: '+12', icon: '📊', color: '#22c55e', href: '/credit-score' },
  { label: 'Pending Actions', value: '5', change: '-2', icon: '⚡', color: '#f59e0b', href: '/alerts' },
  { label: 'Active Licenses', value: '8', change: '+1', icon: '📋', color: '#3b82f6', href: '/licenses' },
  { label: 'Eligible Schemes', value: '7', change: '+3', icon: '🎯', color: '#22c55e', href: '/schemes' },
];

const upcomingDeadlines = [
  { name: 'GSTR-1 Filing', date: 'Apr 11, 2026', daysLeft: 14, type: 'critical', pillar: 'Financial' },
  { name: 'GSTR-3B Filing', date: 'Apr 20, 2026', daysLeft: 23, type: 'warning', pillar: 'Financial' },
  { name: 'PF Deposit', date: 'Apr 15, 2026', daysLeft: 18, type: 'warning', pillar: 'Labour Law' },
  { name: 'MGT-14 Filing', date: 'Apr 14, 2026', daysLeft: 17, type: 'critical', pillar: 'MCA' },
  { name: 'FSSAI Renewal', date: 'Apr 18, 2026', daysLeft: 21, type: 'critical', pillar: 'Licenses' },
];

const quickActions = [
  { label: 'Generate Compliance Map', icon: '🗺️', href: '/compliance-map' },
  { label: 'File GST Return', icon: '📊', href: '/financial' },
  { label: 'Upload Salary Sheet', icon: '📎', href: '/labour-law' },
  { label: 'Find Govt Schemes', icon: '🎯', href: '/schemes' },
  { label: 'Generate Document', icon: '📝', href: '/documents' },
  { label: 'View All Alerts', icon: '🔔', href: '/alerts' },
];

const pillarsStatus = [
  { name: 'Compliance Map', status: 'active', completion: 100, href: '/compliance-map' },
  { name: 'Financial Engine', status: 'active', completion: 78, href: '/financial' },
  { name: 'Labour Law', status: 'active', completion: 65, href: '/labour-law' },
  { name: 'License Manager', status: 'active', completion: 72, href: '/licenses' },
  { name: 'Govt Schemes', status: 'active', completion: 45, href: '/schemes' },
  { name: 'Credit Score', status: 'active', completion: 86, href: '/credit-score' },
  { name: 'Documents', status: 'active', completion: 55, href: '/documents' },
  { name: 'Alerts', status: 'active', completion: 90, href: '/alerts' },
];

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.headerContent}>
              <div>
                <h1>Welcome back, <span className="gradient-text">Founder</span> 👋</h1>
                <p>Here&apos;s your business compliance overview for today.</p>
              </div>
              <div className={styles.headerActions}>
                <Link href="/compliance-map" className="btn btn-primary">Generate Map</Link>
                <Link href="/alerts" className="btn btn-outline">View Alerts (5)</Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="container">
        {/* Stats */}
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <Link href={stat.href}>
                <motion.div
                  className={styles.statCard}
                  whileHover={{ y: -4, boxShadow: `0 10px 30px ${stat.color}15` }}
                >
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>{stat.label}</span>
                    <div className={styles.statValueRow}>
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={`${styles.statChange} ${stat.change.startsWith('+') ? styles.positive : styles.negative}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <div className={styles.dashGrid}>
          {/* Left: Deadlines */}
          <div>
            <h3 className={styles.sectionTitle}>🕐 Upcoming Deadlines</h3>
            <div className={styles.deadlineList}>
              {upcomingDeadlines.map((dl, i) => (
                <motion.div
                  key={dl.name}
                  className={`${styles.deadlineCard} ${styles[dl.type]}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={styles.deadlineInfo}>
                    <strong>{dl.name}</strong>
                    <span>{dl.date}</span>
                  </div>
                  <div className={styles.deadlineMeta}>
                    <span className={styles.pillarTag}>{dl.pillar}</span>
                    <span className={`${styles.daysLeft} ${dl.daysLeft < 15 ? styles.urgent : ''}`}>
                      {dl.daysLeft} days
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div>
            <h3 className={styles.sectionTitle}>⚡ Quick Actions</h3>
            <div className={styles.actionsGrid}>
              {quickActions.map((action, i) => (
                <Link href={action.href} key={action.label}>
                  <motion.div
                    className={styles.actionCard}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className={styles.actionIcon}>{action.icon}</span>
                    <span>{action.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Pillar Status */}
        <AnimatedSection>
          <h3 className={styles.sectionTitle}>🏛️ Pillar Completion Status</h3>
          <div className={styles.pillarGrid}>
            {pillarsStatus.map((pillar, i) => (
              <Link href={pillar.href} key={pillar.name}>
                <motion.div
                  className={styles.pillarCard}
                  whileHover={{ y: -4 }}
                >
                  <div className={styles.pillarHeader}>
                    <span>{pillar.name}</span>
                    <span className={styles.pillarPercent}>{pillar.completion}%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pillar.completion}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      style={{
                        background: pillar.completion >= 80 ? '#22c55e' :
                                   pillar.completion >= 60 ? '#f59e0b' : '#ef4444'
                      }}
                    />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
