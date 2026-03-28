'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

const modules = [
  { id: 'gst', label: 'GST Module', icon: '📊' },
  { id: 'mca', label: 'MCA / ROC', icon: '🏢' },
  { id: 'direct', label: 'Direct Tax', icon: '💰' },
];

const gstData = {
  filings: [
    { name: 'GSTR-1', period: 'March 2026', deadline: 'Apr 11, 2026', status: 'pending', daysLeft: 14 },
    { name: 'GSTR-3B', period: 'March 2026', deadline: 'Apr 20, 2026', status: 'pending', daysLeft: 23 },
    { name: 'GSTR-1', period: 'February 2026', deadline: 'Mar 11, 2026', status: 'done', daysLeft: 0 },
    { name: 'GSTR-3B', period: 'February 2026', deadline: 'Mar 20, 2026', status: 'done', daysLeft: 0 },
    { name: 'GSTR-9', period: 'FY 2024-25', deadline: 'Dec 31, 2025', status: 'done', daysLeft: 0 },
  ],
  alerts: [
    { type: 'danger', message: 'GSTR-2A vs GSTR-2B mismatch: ₹14,230 ITC difference found', time: '2 hours ago' },
    { type: 'warning', message: 'Penalty predictor: ₹3,200 fine in 14 days if GSTR-1 not filed', time: '1 day ago' },
    { type: 'info', message: 'ITC of ₹45,000 available for reconciliation', time: '3 days ago' },
  ],
};

const mcaData = {
  filings: [
    { name: 'AOC-4', description: 'Annual Financial Statements', deadline: 'Oct 30, 2026', status: 'pending', daysLeft: 216 },
    { name: 'MGT-7', description: 'Annual Return', deadline: 'Nov 29, 2026', status: 'pending', daysLeft: 246 },
    { name: 'DIR-3 KYC', description: 'Director KYC', deadline: 'Sep 30, 2026', status: 'pending', daysLeft: 186 },
    { name: 'MGT-14', description: 'Board Resolution Filing', deadline: 'Apr 14, 2026', status: 'pending', daysLeft: 17 },
  ],
  directors: [
    { name: 'Rajesh Kumar', din: '09876543', kyc: 'Due Sep 30', status: 'pending' },
    { name: 'Priya Sharma', din: '09876544', kyc: 'Completed', status: 'done' },
  ],
};

const directTaxData = {
  filings: [
    { name: '26Q', description: 'TDS - Other than salary', quarter: 'Q4 FY26', deadline: 'May 31, 2026', status: 'pending' },
    { name: '24Q', description: 'TDS - Salary', quarter: 'Q4 FY26', deadline: 'May 31, 2026', status: 'pending' },
    { name: 'Advance Tax', description: '4th Instalment', deadline: 'Mar 15, 2026', status: 'done' },
  ],
  summary: {
    totalTds: '₹2,45,000',
    deposited: '₹1,89,000',
    pending: '₹56,000',
    employees: 12,
  },
};

