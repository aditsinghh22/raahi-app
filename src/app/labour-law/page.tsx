'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

const labourModules = [
  { id: 'pf', label: 'Provident Fund', icon: '🏦' },
  { id: 'esic', label: 'ESIC', icon: '🏥' },
  { id: 'pt', label: 'Professional Tax', icon: '💼' },
  { id: 'shop', label: 'Shop & Establishment', icon: '🏪' },
  { id: 'gratuity', label: 'Gratuity & Bonus', icon: '🎁' },
];

const pfData = {
  summary: { totalContribution: '₹1,24,000', employerShare: '₹62,000', employeeShare: '₹62,000', employees: 15 },
  filings: [
    { month: 'March 2026', due: 'Apr 15, 2026', amount: '₹62,000', status: 'pending' },
    { month: 'February 2026', due: 'Mar 15, 2026', amount: '₹58,400', status: 'done' },
    { month: 'January 2026', due: 'Feb 15, 2026', amount: '₹56,200', status: 'done' },
  ],
  alerts: [
    { message: 'Monthly ECR for March 2026 due in 18 days', type: 'warning' },
    { message: '2 employees missing UAN details — update required', type: 'danger' },
  ],
};

const esicData = {
  applicable: true,
  threshold: '10+ employees',
  currentCount: 15,
  monthlyContribution: '₹8,450',
  filings: [
    { period: 'Oct 2025 - Mar 2026', due: 'May 15, 2026', status: 'pending' },
    { period: 'Apr 2025 - Sep 2025', due: 'Nov 15, 2025', status: 'done' },
  ],
};

const ptData = {
  state: 'Maharashtra',
  slabs: [
    { salary: 'Up to ₹7,500', deduction: 'Nil' },
    { salary: '₹7,501 - ₹10,000', deduction: '₹175/month' },
    { salary: '₹10,001+', deduction: '₹200/month (₹300 in Feb)' },
  ],
  nextFiling: 'Annual return due June 30, 2026',
};

const employees = [
  { name: 'Amit Patel', salary: '₹45,000', pf: '₹5,400', esic: '₹338', pt: '₹200', gratuity: 'Eligible (6 yrs)' },
  { name: 'Sneha Gupta', salary: '₹38,000', pf: '₹4,560', esic: '₹285', pt: '₹200', gratuity: 'Not yet (2 yrs)' },
  { name: 'Rahul Singh', salary: '₹52,000', pf: '₹6,240', esic: 'N/A', pt: '₹200', gratuity: 'Not yet (1 yr)' },
  { name: 'Priya Nair', salary: '₹28,000', pf: '₹3,360', esic: '₹210', pt: '₹175', gratuity: 'Not yet (3 yrs)' },
];

