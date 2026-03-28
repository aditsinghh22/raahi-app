'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

const businessTypes = [
  'Food & Beverage', 'Technology / SaaS', 'Manufacturing', 'Healthcare',
  'EdTech', 'E-Commerce', 'Fintech', 'Real Estate', 'Hospitality',
  'Retail', 'Consulting', 'Agriculture', 'Logistics', 'Media & Entertainment'
];

const legalStructures = ['Pvt Ltd', 'LLP', 'Proprietorship', 'OPC', 'Partnership', 'Section 8'];

const states = [
  'Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Telangana', 'Gujarat',
  'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Kerala', 'Madhya Pradesh',
  'Andhra Pradesh', 'Haryana', 'Punjab', 'Bihar', 'Odisha'
];

const turnoverRanges = [
  'Below ₹20L', '₹20L - ₹40L', '₹40L - ₹1Cr',
  '₹1Cr - ₹5Cr', '₹5Cr - ₹10Cr', '₹10Cr+'
];

interface Question {
  id: string;
  question: string;
  type: 'select' | 'number' | 'boolean';
  options?: string[];
}

const questions: Question[] = [
  { id: 'businessType', question: 'What type of business are you running?', type: 'select', options: businessTypes },
  { id: 'legalStructure', question: 'What is your legal structure?', type: 'select', options: legalStructures },
  { id: 'state', question: 'Which state/city is your business in?', type: 'select', options: states },
  { id: 'employees', question: 'How many employees do you have?', type: 'number' },
  { id: 'turnover', question: 'What is your annual turnover range?', type: 'select', options: turnoverRanges },
  { id: 'premises', question: 'Do you have physical premises?', type: 'boolean' },
  { id: 'salesChannel', question: 'How do you sell?', type: 'select', options: ['Online only', 'Offline only', 'Both online and offline'] },
];

interface ComplianceItem {
  requirement: string;
  priority: 'critical' | 'high' | 'recommended';
  authority: string;
  cost: string;
  time: string;
  status: 'pending' | 'done';
  category: string;
}

const sampleResults: ComplianceItem[] = [
  { requirement: 'GST Registration', priority: 'critical', authority: 'GSTN', cost: 'Free', time: '7 days', status: 'pending', category: 'Tax' },
  { requirement: 'FSSAI License', priority: 'critical', authority: 'FSSAI', cost: '₹2,000', time: '30 days', status: 'pending', category: 'Industry' },
  { requirement: 'Udyam (MSME) Registration', priority: 'high', authority: 'MSME Ministry', cost: 'Free', time: '1 day', status: 'pending', category: 'Registration' },
  { requirement: 'Shop & Establishment Act', priority: 'critical', authority: 'Municipal Corp', cost: '₹500 - ₹5,000', time: '15 days', status: 'pending', category: 'Premises' },
  { requirement: 'Professional Tax Registration', priority: 'high', authority: 'State Govt', cost: 'Free', time: '7 days', status: 'pending', category: 'Tax' },
  { requirement: 'PF Registration', priority: 'critical', authority: 'EPFO', cost: 'Free', time: '7 days', status: 'pending', category: 'Labour' },
  { requirement: 'ESIC Registration', priority: 'high', authority: 'ESIC', cost: 'Free', time: '7 days', status: 'pending', category: 'Labour' },
  { requirement: 'Trademark Registration', priority: 'recommended', authority: 'IP India', cost: '₹4,500', time: '18 months', status: 'pending', category: 'IP' },
  { requirement: 'Fire NOC', priority: 'high', authority: 'Fire Dept', cost: '₹2,000 - ₹10,000', time: '30 days', status: 'pending', category: 'Premises' },
  { requirement: 'Health Trade License', priority: 'critical', authority: 'Municipal Corp', cost: '₹1,000 - ₹5,000', time: '15 days', status: 'pending', category: 'Industry' },
  { requirement: 'Eating House License', priority: 'critical', authority: 'Police', cost: '₹1,000', time: '30 days', status: 'pending', category: 'Industry' },
  { requirement: 'Pollution NOC', priority: 'recommended', authority: 'PCB', cost: '₹5,000', time: '45 days', status: 'pending', category: 'Environment' },
];

