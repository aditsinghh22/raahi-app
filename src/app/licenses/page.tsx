'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

const industries = [
  { id: 'food', label: 'Food & Beverage', icon: '🍕', color: '#f97316' },
  { id: 'healthcare', label: 'Healthcare', icon: '🏥', color: '#ef4444' },
  { id: 'manufacturing', label: 'Manufacturing', icon: '🏭', color: '#3b82f6' },
  { id: 'edtech', label: 'EdTech', icon: '📚', color: '#8b5cf6' },
  { id: 'ecommerce', label: 'E-Commerce', icon: '🛒', color: '#22c55e' },
  { id: 'fintech', label: 'Fintech', icon: '💳', color: '#f59e0b' },
  { id: 'realestate', label: 'Real Estate', icon: '🏗️', color: '#ec4899' },
  { id: 'hospitality', label: 'Hospitality', icon: '🏨', color: '#06b6d4' },
];

const licenseData: Record<string, Array<{ name: string; authority: string; mandatory: boolean; desc: string; cost: string; time: string }>> = {
  food: [
    { name: 'FSSAI License', authority: 'FSSAI', mandatory: true, desc: 'Basic/State/Central based on turnover', cost: '₹2,000 - ₹7,500', time: '30-60 days' },
    { name: 'Eating House License', authority: 'Municipal Corporation', mandatory: true, desc: 'Required for restaurants and eateries', cost: '₹1,000 - ₹3,000', time: '30 days' },
    { name: 'Fire NOC', authority: 'Fire Department', mandatory: true, desc: 'Fire safety clearance for premises', cost: '₹2,000 - ₹10,000', time: '30 days' },
    { name: 'Health Trade License', authority: 'Municipal Corporation', mandatory: true, desc: 'Health and hygiene compliance', cost: '₹1,000 - ₹5,000', time: '15 days' },
    { name: 'Liquor License', authority: 'Excise Department', mandatory: false, desc: 'Required only if serving alcohol', cost: '₹25,000+', time: '90 days' },
    { name: 'Pollution NOC', authority: 'PCB', mandatory: false, desc: 'For food manufacturing units', cost: '₹5,000', time: '45 days' },
    { name: 'Weights & Measures', authority: 'Legal Metrology', mandatory: false, desc: 'For packaged food products', cost: '₹2,000', time: '15 days' },
  ],
  healthcare: [
    { name: 'Clinical Establishment Registration', authority: 'State Health Dept', mandatory: true, desc: 'Registration for clinics and hospitals', cost: '₹5,000 - ₹25,000', time: '60 days' },
    { name: 'Drug License', authority: 'CDSCO', mandatory: true, desc: 'Required if dispensing medicines', cost: '₹3,000 - ₹6,000', time: '45 days' },
    { name: 'CDSCO Approval', authority: 'CDSCO', mandatory: false, desc: 'For medical devices', cost: '₹50,000+', time: '180 days' },
    { name: 'Biomedical Waste Authorization', authority: 'PCB', mandatory: true, desc: 'Biomedical waste management', cost: '₹5,000', time: '30 days' },
    { name: 'PCPNDT Act Registration', authority: 'Health Dept', mandatory: false, desc: 'For scanning/imaging centers', cost: '₹10,000', time: '30 days' },
    { name: 'Pharmacy Act Compliance', authority: 'Pharmacy Council', mandatory: true, desc: 'For pharmacy operations', cost: '₹2,000', time: '30 days' },
  ],
  manufacturing: [
    { name: 'Factory License', authority: 'Factories Act', mandatory: true, desc: 'Under the Factories Act 1948', cost: '₹5,000 - ₹25,000', time: '60 days' },
    { name: 'Pollution Control Consent', authority: 'PCB', mandatory: true, desc: 'CTO/CTE from Pollution Control Board', cost: '₹10,000 - ₹50,000', time: '90 days' },
    { name: 'BIS Certification', authority: 'BIS', mandatory: false, desc: 'For specific products', cost: '₹10,000+', time: '90 days' },
    { name: 'ISI Mark', authority: 'BIS', mandatory: false, desc: 'For mandatory product categories', cost: '₹25,000+', time: '120 days' },
    { name: 'PESO License', authority: 'PESO', mandatory: false, desc: 'If dealing with flammable goods', cost: '₹5,000', time: '45 days' },
    { name: 'Legal Metrology', authority: 'Weights & Measures', mandatory: true, desc: 'For packaging and weights', cost: '₹2,000', time: '15 days' },
  ],
  edtech: [
    { name: 'DPDP Act Compliance', authority: 'Govt of India', mandatory: true, desc: 'Data Privacy compliance', cost: 'Variable', time: 'Ongoing' },
    { name: 'UGC Compliance', authority: 'UGC', mandatory: false, desc: 'If degree-linked programs', cost: 'Variable', time: '180 days' },
    { name: 'IT Act Compliance', authority: 'MeitY', mandatory: true, desc: 'Information Technology Act', cost: 'Internal', time: 'Ongoing' },
    { name: 'RBI Compliance', authority: 'RBI', mandatory: false, desc: 'If offering EMI/lending', cost: 'Variable', time: '90 days' },
  ],
  ecommerce: [
    { name: 'Consumer Protection Rules', authority: 'MCA', mandatory: true, desc: 'E-Commerce Rules 2020', cost: 'Internal', time: 'Ongoing' },
    { name: 'IT Act + Intermediary Guidelines', authority: 'MeitY', mandatory: true, desc: 'IT Act compliance', cost: 'Internal', time: 'Ongoing' },
    { name: 'DPDP Act Compliance', authority: 'Govt of India', mandatory: true, desc: 'User data protection', cost: 'Variable', time: 'Ongoing' },
    { name: 'Payment Aggregator License', authority: 'RBI', mandatory: false, desc: 'If handling payments', cost: '₹50,000+', time: '180 days' },
  ],
  fintech: [
    { name: 'RBI NBFC Registration', authority: 'RBI', mandatory: true, desc: 'Non-Banking Financial Company', cost: '₹2,00,000+', time: '12 months' },
    { name: 'Payment Aggregator License', authority: 'RBI', mandatory: true, desc: 'For payment processing', cost: '₹50,000+', time: '6-12 months' },
    { name: 'PPI License', authority: 'RBI', mandatory: false, desc: 'Prepaid Payment Instruments', cost: '₹25,000+', time: '6 months' },
    { name: 'SEBI Registration', authority: 'SEBI', mandatory: false, desc: 'If investment advisory', cost: '₹1,00,000+', time: '6 months' },
    { name: 'IRDAI License', authority: 'IRDAI', mandatory: false, desc: 'If insurance distribution', cost: '₹50,000+', time: '6 months' },
  ],
  realestate: [
    { name: 'RERA Registration', authority: 'RERA Authority', mandatory: true, desc: 'Mandatory for real estate projects', cost: '₹25,000 - ₹5,00,000', time: '30 days' },
    { name: 'Environmental Clearance', authority: 'MoEF&CC', mandatory: true, desc: 'For large projects', cost: 'Variable', time: '90-180 days' },
    { name: 'OC/CC Compliance', authority: 'Municipal Corp', mandatory: true, desc: 'Occupancy and Completion Certificate', cost: 'Variable', time: 'Variable' },
  ],
  hospitality: [
    { name: 'Police NOC', authority: 'Police Department', mandatory: true, desc: 'Security clearance', cost: '₹1,000 - ₹5,000', time: '30 days' },
    { name: 'Tourism Dept Registration', authority: 'Tourism Dept', mandatory: false, desc: 'Hotel star classification', cost: '₹5,000 - ₹25,000', time: '60 days' },
    { name: 'Fire NOC', authority: 'Fire Department', mandatory: true, desc: 'Fire safety clearance', cost: '₹2,000 - ₹10,000', time: '30 days' },
    { name: 'Liquor License', authority: 'Excise Department', mandatory: false, desc: 'For serving alcohol', cost: '₹25,000+', time: '90 days' },
    { name: 'Municipal Trade License', authority: 'Municipal Corp', mandatory: true, desc: 'Trade permit', cost: '₹1,000 - ₹10,000', time: '15 days' },
  ],
};

