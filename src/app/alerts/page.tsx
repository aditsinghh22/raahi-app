'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

type AlertType = 'critical' | 'warning' | 'info' | 'success';

interface Alert {
  id: number;
  type: AlertType;
  title: string;
  message: string;
  time: string;
  channel: string;
  action: string;
  actionLabel: string;
  snoozed: boolean;
}

const alertsData: Alert[] = [
  {
    id: 1, type: 'critical',
    title: 'FSSAI License Expiring',
    message: 'Your FSSAI license expires in 21 days. Renewal process takes 30 days. You are already overdue to start the renewal.',
    time: '1 hour ago', channel: 'WhatsApp + Email', action: '/licenses', actionLabel: 'Start Renewal', snoozed: false,
  },
  {
    id: 2, type: 'critical',
    title: 'GSTR-1 Filing Deadline',
    message: 'GSTR-1 for March 2026 is due in 14 days. Penalty of ₹3,200 will apply if not filed.',
    time: '2 hours ago', channel: 'WhatsApp', action: '/financial', actionLabel: 'Start Filing', snoozed: false,
  },
  {
    id: 3, type: 'warning',
    title: 'ESIC Registration Required',
    message: 'Your company now has 10 employees. ESIC registration is now mandatory. Non-compliance penalty: ₹5,000/month.',
    time: '1 day ago', channel: 'Email + SMS', action: '/labour-law', actionLabel: 'Register Now', snoozed: false,
  },
  {
    id: 4, type: 'warning',
    title: 'Turnover Threshold Crossed',
    message: 'You crossed ₹40L turnover. You now need to file GSTR-1 monthly instead of quarterly.',
    time: '2 days ago', channel: 'Email', action: '/financial', actionLabel: 'Update Filing Frequency', snoozed: false,
  },
  {
    id: 5, type: 'info',
    title: 'New Government Scheme Available',
    message: 'You are eligible for the CGTMSE scheme — collateral-free loans up to ₹5 Cr for MSMEs.',
    time: '3 days ago', channel: 'In-App', action: '/schemes', actionLabel: 'Learn More', snoozed: false,
  },
  {
    id: 6, type: 'info',
    title: 'DIR-3 KYC Due for Director',
    message: 'Director Rajesh Kumar\'s DIR-3 KYC is due by September 30, 2026. Start early to avoid last-minute rush.',
    time: '5 days ago', channel: 'Email', action: '/financial', actionLabel: 'Start KYC', snoozed: false,
  },
  {
    id: 7, type: 'success',
    title: 'PF Deposit Confirmed',
    message: 'February 2026 PF deposit of ₹58,400 has been confirmed by EPFO. ECR generated successfully.',
    time: '1 week ago', channel: 'Email', action: '#', actionLabel: 'View Receipt', snoozed: false,
  },
  {
    id: 8, type: 'success',
    title: 'Compliance Score Updated',
    message: 'Your compliance score increased by +12 points to 730. Keep up the good work!',
    time: '1 week ago', channel: 'In-App', action: '/credit-score', actionLabel: 'View Score', snoozed: false,
  },
];

const channels = [
  { id: 'whatsapp', label: 'WhatsApp', icon: '💬', enabled: true, desc: 'Highest open rate in India' },
  { id: 'email', label: 'Email', icon: '📧', enabled: true, desc: 'Detailed notifications' },
  { id: 'sms', label: 'SMS', icon: '📱', enabled: false, desc: 'For critical alerts only' },
  { id: 'push', label: 'In-App Push', icon: '🔔', enabled: true, desc: 'Real-time notifications' },
];

export default function AlertsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [alerts, setAlerts] = useState(alertsData);

  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);

  const snooze = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, snoozed: true } : a));
  };

  const typeCount = (type: string) => alerts.filter(a => a.type === type).length;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <AnimatedSection>
            <span className="badge badge-orange">PILLAR 8</span>
            <h1>Unified Alert & <span className="gradient-text">Action Center</span></h1>
            <p className={styles.heroDesc}>
              Smart alerts via WhatsApp, Email, SMS. Not just reminders — actionable intelligence with one-click resolution.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container">
        {/* Stats */}
        <AnimatedSection>
          <div className={styles.alertStats}>
            <div className={`${styles.statCard} ${styles.criticalStat}`}>
              <span className={styles.statNum}>{typeCount('critical')}</span>
              <span className={styles.statName}>Critical</span>
            </div>
            <div className={`${styles.statCard} ${styles.warningStat}`}>
              <span className={styles.statNum}>{typeCount('warning')}</span>
              <span className={styles.statName}>Warnings</span>
            </div>
            <div className={`${styles.statCard} ${styles.infoStat}`}>
              <span className={styles.statNum}>{typeCount('info')}</span>
              <span className={styles.statName}>Information</span>
            </div>
            <div className={`${styles.statCard} ${styles.successStat}`}>
              <span className={styles.statNum}>{typeCount('success')}</span>
              <span className={styles.statName}>Completed</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Filter */}
        <div className={styles.filterRow}>
          <div className="tab-list">
            {['all', 'critical', 'warning', 'info', 'success'].map((f) => (
              <button key={f} className={`tab-item ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Alert List */}
        <div className={styles.alertList}>
          <AnimatePresence>
            {filtered.map((alert, i) => (
              <motion.div
                key={alert.id}
                className={`${styles.alertCard} ${styles[alert.type]} ${alert.snoozed ? styles.snoozed : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.05 }}
                layout
              >
                <div className={styles.alertLeft}>
                  <div className={`${styles.alertDot} ${styles[`dot${alert.type}`]}`} />
                  <div className={styles.alertBody}>
                    <h4>{alert.title}</h4>
                    <p>{alert.message}</p>
                    <div className={styles.alertMeta}>
                      <span>🕐 {alert.time}</span>
                      <span>📡 {alert.channel}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.alertActions}>
                  <a href={alert.action} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                    {alert.actionLabel}
                  </a>
                  {!alert.snoozed && alert.type !== 'success' && (
                    <button
                      className="btn btn-ghost"
                      onClick={() => snooze(alert.id)}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                    >
                      Snooze 24h
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Notification Channels */}
        <AnimatedSection>
          <h3 className={styles.sectionTitle}>📡 Notification Channels</h3>
          <div className={styles.channelGrid}>
            {channels.map((ch) => (
              <div key={ch.id} className={styles.channelCard}>
                <span className={styles.channelIcon}>{ch.icon}</span>
                <div>
                  <h4>{ch.label}</h4>
                  <p>{ch.desc}</p>
                </div>
                <div className={styles.channelToggle}>
                  <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked={ch.enabled} />
                    <span className={styles.toggleTrack}><span className={styles.toggleThumb} /></span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
