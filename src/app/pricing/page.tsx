'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    desc: 'Perfect for new founders exploring compliance',
    features: [
      'Compliance Map Generator',
      'Basic deadline tracker',
      '3 document templates',
      'Email alerts',
      'Community support',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Growth',
    price: '₹999',
    period: '/month',
    desc: 'For growing startups serious about compliance',
    features: [
      'Everything in Starter',
      'Full Financial Compliance (GST + MCA + TDS)',
      'Labour Law tracker',
      'WhatsApp + Email + SMS alerts',
      'Penalty predictor',
      'ITC reconciliation',
      '10 document templates',
      'Priority email support',
    ],
    cta: 'Start Growth Plan',
    popular: false,
  },
  {
    name: 'Pro',
    price: '₹2,999',
    period: '/month',
    desc: 'The complete business operating system',
    features: [
      'Everything in Growth',
      'All 8 pillars unlocked',
      'Industry license manager',
      'Government scheme finder',
      'Full contract engine (200+ templates)',
      'AI document generation',
      'Compliance Credit Score',
      'Priority WhatsApp support',
      'Dedicated account manager',
    ],
    cta: 'Start Pro Plan',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '₹9,999',
    period: '/month',
    desc: 'For multi-entity businesses and large teams',
    features: [
      'Everything in Pro',
      'Multi-entity management',
      'CA/CS/Lawyer marketplace access',
      'Compliance Credit Score + API',
      'Custom integrations',
      'White-label options',
      'Dedicated compliance officer',
      'SLA-backed support',
      'Custom training sessions',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <AnimatedSection>
            <span className="badge badge-orange">PRICING</span>
            <h1>Simple, Transparent <span className="gradient-text">Pricing</span></h1>
            <p className={styles.heroDesc}>
              Start free, upgrade when ready. Every plan includes the compliance map generator.
            </p>
          </AnimatedSection>

          {/* Toggle */}
          <motion.div
            className={styles.billingToggle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className={!annual ? styles.activeToggle : ''}>Monthly</span>
            <label className={styles.toggleSwitch}>
              <input type="checkbox" checked={annual} onChange={() => setAnnual(!annual)} />
              <span className={styles.toggleTrack}><span className={styles.toggleThumb} /></span>
            </label>
            <span className={annual ? styles.activeToggle : ''}>
              Annual <span className={styles.saveBadge}>Save 20%</span>
            </span>
          </motion.div>
        </div>
      </section>

      <div className="container">
        <div className={styles.pricingGrid}>
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.1}>
              <motion.div
                className={`${styles.planCard} ${plan.popular ? styles.popularPlan : ''}`}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {plan.popular && <div className={styles.popularTag}>Most Popular</div>}
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.planPrice}>
                  <span className={styles.priceValue}>
                    {plan.price === 'Free' ? 'Free' : annual ? `₹${Math.round(parseInt(plan.price.replace(/[₹,]/g, '')) * 0.8).toLocaleString()}` : plan.price}
                  </span>
                  {plan.period && <span className={styles.pricePeriod}>{plan.period}</span>}
                </div>
                <p className={styles.planDesc}>{plan.desc}</p>

                <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>
                  {plan.cta}
                </button>

                <ul className={styles.featureList}>
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.5 4.5L6.5 11.5L3 8" stroke={plan.popular ? '#f97316' : '#22c55e'} strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* FAQ */}
        <AnimatedSection>
          <div className={styles.faqSection}>
            <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
            <div className={styles.faqGrid}>
              {[
                { q: 'Can I switch plans anytime?', a: 'Yes! You can upgrade or downgrade at any time. Prorated billing will apply.' },
                { q: 'Is there a free trial for paid plans?', a: 'Yes, all paid plans come with a 14-day free trial. No credit card required.' },
                { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards, net banking, and wire transfers for enterprise plans.' },
                { q: 'Do you offer discounts for startups?', a: 'Yes! DPIIT-recognized startups get an additional 30% discount. Contact us with your recognition certificate.' },
              ].map((faq, i) => (
                <div key={i} className={styles.faqCard}>
                  <h4>{faq.q}</h4>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