export default function FinancialPage() {
  const [activeModule, setActiveModule] = useState('gst');

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <AnimatedSection>
            <span className="badge badge-orange">PILLAR 2</span>
            <h1>Financial Compliance <span className="gradient-text">Engine</span></h1>
            <p className={styles.heroDesc}>
              GST filing, MCA/ROC compliance, TDS returns — all automated with AI-powered penalty prediction and ITC reconciliation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container">
        {/* Module Tabs */}
        <div className={styles.moduleTabs}>
          {modules.map((mod) => (
            <motion.button
              key={mod.id}
              className={`${styles.moduleTab} ${activeModule === mod.id ? styles.activeTab : ''}`}
              onClick={() => setActiveModule(mod.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={styles.tabIcon}>{mod.icon}</span>
              <span>{mod.label}</span>
            </motion.button>
          ))}
        </div>

        {/* GST Module */}
        {activeModule === 'gst' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Alerts */}
            <div className={styles.alertsSection}>
              <h3 className={styles.sectionTitle}>⚠️ Active Alerts</h3>
              <div className={styles.alertsList}>
                {gstData.alerts.map((alert, i) => (
                  <motion.div
                    key={i}
                    className={`${styles.alertItem} ${styles[alert.type]}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className={styles.alertDot} />
                    <div className={styles.alertContent}>
                      <p>{alert.message}</p>
                      <small>{alert.time}</small>
                    </div>
                    <button className="btn btn-ghost" style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem' }}>
                      Action →
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Invoice Upload */}
            <div className={styles.uploadSection}>
              <div className={styles.uploadBox}>
                <div className={styles.uploadIcon}>📄</div>
                <h4>Upload Invoices</h4>
                <p>Drop invoices here — AI auto-reads → GSTR-1 prepared</p>
                <button className="btn btn-outline">Choose Files</button>
              </div>
            </div>

            {/* Filing Tracker */}
            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Filing Tracker</h3>
              <div className={styles.tableWrapper}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Filing</th>
                      <th>Period</th>
                      <th>Deadline</th>
                      <th>Days Left</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gstData.filings.map((filing, i) => (
                      <tr key={i}>
                        <td><strong>{filing.name}</strong></td>
                        <td>{filing.period}</td>
                        <td>{filing.deadline}</td>
                        <td>
                          {filing.daysLeft > 0 ? (
                            <span className={filing.daysLeft < 15 ? styles.urgentDays : ''}>
                              {filing.daysLeft} days
                            </span>
                          ) : '—'}
                        </td>
                        <td>
                          <span className={`status-dot ${filing.status === 'done' ? 'success' : 'warning'}`} />
                          {filing.status === 'done' ? ' Filed' : ' Pending'}
                        </td>
                        <td>
                          {filing.status !== 'done' && (
                            <button className="btn btn-primary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.75rem' }}>
                              Start Filing
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* MCA Module */}
        {activeModule === 'mca' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.mcaGrid}>
              <div className={styles.tableSection}>
                <h3 className={styles.sectionTitle}>📋 Annual Filing Tracker</h3>
                <div className={styles.tableWrapper}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Form</th>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Days Left</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mcaData.filings.map((filing, i) => (
                        <tr key={i}>
                          <td><strong>{filing.name}</strong></td>
                          <td>{filing.description}</td>
                          <td>{filing.deadline}</td>
                          <td>{filing.daysLeft} days</td>
                          <td>
                            <span className={`status-dot ${filing.status === 'done' ? 'success' : 'info'}`} />
                            {filing.status === 'done' ? ' Done' : ' Upcoming'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={styles.directorsSection}>
                <h3 className={styles.sectionTitle}>👤 Director KYC Status</h3>
                <div className={styles.directorCards}>
                  {mcaData.directors.map((dir, i) => (
                    <div key={i} className={styles.directorCard}>
                      <div className={styles.directorAvatar}>
                        {dir.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{dir.name}</strong>
                        <p>DIN: {dir.din}</p>
                        <p>KYC: {dir.kyc}</p>
                      </div>
                      <span className={`status-dot ${dir.status === 'done' ? 'success' : 'warning'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Direct Tax Module */}
        {activeModule === 'direct' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* TDS Summary */}
            <div className={styles.tdsSummary}>
              <div className={styles.tdsCard}>
                <span className={styles.tdsLabel}>Total TDS Liability</span>
                <span className={styles.tdsValue}>{directTaxData.summary.totalTds}</span>
              </div>
              <div className={styles.tdsCard}>
                <span className={styles.tdsLabel}>TDS Deposited</span>
                <span className={styles.tdsValue} style={{ color: '#22c55e' }}>{directTaxData.summary.deposited}</span>
              </div>
              <div className={styles.tdsCard}>
                <span className={styles.tdsLabel}>TDS Pending</span>
                <span className={styles.tdsValue} style={{ color: '#ef4444' }}>{directTaxData.summary.pending}</span>
              </div>
              <div className={styles.tdsCard}>
                <span className={styles.tdsLabel}>Employees</span>
                <span className={styles.tdsValue}>{directTaxData.summary.employees}</span>
              </div>
            </div>

            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>📑 TDS & Tax Filings</h3>
              <div className={styles.tableWrapper}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Form</th>
                      <th>Description</th>
                      <th>Quarter</th>
                      <th>Deadline</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {directTaxData.filings.map((filing, i) => (
                      <tr key={i}>
                        <td><strong>{filing.name}</strong></td>
                        <td>{filing.description}</td>
                        <td>{filing.quarter || '—'}</td>
                        <td>{filing.deadline}</td>
                        <td>
                          <span className={`status-dot ${filing.status === 'done' ? 'success' : 'warning'}`} />
                          {filing.status === 'done' ? ' Filed' : ' Pending'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