export default function ComplianceMapPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const progress = ((currentStep) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const q = questions[currentStep];
    setAnswers(prev => ({ ...prev, [q.id]: value }));

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 500);
    }
  };

  const filteredResults = filter === 'all'
    ? sampleResults
    : sampleResults.filter(r => r.priority === filter);

  const priorityBadge = (priority: string) => {
    const map: Record<string, { label: string; class: string }> = {
      critical: { label: '🔴 Critical', class: 'badge-critical' },
      high: { label: '🟡 High', class: 'badge-high' },
      recommended: { label: '🟢 Recommended', class: 'badge-recommended' },
    };
    return map[priority] || map.recommended;
  };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <AnimatedSection>
            <span className="badge badge-orange">PILLAR 1</span>
            <h1>Compliance Map <span className="gradient-text">Generator</span></h1>
            <p className={styles.heroDesc}>
              Tell us about your business. We&apos;ll tell you everything you legally need — a personalised, prioritised compliance roadmap.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container">
        {!showResults ? (
          <div className={styles.questionnaire}>
            {/* Progress Bar */}
            <div className={styles.progressWrapper}>
              <div className={styles.progressInfo}>
                <span>Question {currentStep + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-bar-fill"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                className={styles.questionCard}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.questionNumber}>{String(currentStep + 1).padStart(2, '0')}</div>
                <h2 className={styles.questionText}>{questions[currentStep].question}</h2>

                {questions[currentStep].type === 'select' && (
                  <div className={styles.optionsGrid}>
                    {questions[currentStep].options?.map((option) => (
                      <motion.button
                        key={option}
                        className={`${styles.optionBtn} ${answers[questions[currentStep].id] === option ? styles.selected : ''}`}
                        onClick={() => handleAnswer(option)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                )}

                {questions[currentStep].type === 'number' && (
                  <div className={styles.numberInput}>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Enter number of employees"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAnswer((e.target as HTMLInputElement).value);
                        }
                      }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        const input = document.querySelector(`.${styles.numberInput} input`) as HTMLInputElement;
                        if (input.value) handleAnswer(input.value);
                      }}
                    >
                      Next →
                    </button>
                  </div>
                )}

                {questions[currentStep].type === 'boolean' && (
                  <div className={styles.booleanBtns}>
                    <motion.button
                      className={styles.boolBtn}
                      onClick={() => handleAnswer('yes')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>✅</span> Yes
                    </motion.button>
                    <motion.button
                      className={styles.boolBtn}
                      onClick={() => handleAnswer('no')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>❌</span> No
                    </motion.button>
                  </div>
                )}

                {currentStep > 0 && (
                  <button
                    className={styles.backBtn}
                    onClick={() => setCurrentStep(prev => prev - 1)}
                  >
                    ← Back
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            className={styles.results}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Summary Cards */}
            <div className={styles.summaryCards}>
              <div className={`${styles.summaryCard} ${styles.critical}`}>
                <div className={styles.summaryValue}>
                  {sampleResults.filter(r => r.priority === 'critical').length}
                </div>
                <div className={styles.summaryLabel}>Critical</div>
              </div>
              <div className={`${styles.summaryCard} ${styles.high}`}>
                <div className={styles.summaryValue}>
                  {sampleResults.filter(r => r.priority === 'high').length}
                </div>
                <div className={styles.summaryLabel}>High Priority</div>
              </div>
              <div className={`${styles.summaryCard} ${styles.recommended}`}>
                <div className={styles.summaryValue}>
                  {sampleResults.filter(r => r.priority === 'recommended').length}
                </div>
                <div className={styles.summaryLabel}>Recommended</div>
              </div>
              <div className={`${styles.summaryCard} ${styles.total}`}>
                <div className={styles.summaryValue}>{sampleResults.length}</div>
                <div className={styles.summaryLabel}>Total Items</div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className={styles.filterBar}>
              <div className="tab-list">
                {['all', 'critical', 'high', 'recommended'].map((f) => (
                  <button
                    key={f}
                    className={`tab-item ${filter === f ? 'active' : ''}`}
                    onClick={() => setFilter(f)}
                  >
                    {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <button
                className="btn btn-ghost"
                onClick={() => { setShowResults(false); setCurrentStep(0); setAnswers({}); }}
              >
                Regenerate Map
              </button>
            </div>

            {/* Results Table */}
            <div className={styles.tableWrapper}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Requirement</th>
                    <th>Priority</th>
                    <th>Authority</th>
                    <th>Cost</th>
                    <th>Time to Get</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((item, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <td>
                        <div className={styles.reqCell}>
                          <strong>{item.requirement}</strong>
                          <small>{item.category}</small>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${priorityBadge(item.priority).class}`}>
                          {priorityBadge(item.priority).label}
                        </span>
                      </td>
                      <td>{item.authority}</td>
                      <td>{item.cost}</td>
                      <td>{item.time}</td>
                      <td>
                        <span className={`status-dot ${item.status === 'done' ? 'success' : 'warning'}`} />
                        {item.status === 'done' ? ' Done' : ' Pending'}
                      </td>
                      <td>
                        <button className="btn btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                          Start →
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
