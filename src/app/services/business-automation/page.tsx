"use client";

import React, { useState } from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../../components/PageHeroTitle';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Placeholder Icons
const ManualStepIcon = ({ className = "w-8 h-8 text-slate-500" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.875 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-.813 2.846L15.904 15L15 12.188l-.813 2.846a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188l-1.25-2.188L13.563 12l2.188-1.25L17 8.563l1.25 2.188L20.438 12z" /></svg>
);
const AutomatedStepIcon = ({ className = "w-8 h-8 text-emerald-500" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.58 5.84A6 6 0 0114.37 15.59m0 0c0-1.101.44-2.104 1.173-2.832m-.001 2.832c1.101 0 2.105-.44 2.833-1.172m2.832 0c.732-.732 1.172-1.73 1.172-2.832M3.75 16.5c0-1.101.44-2.104 1.173-2.832M3.75 16.5c1.101 0 2.105-.44 2.833-1.172m2.832 0c.732-.732 1.172-1.73 1.172-2.832" /></svg>
);

// First, let me fix the interface and type issues
interface WorkflowStageData {
  title: string;
  steps: Array<{ name: string; type: string }>;
  description: string;
  totalSteps: number;
  efficiencyGain?: number;
}

interface WorkflowData {
  label: string;
  before: WorkflowStageData;
  after: WorkflowStageData;
}

const workflowData: Record<string, WorkflowData> = {
  support: {
    label: "Customer Support Tickets",
    before: {
      title: "Manual Ticket Handling",
      steps: [
        { name: "Log Ticket", type: "manual" },
        { name: "Categorize", type: "manual" },
        { name: "Assign Agent", type: "manual" },
        { name: "Draft Response", type: "manual" },
        { name: "Send & Close", type: "manual" },
      ],
      description: "Each step requires manual intervention, leading to slower response times and potential inconsistencies.",
      totalSteps: 5
    },
    after: {
      title: "AI-Assisted Ticket Handling",
      steps: [
        { name: "AI: Log & Categorize", type: "auto" },
        { name: "AI: Assign Agent", type: "auto" },
        { name: "Agent: Review & Send", type: "manual" }, 
      ],
      description: "AI automates initial logging, categorization, and agent assignment. Agents focus on complex resolutions, improving speed and quality.",
      efficiencyGain: 60,
      totalSteps: 3
    }
  },
  sales: {
    label: "Sales Lead Nurturing",
    before: {
      title: "Traditional Lead Follow-up",
      steps: [
        { name: "Manual CRM Entry", type: "manual" },
        { name: "Segment Leads", type: "manual" },
        { name: "Draft Emails", type: "manual" },
        { name: "Send Sequentially", type: "manual" },
        { name: "Schedule Demos", type: "manual" },
      ],
      description: "Sales reps spend significant time on repetitive data entry, email drafting, and manual scheduling.",
      totalSteps: 5
    },
    after: {
      title: "Automated Lead Nurturing & Scheduling",
      steps: [
        { name: "AI: CRM Sync & Segment", type: "auto" },
        { name: "AI: Personalized Email Cadence", type: "auto" },
        { name: "AI: Demo Scheduling Bot", type: "auto" },
        { name: "Sales: Conduct Demo", type: "manual" },
      ],
      description: "AI handles CRM updates, personalized email sequences, and demo scheduling, freeing sales to focus on high-value interactions.",
      efficiencyGain: 75,
      totalSteps: 4
    }
  },
  data_entry: {
    label: "Invoice Data Entry",
    before: {
      title: "Manual Invoice Processing",
      steps: [
        { name: "Receive Invoice", type: "manual" },
        { name: "Extract Data", type: "manual" },
        { name: "Validate Data", type: "manual" },
        { name: "Enter in ERP", type: "manual" },
      ],
      description: "Time-consuming and error-prone manual extraction and entry of invoice details into financial systems.",
      totalSteps: 4
    },
    after: {
      title: "AI-Powered Invoice Extraction",
      steps: [
        { name: "AI: Scan & Extract Data", type: "auto" },
        { name: "AI: Validate & Flag Exceptions", type: "auto" },
        { name: "Human: Review Exceptions", type: "manual" },
      ],
      description: "AI automatically scans invoices, extracts data, validates it, and flags only exceptions for human review, drastically reducing manual work.",
      efficiencyGain: 80,
      totalSteps: 3
    }
  }
};
type WorkflowKey = keyof typeof workflowData;

const WorkflowTransformationDemo = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowKey>('support');
  const [isAutomated, setIsAutomated] = useState(false);

  const currentStageData = isAutomated ? workflowData[activeWorkflow].after : workflowData[activeWorkflow].before;

  const stepVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i:number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { delay: i * 0.15, type: 'spring', stiffness:100 }
    })
  };

  return (
    <motion.div 
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Workflow Transformation Demo</h3>
      <p className="text-xs sm:text-sm text-emerald-300 mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider">Learn how automation streamlines processes & boosts efficiency.</p>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 items-start">
        <div className="w-full lg:w-1/3 space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-1 sm:mb-1.5 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">1. Choose a Workflow:</p>
          {(Object.keys(workflowData) as WorkflowKey[]).map((key) => (
            <button key={key} onClick={() => { setActiveWorkflow(key); setIsAutomated(false); }}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg transition-all duration-200 text-xs sm:text-sm shadow-md hover:shadow-lg font-[family-name:var(--font-geist-mono)] tracking-wider
                          ${activeWorkflow === key ? 'bg-emerald-600 text-white ring-2 ring-emerald-400' : 'bg-slate-700 hover:bg-slate-600/80 text-slate-200'}`}>
              {workflowData[key].label}
            </button>
          ))}
        </div>
        
        <div className="w-full lg:w-2/3 bg-slate-900/50 p-3 sm:p-5 md:p-6 rounded-xl border border-slate-700 min-h-[250px] sm:min-h-[300px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${activeWorkflow}-${isAutomated}`} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.4 }}
              className="flex flex-col flex-grow"
            >
              <h4 className={`text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider ${isAutomated ? 'text-emerald-400' : 'text-orange-400'}`}>{currentStageData.title}</h4>
              
              <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 flex-grow">
                {currentStageData.steps.map((step, i) => (
                  <motion.div 
                    key={step.name + i} 
                    className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-md text-xs sm:text-sm font-[family-name:var(--font-geist-mono)] tracking-wider ${step.type === 'auto' ? 'bg-emerald-700/30' : 'bg-slate-700/40'}`}
                    custom={i} variants={stepVariants} initial="hidden" animate="visible"
                  >
                    {step.type === 'auto' ? <AutomatedStepIcon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0" /> : <ManualStepIcon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 flex-shrink-0" />}
                    <span className={step.type === 'auto' ? 'text-emerald-300' : 'text-slate-300'}>{step.name}</span>
                  </motion.div>
                ))}
              </div>
              
              <p className="text-xs text-slate-400 mb-2 sm:mb-3 min-h-[2.5em] sm:min-h-[3.5em] leading-relaxed font-[family-name:var(--font-geist-mono)]">{currentStageData.description}</p>
              
              {isAutomated && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-center p-2 bg-green-600/20 border border-green-500/50 rounded-md">
                  <p className="text-green-300 font-semibold text-xs sm:text-sm font-[family-name:var(--font-geist-mono)] tracking-wider">
                    Efficiency Gain: <span className="text-sm sm:text-lg">~{workflowData[activeWorkflow].after.efficiencyGain}%</span>
                  </p>
                  <p className="text-xs text-green-400 font-[family-name:var(--font-geist-mono)]">Fewer manual steps, faster processing!</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6">
        <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-1 sm:mb-1.5 text-center lg:text-left font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">2. See the Impact:</p>
        <button onClick={() => setIsAutomated(!isAutomated)} 
          className={`w-full font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-[family-name:var(--font-geist-mono)] tracking-wider uppercase
                      ${isAutomated ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}>
          {isAutomated ? 'View Manual Process Again' : 'Click to Automate This Workflow!'}
        </button>
      </div>
    </motion.div>
  );
};

// Interactive Automation Calculator
const AutomationCalculator = () => {
  const [employees, setEmployees] = useState(5);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [automationPercent, setAutomationPercent] = useState(70);

  const weeklyTimeSaved = (hoursPerWeek * employees * automationPercent) / 100;
  const weeklyCostSaved = weeklyTimeSaved * hourlyRate;
  const yearlyCostSaved = weeklyCostSaved * 52;
  const yearlyTimeSaved = weeklyTimeSaved * 52;

  return (
    <motion.div 
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-emerald-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
        Automation Savings Calculator
      </h3>
      <p className="text-xs sm:text-sm text-emerald-300 mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider">
        See how much time and money automation could save your business
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Input Section */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-semibold text-emerald-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Number of Employees: {employees}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-emerald-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Manual Work Hours/Week: {hoursPerWeek}
            </label>
            <input
              type="range"
              min="1"
              max="40"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-emerald-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Average Hourly Rate: ${hourlyRate}
            </label>
            <input
              type="range"
              min="15"
              max="100"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-emerald-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Automation Efficiency: {automationPercent}%
            </label>
            <input
              type="range"
              min="30"
              max="90"
              value={automationPercent}
              onChange={(e) => setAutomationPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-slate-900/50 p-4 sm:p-6 rounded-xl border border-emerald-700/30">
          <h4 className="text-lg sm:text-xl font-bold text-emerald-400 mb-4 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Your Potential Savings
          </h4>
          
          <div className="space-y-4">
            <motion.div 
              className="text-center p-3 bg-emerald-600/20 border border-emerald-500/50 rounded-md"
              key={weeklyTimeSaved}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-emerald-300 font-semibold text-sm font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                Weekly Time Saved
              </p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                {weeklyTimeSaved.toFixed(1)} hours
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-3 bg-green-600/20 border border-green-500/50 rounded-md"
              key={weeklyCostSaved}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <p className="text-green-300 font-semibold text-sm font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                Weekly Cost Saved
              </p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                ${weeklyCostSaved.toLocaleString()}
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-3 bg-yellow-600/20 border border-yellow-500/50 rounded-md"
              key={yearlyCostSaved}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <p className="text-yellow-300 font-semibold text-sm font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                Yearly Savings
              </p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                ${yearlyCostSaved.toLocaleString()}
              </p>
              <p className="text-yellow-200 text-xs font-[family-name:var(--font-geist-mono)]">
                {yearlyTimeSaved.toFixed(0)} hours saved annually
              </p>
            </motion.div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400 font-[family-name:var(--font-geist-mono)]">
              *Estimates based on typical automation scenarios
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AutomationBenefits = () => (
  <div className="bg-gradient-to-b from-slate-800/60 to-slate-900/70 rounded-2xl p-4 sm:p-8 md:p-12 my-8 sm:my-16 md:my-20 shadow-xl border border-emerald-700/30">
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Real Results from Smart Automation</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {[ 
         { 
           title: "Focus on What Matters", 
           text: "Stop wasting time on repetitive tasks. Tackle strategic work that drives growth.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
             </svg>
           )
         },
         { 
           title: "Easy Growth", 
           text: "Handle 10x more work without hiring 10x more people.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
             </svg>
           )
         },
         { 
           title: "Customer Delight", 
           text: "Faster responses and fewer errors keep customers coming back.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
             </svg>
           )
         }
      ].map((benefit, index) => (
        <motion.div 
          key={benefit.title} 
          className="bg-slate-700/40 p-4 sm:p-6 rounded-lg border border-slate-600/50 hover:border-emerald-500/60 transition-colors duration-300 text-center" 
          initial={{opacity:0, y:15}} 
          whileInView={{opacity:1, y:0}} 
          transition={{duration:0.5, delay:0.1 + index * 0.1}} 
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-3 sm:mb-4">
            {benefit.icon}
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-emerald-400 mb-1.5 sm:mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">{benefit.title}</h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">{benefit.text}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default function BusinessAutomationPage() {
  return (
    <ThemedInnerPageLayout themeColor="green">
      <PageHeroTitle titleLine1="Business" titleLine2="Automation" />
      
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 pt-12 sm:pt-20 md:pt-28 pb-8 sm:pb-16">
        <motion.div className="text-center mb-20 sm:mb-28 md:mb-36" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Work Smarter,<br className="sm:hidden" /> Not Harder.
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-[family-name:var(--font-geist-mono)]">
            Unlock your team&apos;s full potential by automating repetitive tasks and streamlining complex workflows. We design intelligent automation solutions that boost productivity, reduce errors, and free you to focus on strategic growth.
          </p>
        </motion.div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <WorkflowTransformationDemo />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-12 sm:mb-16 md:mb-20">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            The Hidden Cost of Manual Work
          </h3>
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">
              Every day, your team wastes hours on repetitive tasks that could be automated. While you&apos;re manually processing orders, scheduling appointments, and managing data entry, your competitors are scaling effortlessly with smart automation.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-green-300 leading-relaxed font-[family-name:var(--font-geist-mono)] font-semibold">
              Stop working IN your business. Start working ON it. Our automation systems don&apos;t just save time—they transform how you operate.
            </p>
          </div>
        </motion.div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <AutomationCalculator />
        </div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <AutomationBenefits />
        </div>

        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Ready to Streamline Your Business?</h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact?subject=Business%20Automation%20Inquiry" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-300 shadow-md hover:shadow-lg font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Start Your Automation Journey
            </Link>
            <Link href="/services" className="border border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-300 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Discover All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </ThemedInnerPageLayout>
  );
} 