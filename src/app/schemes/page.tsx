'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

const categories = [
  { id: 'all', label: 'All Schemes' },
  { id: 'startup', label: 'Startup India' },
  { id: 'msme', label: 'MSME / Udyam' },
  { id: 'state', label: 'State Schemes' },
  { id: 'rd', label: 'R&D' },
  { id: 'export', label: 'Export' },
];

const schemes = [
  {
    name: 'DPIIT Recognition (Startup India)',
    category: 'startup',
    benefit: 'Tax exemption under 80IAC for 3 years',
    value: '₹5-50 Lakh+',
    eligibility: 'Startups incorporated < 10 years, turnover < ₹100 Cr',
    status: 'eligible',
    icon: '🚀',
  },
  {
    name: 'Fund of Funds (Startup India)',
    category: 'startup',
    benefit: 'Access to govt-backed VC funding pool',
    value: '₹10 Lakh - ₹10 Cr',
    eligibility: 'DPIIT recognized startups',
    status: 'eligible',
    icon: '💰',
  },
  {
    name: 'Self-Certification for Labour Laws',
    category: 'startup',
    benefit: 'Self-certify compliance for 6 labour laws',
    value: 'Compliance cost savings',
    eligibility: 'DPIIT recognized startups',
    status: 'eligible',
    icon: '✅',
  },
  {
    name: 'CGTMSE Collateral-Free Loans',
    category: 'msme',
    benefit: 'Loans without collateral up to ₹5 Cr',
    value: '₹5 Cr max',
    eligibility: 'MSMEs registered under Udyam',
    status: 'eligible',
    icon: '🏦',
  },
  {
    name: 'Priority Sector Lending',
    category: 'msme',
    benefit: 'Priority access to bank credit',
    value: 'Lower interest rates',
    eligibility: 'All registered MSMEs',
    status: 'eligible',
    icon: '📊',
  },
  {
    name: 'ISO Certification Reimbursement',
    category: 'msme',
    benefit: '75% reimbursement on ISO certification',
    value: 'Up to ₹75,000',
    eligibility: 'MSMEs with Udyam registration',
    status: 'eligible',
    icon: '🏅',
  },
  {
    name: 'Patent Subsidy for MSMEs',
    category: 'msme',
    benefit: '50% subsidy on patent registration',
    value: 'Up to ₹5 Lakh',
    eligibility: 'Registered MSMEs',
    status: 'apply',
    icon: '📋',
  },
  {
    name: 'Maharashtra Textile Policy',
    category: 'state',
    benefit: 'Capital subsidy for textile units',
    value: 'Up to ₹25 Lakh',
    eligibility: 'Textile manufacturers in Maharashtra',
    status: 'check',
    icon: '🧵',
  },
  {
    name: 'Startup Karnataka Grants',
    category: 'state',
    benefit: 'Grants and operational support',
    value: 'Up to ₹30 Lakh',
    eligibility: 'Startups registered in Karnataka',
    status: 'check',
    icon: '🌟',
  },
  {
    name: 'T-Hub Telangana Benefits',
    category: 'state',
    benefit: 'Mentorship, workspace, funding access',
    value: 'Varies',
    eligibility: 'Tech startups in Telangana',
    status: 'check',
    icon: '🏢',
  },
  {
    name: 'DSIR Recognition',
    category: 'rd',
    benefit: 'Tax benefits for R&D expenditure',
    value: '150% weighted deduction',
    eligibility: 'Companies with in-house R&D',
    status: 'apply',
    icon: '🔬',
  },
  {
    name: 'Atal Innovation Mission',
    category: 'rd',
    benefit: 'Innovation grants and accelerator support',
    value: 'Up to ₹10 Cr',
    eligibility: 'Deep-tech and innovation companies',
    status: 'eligible',
    icon: '💡',
  },
  {
    name: 'RoDTEP Scheme',
    category: 'export',
    benefit: 'Refund of taxes on export products',
    value: '0.5% - 4.3% of FOB',
    eligibility: 'Registered exporters',
    status: 'apply',
    icon: '🌍',
  },
  {
    name: 'ECGC Cover',
    category: 'export',
    benefit: 'Export credit guarantee insurance',
    value: 'Up to 90% cover',
    eligibility: 'All exporters',
    status: 'eligible',
    icon: '🛡️',
  },
];

export default function SchemesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? schemes
    : schemes.filter(s => s.category === activeCategory);

  const totalValue = '₹14 Lakh+';
  const eligibleCount = schemes.filter(s => s.status === 'eligible').length;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <AnimatedSection>
            <span className="badge badge-orange">PILLAR 5</span>
            <h1>Government Schemes & <span className="gradient-text">Benefits Tracker</span></h1>
            <p className={styles.heroDesc}>
              Discover government schemes worth lakhs that you&apos;re eligible for. Startup India, MSME benefits, state subsidies — all surfaced automatically.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container">
        {/* Eligibility Banner */}
        <AnimatedSection>
          <motion.div
            className={styles.eligibilityBanner}
            whileHover={{ scale: 1.01 }}
          >
            <div className={styles.bannerContent}>
              <div className={styles.bannerIcon}>🎯</div>
              <div>
                <h3>You are eligible for <span className="gradient-text">{eligibleCount} government schemes</span></h3>
                <p>Worth up to <strong>{totalValue}</strong> in benefits. Here&apos;s how to claim them.</p>
              </div>
            </div>
            <button className="btn btn-primary">Claim Now →</button>
          </motion.div>
        </AnimatedSection>

        {/* Category Tabs */}
        <div className={styles.tabs}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.tab} ${activeCategory === cat.id ? styles.activeTab : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Scheme Cards */}
        <div className={styles.schemeGrid}>
          {filtered.map((scheme, i) => (
            <motion.div
              key={scheme.name}
              className={styles.schemeCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.schemeIcon}>{scheme.icon}</div>
              <h4>{scheme.name}</h4>
              <p className={styles.schemeBenefit}>{scheme.benefit}</p>
              <div className={styles.schemeValue}>
                <span>💰</span> {scheme.value}
              </div>
              <p className={styles.schemeEligibility}>
                <strong>Eligibility:</strong> {scheme.eligibility}
              </p>
              <div className={styles.schemeAction}>
                <span className={`badge ${
                  scheme.status === 'eligible' ? 'badge-recommended' :
                  scheme.status === 'apply' ? 'badge-orange' : 'badge-high'
                }`}>
                  {scheme.status === 'eligible' ? '✅ Eligible' :
                   scheme.status === 'apply' ? '📝 Apply Now' : '🔍 Check Eligibility'}
                </span>
                <button className="btn btn-ghost" style={{ padding: '0.35rem 0.8rem', fontSize: '0.75rem' }}>
                  Learn More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