export default function LabourLawPage() {
  const [activeModule, setActiveModule] = useState('pf');

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <AnimatedSection>
            <span className="badge badge-orange">PILLAR 3</span>
            <h1>Labour Law & HR <span className="gradient-text">Compliance Engine</span></h1>
            <p className={styles.heroDesc}>
              PF, ESIC, Professional Tax, Shop Act, Gratuity & Bonus — every HR compliance tracked, calculated, and filed automatically.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container">
        {/* Upload CTA */}
        <AnimatedSection>
          <div className={styles.uploadCta}>
            <div className={styles.uploadIcon}>📎</div>
            <div>
              <h3>Upload Your Salary Sheet</h3>
              <p>AI auto-calculates every deduction, contribution, and filing — instantly.</p>
            </div>
            <button className="btn btn-primary">Upload Salary Sheet</button>
          </div>
        </AnimatedSection>

        {/* Module Tabs */}
        <div className={styles.moduleTabs}>
          {labourModules.map((mod) => (
            <button
              key={mod.id}
              className={`${styles.moduleTab} ${activeModule === mod.id ? styles.activeTab : ''}`}
              onClick={() => setActiveModule(mod.id)}
            >
              <span>{mod.icon}</span> {mod.label}
            </button>
          ))}
        </div>

        {/* PF Module */}
        {activeModule === 'pf' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className={styles.summaryRow}>
              {Object.entries(pfData.summary).map(([key, val]) => (
                <div key={key} className={styles.summaryCard}>
                  <span className={styles.summaryLabel}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</span>
                  <span className={styles.summaryValue}>{val}</span>
                </div>
              ))}
            </div>

            {pfData.alerts.length > 0 && (
              <div className={styles.alertsBox}>
                {pfData.alerts.map((alert, i) => (
                  <div key={i} className={`${styles.alertItem} ${styles[alert.type]}`}>
                    <span className={styles.alertDot} />
                    <p>{alert.message}</p>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.tableWrapper}>
              <table className="data-table">
                <thead>
                  <tr><th>Month</th><th>Due Date</th><th>Amount</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {pfData.filings.map((f, i) => (
                    <tr key={i}>
                      <td><strong>{f.month}</strong></td>
                      <td>{f.due}</td>
                      <td>{f.amount}</td>
                      <td><span className={`status-dot ${f.status === 'done' ? 'success' : 'warning'}`} /> {f.status === 'done' ? ' Deposited' : ' Pending'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ESIC Module */}
        {activeModule === 'esic' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className={styles.esicStatus}>
              <div className={styles.statusBadge}>
                <span className="status-dot success" /> ESIC Applicable — You have {esicData.currentCount} employees (threshold: {esicData.threshold})
              </div>
              <p>Monthly Contribution: <strong>{esicData.monthlyContribution}</strong></p>
            </div>
            <div className={styles.tableWrapper}>
              <table className="data-table">
                <thead>
                  <tr><th>Period</th><th>Due Date</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {esicData.filings.map((f, i) => (
                    <tr key={i}>
                      <td><strong>{f.period}</strong></td>
                      <td>{f.due}</td>
                      <td><span className={`status-dot ${f.status === 'done' ? 'success' : 'warning'}`} /> {f.status === 'done' ? ' Filed' : ' Upcoming'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Professional Tax Module */}
        {activeModule === 'pt' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className={styles.ptInfo}>
              <h3>Professional Tax Slabs — {ptData.state}</h3>
              <p className={styles.ptNote}>⚡ PT slabs vary MASSIVELY by state. These are for {ptData.state}.</p>
            </div>
            <div className={styles.tableWrapper}>
              <table className="data-table">
                <thead><tr><th>Monthly Salary</th><th>PT Deduction</th></tr></thead>
                <tbody>
                  {ptData.slabs.map((s, i) => (
                    <tr key={i}><td>{s.salary}</td><td>{s.deduction}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.nextFiling}>
              <span className="badge badge-high">📅 {ptData.nextFiling}</span>
            </div>
          </motion.div>
        )}

        {/* Shop & Establishment */}
        {activeModule === 'shop' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className={styles.shopInfo}>
              <div className={styles.shopCard}>
                <h3>🏪 Shop & Establishment Act</h3>
                <p>State-specific registration — every state has different rules.</p>
                <div className={styles.shopDetails}>
                  <div className={styles.shopDetail}><span>State:</span> <strong>Maharashtra</strong></div>
                  <div className={styles.shopDetail}><span>Registration:</span> <strong>Active</strong> <span className="status-dot success" /></div>
                  <div className={styles.shopDetail}><span>Renewal Due:</span> <strong>Dec 31, 2026</strong></div>
                  <div className={styles.shopDetail}><span>Working Hours Compliance:</span> <strong>Compliant</strong> <span className="status-dot success" /></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gratuity & Bonus */}
        {activeModule === 'gratuity' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className={styles.gratuityInfo}>
              <div className={styles.gratuityCards}>
                <div className={styles.gCard}>
                  <h4>Statutory Bonus</h4>
                  <p>8.33% to 20% of salary</p>
                  <span className="badge badge-orange">Payment of Wages Act Compliant</span>
                </div>
                <div className={styles.gCard}>
                  <h4>Gratuity Eligibility</h4>
                  <p>5 years of continuous service</p>
                  <span className="badge badge-high">1 employee eligible</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Employee Table */}
        <AnimatedSection>
          <div className={styles.employeeSection}>
            <h3 className={styles.sectionTitle}>👥 Employee-wise Breakdown</h3>
            <div className={styles.tableWrapper}>
              <table className="data-table">
                <thead>
                  <tr><th>Employee</th><th>Salary</th><th>PF</th><th>ESIC</th><th>PT</th><th>Gratuity</th></tr>
                </thead>
                <tbody>
                  {employees.map((emp, i) => (
                    <tr key={i}>
                      <td><strong>{emp.name}</strong></td>
                      <td>{emp.salary}</td>
                      <td>{emp.pf}</td>
                      <td>{emp.esic}</td>
                      <td>{emp.pt}</td>
                      <td>{emp.gratuity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
