'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

const categories = [
  { id: 'founder', label: 'Founder & Company', icon: '🏢' },
  { id: 'employment', label: 'Employment', icon: '👤' },
  { id: 'vendor', label: 'Vendor & Client', icon: '🤝' },
  { id: 'compliance', label: 'Compliance', icon: '📋' },
];

const templates: Record<string, Array<{ name: string; desc: string; popular: boolean; free: boolean }>> = {
  founder: [
    { name: 'Founders Agreement', desc: 'With vesting schedules, roles, equity split', popular: true, free: false },
    { name: 'Shareholders Agreement', desc: 'SHA with drag-along, tag-along, anti-dilution clauses', popular: true, free: false },
    { name: 'Term Sheet Template', desc: 'Standard term sheet for fundraising', popular: false, free: false },
    { name: 'Board Resolution Template', desc: 'Pre-built for 20+ common scenarios', popular: true, free: true },
    { name: 'MOA/AOA Amendment', desc: 'Templates for amending memorandum & articles', popular: false, free: false },
  ],
  employment: [
    { name: 'Offer Letter Generator', desc: 'With all legally required clauses for Indian employment', popular: true, free: true },
    { name: 'Employment Agreement', desc: 'Full employment contract with IP, non-compete, confidentiality', popular: true, free: false },
    { name: 'NDA (Non-Disclosure)', desc: 'Mutual and one-way NDA templates', popular: true, free: true },
    { name: 'ESOP Plan Documentation', desc: 'Employee stock option plan with all legal formats', popular: false, free: false },
    { name: 'Full & Final Settlement', desc: 'Templates for exit settlements', popular: false, free: true },
    { name: 'IP Assignment Agreement', desc: 'Critical for tech startups — assign employee IP', popular: true, free: false },
  ],
  vendor: [
    { name: 'Master Service Agreement', desc: 'MSA template for service engagements', popular: true, free: false },
    { name: 'Statement of Work', desc: 'SOW template with payment milestones', popular: true, free: true },
    { name: 'Payment Terms Agreement', desc: 'Clear payment terms and conditions', popular: false, free: true },
    { name: 'Freelancer Contract', desc: 'Short-form contract for freelancer engagements', popular: true, free: true },
  ],
  compliance: [
    { name: 'Privacy Policy Generator', desc: 'DPDP Act 2023 compliant privacy policy', popular: true, free: true },
    { name: 'Terms & Conditions', desc: 'For websites and mobile apps', popular: true, free: true },
    { name: 'Refund Policy Template', desc: 'E-commerce refund policy template', popular: false, free: true },
    { name: 'Cookie Policy', desc: 'GDPR & Indian law compliant cookie policy', popular: false, free: true },
  ],
};

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState('founder');
  const [searchQuery, setSearchQuery] = useState('');

  const currentTemplates = templates[activeCategory] || [];
  const filtered = searchQuery
    ? currentTemplates.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentTemplates;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <AnimatedSection>
            <span className="badge badge-orange">PILLAR 7</span>
            <h1>Legal Document & <span className="gradient-text">Contract Engine</span></h1>
            <p className={styles.heroDesc}>
              AI-powered document generation — NDAs, agreements, ESOP plans, privacy policies. User describes their situation → AI fills the template → Lawyer reviews.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container">
        {/* AI Generation CTA */}
        <AnimatedSection>
          <div className={styles.aiCta}>
            <div className={styles.aiCtaIcon}>🤖</div>
            <div className={styles.aiCtaContent}>
              <h3>Generate with AI</h3>
              <p>Describe your situation and AI will prepare the right document for you.</p>
              <div className={styles.aiInputRow}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., I need an NDA for a tech partnership with a US company..."
                />
                <button className="btn btn-primary">Generate →</button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Search */}
        <div className={styles.searchRow}>
          <input
            type="text"
            className="input-field"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: 400 }}
          />
        </div>

        {/* Category Tabs */}
        <div className={styles.categoryTabs}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.catTab} ${activeCategory === cat.id ? styles.activeCat : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Template Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className={styles.templateGrid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filtered.map((template, i) => (
              <motion.div
                key={template.name}
                className={styles.templateCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <div className={styles.templateHeader}>
                  <h4>{template.name}</h4>
                  <div className={styles.templateBadges}>
                    {template.popular && <span className={styles.popularBadge}>Popular</span>}
                    {template.free ? (
                      <span className={styles.freeBadge}>Free</span>
                    ) : (
                      <span className={styles.proBadge}>Pro</span>
                    )}
                  </div>
                </div>
                <p>{template.desc}</p>
                <div className={styles.templateActions}>
                  <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
                    Generate Document
                  </button>
                  <button className="btn btn-ghost" style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
                    Preview
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