export default function LicensesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('food');
  const [showMandatoryOnly, setShowMandatoryOnly] = useState(false);

  const currentLicenses = licenseData[selectedIndustry] || [];
  const filtered = showMandatoryOnly ? currentLicenses.filter(l => l.mandatory) : currentLicenses;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <AnimatedSection>
            <span className="badge badge-orange">PILLAR 4</span>
            <h1>Industry-Specific <span className="gradient-text">License Manager</span></h1>
            <p className={styles.heroDesc}>
              A dynamic, state-aware, industry-aware license database. From FSSAI to RERA — know exactly what your business needs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container">
        {/* Industry Selector */}
        <AnimatedSection>
          <h3 className={styles.sectionTitle}>Select Your Industry</h3>
          <div className={styles.industryGrid}>
            {industries.map((ind) => (
              <motion.button
                key={ind.id}
                className={`${styles.industryCard} ${selectedIndustry === ind.id ? styles.selected : ''}`}
                onClick={() => setSelectedIndustry(ind.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  borderColor: selectedIndustry === ind.id ? ind.color : undefined,
                  boxShadow: selectedIndustry === ind.id ? `0 0 20px ${ind.color}20` : undefined,
                }}
              >
                <span className={styles.industryIcon}>{ind.icon}</span>
                <span className={styles.industryLabel}>{ind.label}</span>
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Filter */}
        <div className={styles.filterRow}>
          <div className={styles.resultCount}>
            <strong>{filtered.length}</strong> licenses found for <strong>{industries.find(i => i.id === selectedIndustry)?.label}</strong>
          </div>
          <label className={styles.filterToggle}>
            <input
              type="checkbox"
              checked={showMandatoryOnly}
              onChange={(e) => setShowMandatoryOnly(e.target.checked)}
            />
            <span className={styles.toggleTrack}>
              <span className={styles.toggleThumb} />
            </span>
            Show mandatory only
          </label>
        </div>

        {/* License Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndustry + showMandatoryOnly}
            className={styles.licenseGrid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((license, i) => (
              <motion.div
                key={license.name}
                className={styles.licenseCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <div className={styles.licenseHeader}>
                  <h4>{license.name}</h4>
                  <span className={`badge ${license.mandatory ? 'badge-critical' : 'badge-recommended'}`}>
                    {license.mandatory ? 'Mandatory' : 'Optional'}
                  </span>
                </div>
                <p className={styles.licenseDesc}>{license.desc}</p>
                <div className={styles.licenseMeta}>
                  <div className={styles.metaItem}><span>🏛️</span> {license.authority}</div>
                  <div className={styles.metaItem}><span>💰</span> {license.cost}</div>
                  <div className={styles.metaItem}><span>⏱️</span> {license.time}</div>
                </div>
                <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                  Start Application →
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
