"use client";

import React, { useState } from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../../components/PageHeroTitle';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Icons
const PhoneIcon = ({ className = "w-6 h-6 text-green-500" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

// Voice call scenarios with VAPI workflow IDs
const callScenarios = {
  customerService: {
    title: "Customer Service",
    description: "AI handles support inquiries and troubleshooting",
    workflowId: "4ae56811-4307-464b-87a8-77826799ce67",
    features: [
      "Order status inquiries",
      "Product troubleshooting",
      "Account management", 
      "Refund processing"
    ]
  },
  leadQualification: {
    title: "Lead Qualification", 
    description: "AI qualifies prospects and books demos",
    workflowId: "e9c705ec-dc69-400d-bba0-a5e336960d4c",
    features: [
      "Budget qualification",
      "Needs assessment",
      "Timeline discovery",
      "Demo scheduling"
    ]
  },
  appointmentBooking: {
    title: "Appointment Booking",
    description: "AI schedules appointments seamlessly",
    workflowId: "d16d5f14-2edd-4cff-afd8-72193da970f3",
    features: [
      "Calendar availability",
      "Service selection",
      "Customer information",
      "Confirmation & reminders"
    ]
  }
};

type ScenarioKey = keyof typeof callScenarios;

// Common industries for selector
const industries = [
  'Healthcare',
  'Real Estate',
  'E-commerce',
  'Legal',
  'Automotive',
  'Finance',
  'Restaurants',
  'SaaS',
  'Hospitality',
  'Home Services',
  'Education',
  'Other'
];

interface CallStatus {
  status: 'idle' | 'calling' | 'success' | 'error';
  message?: string;
  callId?: string;
}

const LiveVoiceCallDemo = () => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>('customerService');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState<CallStatus>({ status: 'idle' });
  const [industry, setIndustry] = useState('');

  const currentScenario = callScenarios[selectedScenario];

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    } else {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (formatted.replace(/\D/g, '').length <= 10) {
      setPhoneNumber(formatted);
    }
  };

  // Convert formatted number to +1XXXXXXXXXX format
  const formatForAPI = (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length === 10 ? `+1${numbers}` : '';
  };

  const initiateCall = async () => {
    const apiPhoneNumber = formatForAPI(phoneNumber);
    
    if (!apiPhoneNumber) {
      setCallStatus({ status: 'error', message: 'Please enter a valid 10-digit phone number' });
      return;
    }

    // Basic client-side validation for additional fields
    if (!fullName.trim()) {
      setCallStatus({ status: 'error', message: 'Please enter your name' });
      return;
    }
    if (!businessName.trim()) {
      setCallStatus({ status: 'error', message: 'Please enter your business name' });
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setCallStatus({ status: 'error', message: 'Please enter a valid email address' });
      return;
    }

    setCallStatus({ status: 'calling', message: 'Initiating call...' });

    try {
      const response = await fetch('/api/vapi-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflowId: currentScenario.workflowId,
          phoneNumber: apiPhoneNumber,
          industry,
          name: fullName.trim(),
          businessName: businessName.trim(),
          email: email.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setCallStatus({ 
          status: 'success', 
          message: 'Call initiated successfully! You should receive a call shortly.',
          callId: result.callId 
        });
      } else {
        setCallStatus({ 
          status: 'error', 
          message: result.error || 'Failed to initiate call. Please try again.' 
        });
      }
    } catch {
      setCallStatus({ 
        status: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    }
  };

  const resetCall = () => {
    setCallStatus({ status: 'idle' });
    setFullName('');
    setBusinessName('');
    setEmail('');
    setPhoneNumber('');
    setIndustry('');
  };

  return (
    <motion.div
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Get Your Live AI Voice Demo Call</h3>
      <p className="text-xs sm:text-sm text-teal-300 mb-3 sm:mb-4 text-center font-[family-name:var(--font-geist-mono)] tracking-wider">Instant, no-cost demo. See how an AI agent sounds on a real call.</p>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6">
        <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full border border-teal-600 text-teal-300 bg-teal-900/20 font-[family-name:var(--font-geist-mono)] tracking-wider">No Credit Card</span>
        <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full border border-green-600 text-green-300 bg-green-900/20 font-[family-name:var(--font-geist-mono)] tracking-wider">Takes under 2 minutes</span>
        <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full border border-slate-600 text-slate-300 bg-slate-800/60 font-[family-name:var(--font-geist-mono)] tracking-wider">US numbers only</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Configuration Section */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <p className="text-sm font-semibold text-slate-300 mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">1. Choose Call Type:</p>
            <div className="space-y-3">
              {(Object.keys(callScenarios) as ScenarioKey[]).map((key) => (
                <button 
                  key={key}
                  onClick={() => setSelectedScenario(key)}
                  disabled={callStatus.status === 'calling'}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 font-[family-name:var(--font-geist-mono)] tracking-wider disabled:opacity-50 disabled:cursor-not-allowed
                              ${selectedScenario === key ? 'border-teal-500 bg-teal-500/10' : 'border-slate-600 bg-slate-700/40 hover:border-slate-500'}`}
                >
                  <div className="font-semibold text-white text-sm">{callScenarios[key].title}</div>
                  <div className="text-xs text-slate-400 mt-1">{callScenarios[key].description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-300 mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">2. Enter Your Info:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Name"
                disabled={callStatus.status === 'calling'}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-teal-500 focus:outline-none font-[family-name:var(--font-geist-mono)] disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Business Name"
                disabled={callStatus.status === 'calling'}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-teal-500 focus:outline-none font-[family-name:var(--font-geist-mono)] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                disabled={callStatus.status === 'calling'}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-teal-500 focus:outline-none font-[family-name:var(--font-geist-mono)] disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="(555) 123-4567"
                disabled={callStatus.status === 'calling'}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-teal-500 focus:outline-none font-[family-name:var(--font-geist-mono)] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="grid grid-cols-1 mt-3">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                disabled={callStatus.status === 'calling'}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-teal-500 focus:outline-none font-[family-name:var(--font-geist-mono)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" disabled>Select Your Industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-[family-name:var(--font-geist-mono)]">
              US phone numbers only. You&apos;ll receive a call within 10 seconds.
            </p>
          </div>

          <div className="p-4 bg-slate-900/50 rounded-lg border border-teal-700/30">
            <h4 className="text-sm font-semibold text-teal-400 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              This Demo Includes:
            </h4>
            <ul className="space-y-1">
              {currentScenario.features.map((feature, index) => (
                <li key={index} className="text-xs text-slate-300 flex items-center gap-2 font-[family-name:var(--font-geist-mono)]">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call Status Section */}
        <div className="bg-slate-900/50 p-4 sm:p-6 rounded-xl border border-slate-700 min-h-[400px] flex flex-col">
          <h4 className="text-lg sm:text-xl font-bold text-teal-400 mb-4 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Call Status
          </h4>
          
          <div className="flex-1 flex flex-col justify-center items-center">
            {callStatus.status === 'idle' && (
              <div className="text-center">
                <PhoneIcon className="w-16 h-16 mx-auto mb-4 text-slate-500" />
                <p className="text-slate-400 font-[family-name:var(--font-geist-mono)]">
                  Select a call type and enter your phone number to start
                </p>
              </div>
            )}

            {callStatus.status === 'calling' && (
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-teal-400 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-teal-300 font-semibold font-[family-name:var(--font-geist-mono)]">
                  {callStatus.message}
                </p>
                <p className="text-slate-400 text-sm mt-2 font-[family-name:var(--font-geist-mono)]">
                  Please wait while we connect you...
                </p>
              </div>
            )}

            {callStatus.status === 'success' && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-green-300 font-semibold mb-2 font-[family-name:var(--font-geist-mono)]">
                  {callStatus.message}
                </p>
                {callStatus.callId && (
                  <p className="text-slate-400 text-xs font-[family-name:var(--font-geist-mono)]">
                    Call ID: {callStatus.callId}
                  </p>
                )}
              </motion.div>
            )}

            {callStatus.status === 'error' && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-red-300 font-semibold font-[family-name:var(--font-geist-mono)]">
                  {callStatus.message}
                </p>
              </motion.div>
            )}
          </div>

          <div className="mt-6">
            {callStatus.status === 'idle' && (
              <button 
                onClick={initiateCall}
                disabled={
                  !phoneNumber ||
                  formatForAPI(phoneNumber) === '' ||
                  !fullName.trim() ||
                  !businessName.trim() ||
                  !email.trim() ||
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
                  !industry
                }
                className="w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-[family-name:var(--font-geist-mono)] tracking-wider uppercase bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="flex items-center justify-center gap-2">
                  <PhoneIcon className="w-4 h-4" />
                  Get My Live AI Demo Call
                </div>
              </button>
            )}

            {(callStatus.status === 'success' || callStatus.status === 'error') && (
              <button 
                onClick={resetCall}
                className="w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-[family-name:var(--font-geist-mono)] tracking-wider uppercase bg-slate-600 hover:bg-slate-700 text-white"
              >
                Try Another Demo
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// AI Voice Agent Capabilities Section
const AIVoiceAgentCapabilities = () => (
  <motion.div 
    className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-teal-700/50 shadow-2xl backdrop-blur-sm"
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.7, delay: 0.2 }}
  >
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
      What Our AI Agents Can Do
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
      {/* Core Capabilities */}
      <div className="bg-slate-900/50 p-4 sm:p-6 rounded-xl border border-slate-700">
        <h4 className="text-lg font-bold text-teal-400 mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
          Core Capabilities
        </h4>
        <div className="space-y-4">
          {[
            {
              title: "Natural Conversation",
              description: "Speaks with human-like tone, pauses, and inflection. No robotic responses.",
              icon: (
                <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              )
            },
            {
              title: "Context Memory",
              description: "Remembers everything discussed during the call and builds on previous points.",
              icon: (
                <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              )
            },
            {
              title: "Emotional Intelligence",
              description: "Detects frustration, excitement, or confusion and adapts response accordingly.",
              icon: (
                <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              )
            },
            {
              title: "Multi-Language Support",
              description: "Fluent in 20+ languages with automatic language detection.",
              icon: (
                <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.764.147 2.635.257m-4.97 1.881V2.25" />
                </svg>
              )
            }
          ].map((capability, index) => (
            <motion.div 
              key={capability.title}
              className="flex gap-3 p-3 bg-slate-700/40 rounded-lg hover:bg-slate-700/60 transition-colors duration-200"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0 mt-1">
                {capability.icon}
              </div>
              <div>
                <h5 className="font-semibold text-white text-sm font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                  {capability.title}
                </h5>
                <p className="text-xs text-slate-300 mt-1 font-[family-name:var(--font-geist-mono)]">
                  {capability.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Business Benefits */}
      <div className="bg-slate-900/50 p-4 sm:p-6 rounded-xl border border-slate-700">
        <h4 className="text-lg font-bold text-teal-400 mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
          Business Benefits
        </h4>
        <div className="space-y-4">
          {[
            {
              title: "24/7 Availability",
              description: "Never miss a call. Handle inquiries at any time, even during holidays.",
              metric: "100% uptime"
            },
            {
              title: "Instant Scaling",
              description: "Handle unlimited simultaneous calls during peak times.",
              metric: "∞ concurrent calls"
            },
            {
              title: "Consistent Quality",
              description: "Every customer gets the same high-quality service experience.",
              metric: "0% bad days"
            },
            {
              title: "Cost Efficiency",
              description: "Reduce call center costs while improving customer satisfaction.",
              metric: "60-80% savings"
            }
          ].map((benefit, index) => (
            <motion.div 
              key={benefit.title}
              className="flex justify-between items-start p-3 bg-slate-700/40 rounded-lg hover:bg-slate-700/60 transition-colors duration-200"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-1">
                <h5 className="font-semibold text-white text-sm font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                  {benefit.title}
                </h5>
                <p className="text-xs text-slate-300 mt-1 font-[family-name:var(--font-geist-mono)]">
                  {benefit.description}
                </p>
              </div>
              <div className="text-teal-300 font-bold text-sm font-[family-name:var(--font-geist-mono)] ml-3">
                {benefit.metric}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Performance Metrics - Full Width */}
    <div className="bg-gradient-to-r from-teal-600/20 to-green-600/20 p-4 sm:p-6 rounded-lg border border-teal-500/50 mb-8">
      <h5 className="text-sm font-semibold text-teal-300 mb-4 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
        Performance Metrics
      </h5>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">99.2%</div>
          <div className="text-xs text-slate-300 font-[family-name:var(--font-geist-mono)]">Accuracy Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">&lt;0.5s</div>
          <div className="text-xs text-slate-300 font-[family-name:var(--font-geist-mono)]">Response Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">95%</div>
          <div className="text-xs text-slate-300 font-[family-name:var(--font-geist-mono)]">Customer Satisfaction</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">24/7</div>
          <div className="text-xs text-slate-300 font-[family-name:var(--font-geist-mono)]">Availability</div>
        </div>
      </div>
    </div>

    {/* Use Cases */}
    <div className="mt-8 pt-8 border-t border-slate-600">
      <h4 className="text-lg font-bold text-teal-400 mb-6 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
        Perfect For These Industries
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { industry: "Healthcare", use: "Appointment scheduling" },
          { industry: "Real Estate", use: "Lead qualification" },
          { industry: "E-commerce", use: "Order support" },
          { industry: "Legal", use: "Initial consultations" },
          { industry: "Automotive", use: "Service bookings" },
          { industry: "Finance", use: "Account inquiries" },
          { industry: "Restaurants", use: "Reservations" },
          { industry: "SaaS", use: "Technical support" }
        ].map((item, index) => (
          <motion.div 
            key={item.industry}
            className="text-center p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <div className="font-semibold text-white text-sm font-[family-name:var(--font-geist-mono)] tracking-wider">
              {item.industry}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-[family-name:var(--font-geist-mono)]">
              {item.use}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function AIVoiceAgentsPage() {
  return (
    <ThemedInnerPageLayout themeColor="teal">
      <PageHeroTitle titleLine1="AI Voice" titleLine2="Agents" />
      
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 pt-12 sm:pt-20 md:pt-28 pb-8 sm:pb-16">
        <motion.div className="text-center mb-20 sm:mb-28 md:mb-36" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Human-Like Conversations.<br className="sm:hidden" /> Zero Human Limits.
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-[family-name:var(--font-geist-mono)]">
            Experience AI agents that sound natural, understand context, and handle complex customer interactions 24/7.
          </p>
        </motion.div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <LiveVoiceCallDemo />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-12 sm:mb-16 md:mb-20">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            How AI Handles Difficult Conversations
          </h3>
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">
              Angry customers, complex sales inquiries, technical troubleshooting - see exactly how AI agents navigate challenging conversations step-by-step. No scripts, just intelligent responses that adapt to each situation.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-teal-300 leading-relaxed font-[family-name:var(--font-geist-mono)] font-semibold">
              Watch real conversation scenarios unfold and see the strategic thinking behind each response.
            </p>
          </div>
        </motion.div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <AIVoiceAgentCapabilities />
        </div>

        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Ready to Deploy AI Voice Agents?</h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact?subject=AI%20Voice%20Agent%20Demo" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-300 shadow-md hover:shadow-lg font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Get Voice Demo
            </Link>
            <Link href="/services" className="border border-teal-500 hover:bg-teal-500/10 text-teal-400 hover:text-teal-300 font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-300 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Explore All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </ThemedInnerPageLayout>
  );
} 