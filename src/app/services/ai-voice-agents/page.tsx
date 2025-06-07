"use client";

import React, { useState, useEffect } from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../../components/PageHeroTitle';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Icons
const MicrophoneIcon = ({ className = "w-6 h-6 text-teal-400" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
);

const UserIcon = ({ className = "w-6 h-6 text-blue-400" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const PhoneIcon = ({ className = "w-6 h-6 text-green-500" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

// Voice conversation scenarios
const conversationScenarios = {
  customerService: {
    title: "Customer Service",
    description: "Handling common support inquiries",
    conversation: [
      { speaker: "customer", message: "Hi, I need to check my order status.", timestamp: 1000 },
      { speaker: "ai", message: "Hello! I'd be happy to help you check your order status. Could you please provide your order number?", timestamp: 2500 },
      { speaker: "customer", message: "Sure, it's #12345", timestamp: 4000 },
      { speaker: "ai", message: "Thank you! Let me look that up for you... I found your order #12345. It was shipped yesterday and should arrive tomorrow by 3 PM. You can track it with tracking number TRK789123.", timestamp: 6000 },
      { speaker: "customer", message: "Perfect, thank you!", timestamp: 8000 },
      { speaker: "ai", message: "You're welcome! Is there anything else I can help you with today?", timestamp: 9000 }
    ]
  },
  leadQualification: {
    title: "Lead Qualification",
    description: "Qualifying potential customers",
    conversation: [
      { speaker: "ai", message: "Hello! I'm calling about your interest in our premium software solution. Do you have a few minutes to discuss your business needs?", timestamp: 1000 },
      { speaker: "customer", message: "Yes, I've been looking for a CRM system.", timestamp: 3000 },
      { speaker: "ai", message: "Great! How many team members would be using the CRM?", timestamp: 4500 },
      { speaker: "customer", message: "About 15 people in our sales team.", timestamp: 6000 },
      { speaker: "ai", message: "Perfect. What's your current budget range for a CRM solution?", timestamp: 7500 },
      { speaker: "customer", message: "We're looking at around $2000-3000 per month.", timestamp: 9000 },
      { speaker: "ai", message: "Excellent! Based on your needs, I'd like to schedule a demo with our product specialist. Are you available this Friday at 2 PM?", timestamp: 11000 }
    ]
  },
  appointment: {
    title: "Appointment Booking",
    description: "Scheduling appointments seamlessly",
    conversation: [
      { speaker: "customer", message: "I'd like to book a dental appointment.", timestamp: 1000 },
      { speaker: "ai", message: "I'd be happy to help schedule your appointment! Is this for a regular cleaning or do you have specific concerns?", timestamp: 2500 },
      { speaker: "customer", message: "Just a regular cleaning and checkup.", timestamp: 4000 },
      { speaker: "ai", message: "Perfect! I have availability next Tuesday at 10 AM or Thursday at 2 PM. Which works better for you?", timestamp: 5500 },
      { speaker: "customer", message: "Thursday at 2 PM works great.", timestamp: 7000 },
      { speaker: "ai", message: "Excellent! I've booked you for Thursday, October 25th at 2:00 PM. You'll receive a confirmation text shortly. Please arrive 15 minutes early.", timestamp: 8500 }
    ]
  }
};

type ScenarioKey = keyof typeof conversationScenarios;

interface ConversationMessage {
  speaker: string;
  message: string;
  timestamp: number;
}

const VoiceConversationSimulator = () => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>('customerService');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<ConversationMessage[]>([]);

  const currentScenario = conversationScenarios[selectedScenario];

  const startConversation = () => {
    setIsPlaying(true);
    setDisplayedMessages([]);
    setCurrentMessageIndex(0);
  };

  const stopConversation = () => {
    setIsPlaying(false);
    setDisplayedMessages([]);
    setCurrentMessageIndex(0);
  };

  useEffect(() => {
    if (!isPlaying || currentMessageIndex >= currentScenario.conversation.length) {
      if (currentMessageIndex >= currentScenario.conversation.length) {
        setIsPlaying(false);
    }
      return;
    }

    const currentMessage = currentScenario.conversation[currentMessageIndex];
    const timer = setTimeout(() => {
      setDisplayedMessages(prev => [...prev, currentMessage]);
      setCurrentMessageIndex(prev => prev + 1);
    }, currentMessage.timestamp - (currentMessageIndex > 0 ? currentScenario.conversation[currentMessageIndex - 1].timestamp : 0));

    return () => clearTimeout(timer);
  }, [isPlaying, currentMessageIndex, currentScenario]);

    return (
      <motion.div
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
      >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Live AI Voice Conversations</h3>
      <p className="text-xs sm:text-sm text-teal-300 mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider">Experience how AI agents handle real customer interactions with natural conversation flow.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Scenario Selection */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <p className="text-sm font-semibold text-slate-300 mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Choose Conversation Type:</p>
            <div className="space-y-3">
              {(Object.keys(conversationScenarios) as ScenarioKey[]).map((key) => (
                <button 
                  key={key}
                  onClick={() => { setSelectedScenario(key); stopConversation(); }}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 font-[family-name:var(--font-geist-mono)] tracking-wider
                              ${selectedScenario === key ? 'border-teal-500 bg-teal-500/10' : 'border-slate-600 bg-slate-700/40 hover:border-slate-500'}`}
                >
                  <div className="font-semibold text-white text-sm">{conversationScenarios[key].title}</div>
                  <div className="text-xs text-slate-400 mt-1">{conversationScenarios[key].description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-900/50 rounded-lg border border-teal-700/30">
            <h4 className="text-sm font-semibold text-teal-400 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Conversation Features:
            </h4>
            <ul className="space-y-1">
              {[
                "Natural language understanding",
                "Context awareness",
                "Professional tone matching",
                "Real-time problem solving"
              ].map((feature, index) => (
                <li key={index} className="text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={isPlaying ? stopConversation : startConversation}
            className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-[family-name:var(--font-geist-mono)] tracking-wider uppercase
                        ${isPlaying ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white'}`}
          >
            <div className="flex items-center justify-center gap-2">
              {isPlaying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
                  Stop Conversation
                </>
              ) : (
                <>
                  <PhoneIcon className="w-4 h-4" />
                  Start Call Simulation
                </>
              )}
            </div>
          </button>
        </div>

        {/* Conversation Display */}
        <div className="bg-slate-900/50 p-4 sm:p-6 rounded-xl border border-slate-700 min-h-[400px]">
          <h4 className="text-lg sm:text-xl font-bold text-teal-400 mb-4 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            {currentScenario.title} Demo
          </h4>
          
          <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
            {displayedMessages.length === 0 && !isPlaying && (
              <div className="text-center text-slate-400 py-8 font-[family-name:var(--font-geist-mono)]">
                <PhoneIcon className="w-12 h-12 mx-auto mb-3 text-slate-500" />
                <p className="text-sm">Click &quot;Start Call Simulation&quot; to see the AI agent in action</p>
              </div>
            )}
            
            {displayedMessages.map((message, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 p-3 rounded-lg ${message.speaker === 'ai' ? 'bg-teal-600/20 border border-teal-500/30' : 'bg-blue-600/20 border border-blue-500/30'}`}
              >
                <div className={`flex-shrink-0 p-1.5 rounded-full ${message.speaker === 'ai' ? 'bg-teal-500/20' : 'bg-blue-500/20'}`}>
                  {message.speaker === 'ai' ? (
                    <MicrophoneIcon className="w-4 h-4 text-teal-400" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold font-[family-name:var(--font-geist-mono)] tracking-wider uppercase ${message.speaker === 'ai' ? 'text-teal-300' : 'text-blue-300'}`}>
                      {message.speaker === 'ai' ? 'AI Agent' : 'Customer'}
                    </span>
                  </div>
                  <p className="text-sm text-white font-[family-name:var(--font-geist-mono)]">{message.message}</p>
                </div>
              </motion.div>
            ))}
            
            {isPlaying && (
              <motion.div 
                className="flex items-center gap-2 text-teal-400 text-sm font-[family-name:var(--font-geist-mono)]"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                AI agent is typing...
              </motion.div>
            )}
          </div>

          {/* Call Quality Metrics */}
          {displayedMessages.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 bg-slate-800/50 rounded-md border border-slate-600"
            >
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-teal-300 font-bold text-sm">98%</p>
                  <p className="text-slate-400 text-xs">Accuracy</p>
                </div>
                <div>
                  <p className="text-teal-300 font-bold text-sm">1.2s</p>
                  <p className="text-slate-400 text-xs">Response Time</p>
                </div>
                <div>
                  <p className="text-teal-300 font-bold text-sm">5/5</p>
                  <p className="text-slate-400 text-xs">Satisfaction</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      </motion.div>
    );
};

// Call Flow Builder
const CallFlowBuilder = () => {
  const [selectedFlow, setSelectedFlow] = useState('support');
  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState<string[]>([]);

  const flowTemplates = {
    support: {
      title: "Customer Support Flow",
      description: "Handle support requests intelligently",
      steps: [
        {
          id: 'greeting',
          message: "Hello! I'm here to help with your support request. What can I assist you with today?",
          options: ['Technical Issue', 'Billing Question', 'Account Access'],
          type: 'user-choice'
        },
        {
          id: 'technical',
          message: "I understand you're experiencing a technical issue. Let me help troubleshoot this.",
          options: ['Collect Details', 'Run Diagnostics', 'Escalate to Specialist'],
          type: 'ai-action',
          triggers: ['Technical Issue']
        },
        {
          id: 'billing',
          message: "I can help with your billing inquiry. Let me pull up your account information.",
          options: ['View Recent Charges', 'Payment Methods', 'Refund Request'],
          type: 'ai-action',
          triggers: ['Billing Question']
        },
        {
          id: 'account',
          message: "I'll help you regain access to your account. For security, I need to verify your identity.",
          options: ['Phone Verification', 'Email Verification', 'Security Questions'],
          type: 'ai-action',
          triggers: ['Account Access']
        }
      ]
    },
    sales: {
      title: "Sales Qualification Flow",
      description: "Qualify leads and book demos",
      steps: [
        {
          id: 'intro',
          message: "Hi! I'm calling about your interest in our business solutions. Do you have a few minutes to discuss your needs?",
          options: ['Yes, I have time', 'Call back later', 'Not interested'],
          type: 'user-choice'
        },
        {
          id: 'qualify',
          message: "Great! Let me ask a few questions to understand your business better.",
          options: ['Company Size', 'Current Challenges', 'Budget Range'],
          type: 'ai-action',
          triggers: ['Yes, I have time']
        },
        {
          id: 'demo',
          message: "Based on your needs, I'd love to show you how our solution can help. Would you like to schedule a demo?",
          options: ['Schedule Demo', 'Send Information', 'Follow Up Later'],
          type: 'ai-action',
          triggers: ['Company Size', 'Current Challenges', 'Budget Range']
        },
        {
          id: 'callback',
          message: "No problem! When would be a better time for me to call back?",
          options: ['Schedule Callback', 'Send Email', 'Remove from List'],
          type: 'ai-action',
          triggers: ['Call back later']
        }
      ]
    },
    appointment: {
      title: "Appointment Booking Flow",
      description: "Schedule appointments seamlessly",
      steps: [
        {
          id: 'welcome',
          message: "Hello! I can help you schedule an appointment. What type of service do you need?",
          options: ['Consultation', 'Follow-up', 'New Patient'],
          type: 'user-choice'
        },
        {
          id: 'availability',
          message: "Perfect! Let me check our availability for you.",
          options: ['Check Calendar', 'Suggest Times', 'Alternative Dates'],
          type: 'ai-action',
          triggers: ['Consultation', 'Follow-up', 'New Patient']
        },
        {
          id: 'confirm',
          message: "I have several times available. Which works best for you?",
          options: ['Morning Slot', 'Afternoon Slot', 'Evening Slot'],
          type: 'user-choice',
          triggers: ['Check Calendar']
        },
        {
          id: 'booking',
          message: "Excellent! I'll book that time for you and send a confirmation.",
          options: ['Send Confirmation', 'Add to Calendar', 'Set Reminder'],
          type: 'ai-action',
          triggers: ['Morning Slot', 'Afternoon Slot', 'Evening Slot']
        }
      ]
    }
  };

  const currentFlow = flowTemplates[selectedFlow as keyof typeof flowTemplates];
  const currentStepData = currentFlow.steps[currentStep];

  const handleChoice = (choice: string) => {
    setUserChoices([...userChoices, choice]);
    
    // Find next step based on choice
    const nextStep = currentFlow.steps.findIndex(step => 
      step.triggers && step.triggers.includes(choice)
    );
    
    if (nextStep !== -1) {
      setTimeout(() => setCurrentStep(nextStep), 800);
    }
  };

  const resetFlow = () => {
    setCurrentStep(0);
    setUserChoices([]);
  };

  const getStepIcon = (type: string) => {
    if (type === 'user-choice') {
      return (
        <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    );
  };

  return (
    <motion.div 
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-teal-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
        Interactive Call Flow Builder
      </h3>
      <p className="text-xs sm:text-sm text-teal-300 mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider">
        Design conversation paths and see how AI agents handle complex decision trees
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Flow Templates */}
        <div className="space-y-4">
        <div>
            <p className="text-sm font-semibold text-slate-300 mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Choose Flow Template:</p>
            <div className="space-y-3">
              {Object.entries(flowTemplates).map(([key, flow]) => (
                <button 
                  key={key}
                  onClick={() => { setSelectedFlow(key); resetFlow(); }}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 font-[family-name:var(--font-geist-mono)] tracking-wider
                              ${selectedFlow === key ? 'border-teal-500 bg-teal-500/10' : 'border-slate-600 bg-slate-700/40 hover:border-slate-500'}`}
                >
                  <div className="font-semibold text-white text-sm">{flow.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{flow.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Flow Visualization */}
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <h4 className="text-sm font-semibold text-teal-400 mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Flow Structure:
            </h4>
            <div className="space-y-2">
              {currentFlow.steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex items-center gap-3 p-2 rounded text-xs transition-all duration-200
                              ${index === currentStep ? 'bg-teal-600/20 border border-teal-500/50' : 
                                index < currentStep ? 'bg-green-600/20 border border-green-500/50' : 
                                'bg-slate-700/40 border border-slate-600/30'}`}
                >
                  <div className="flex-shrink-0">
                    {getStepIcon(step.type)}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold ${index === currentStep ? 'text-teal-300' : 
                                      index < currentStep ? 'text-green-300' : 'text-slate-400'}`}>
                      Step {index + 1}: {step.id}
                    </div>
                    <div className="text-slate-500 text-xs">{step.type}</div>
                  </div>
                  {index < currentStep && (
                    <div className="text-green-400">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={resetFlow}
            className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-[family-name:var(--font-geist-mono)] tracking-wider uppercase"
          >
            Reset Flow
          </button>
        </div>

        {/* Interactive Flow Demo */}
        <div className="bg-slate-900/50 p-4 sm:p-6 rounded-xl border border-slate-700 min-h-[500px]">
          <h4 className="text-lg font-bold text-teal-400 mb-4 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            {currentFlow.title} Demo
          </h4>
          
          <div className="space-y-4 mb-6">
            {/* AI Message */}
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-teal-600/20 border border-teal-500/30"
            >
              <div className="flex-shrink-0 p-1.5 rounded-full bg-teal-500/20">
                <MicrophoneIcon className="w-4 h-4 text-teal-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-teal-300 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                    AI Agent
                  </span>
                  <span className="text-xs text-slate-400">
                    {currentStepData.type === 'user-choice' ? 'Waiting for response' : 'Taking action'}
                  </span>
                </div>
                <p className="text-sm text-white font-[family-name:var(--font-geist-mono)]">
                  {currentStepData.message}
                </p>
        </div>
            </motion.div>

            {/* User Choices */}
            {currentStepData.type === 'user-choice' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="space-y-2"
              >
                <p className="text-xs text-slate-400 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                  Choose your response:
                </p>
                {currentStepData.options.map((option) => (
              <button 
                    key={option}
                    onClick={() => handleChoice(option)}
                    className="w-full text-left p-3 rounded-lg border border-blue-500/50 bg-blue-600/20 hover:bg-blue-600/30 transition-colors duration-200 text-sm text-white font-[family-name:var(--font-geist-mono)]"
              >
                    {option}
              </button>
            ))}
              </motion.div>
            )}

            {/* AI Actions */}
            {currentStepData.type === 'ai-action' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="space-y-2"
              >
                <p className="text-xs text-slate-400 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                  AI Agent Actions:
                </p>
                {currentStepData.options.map((action) => (
                  <motion.div
                    key={action}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex items-center gap-2 p-2 rounded bg-slate-700/40 text-xs text-slate-300"
                  >
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                    <span className="font-[family-name:var(--font-geist-mono)]">{action}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Conversation History */}
          {userChoices.length > 0 && (
            <div className="border-t border-slate-600 pt-4">
              <p className="text-xs text-slate-400 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                Conversation Path:
              </p>
              <div className="flex flex-wrap gap-2">
                {userChoices.map((choice, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-blue-600/20 border border-blue-500/50 rounded text-xs text-blue-300 font-[family-name:var(--font-geist-mono)]"
                  >
                    {choice}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Flow Metrics */}
          <div className="mt-4 p-3 bg-slate-800/50 rounded-md border border-slate-600">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-teal-300 font-bold text-sm">{currentStep + 1}/{currentFlow.steps.length}</p>
                <p className="text-slate-400 text-xs">Progress</p>
              </div>
              <div>
                <p className="text-teal-300 font-bold text-sm">{userChoices.length}</p>
                <p className="text-slate-400 text-xs">User Inputs</p>
              </div>
              <div>
                <p className="text-teal-300 font-bold text-sm">
                  {currentStepData.type === 'ai-action' ? 'Acting' : 'Listening'}
                </p>
                <p className="text-slate-400 text-xs">AI State</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VoiceAgentBenefits = () => (
  <div className="bg-gradient-to-b from-slate-800/60 to-slate-900/70 rounded-2xl p-4 sm:p-8 md:p-12 my-8 sm:my-16 md:my-20 shadow-xl border border-teal-700/30">
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Why Voice Agents Transform Business</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {[ 
         { 
           title: "24/7 Availability", 
           text: "Never miss a call. AI agents work around the clock without breaks.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
           )
         },
         { 
           title: "Instant Scaling", 
           text: "Handle unlimited calls simultaneously. Scale instantly during peak times.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
             </svg>
           )
         },
         { 
           title: "Consistent Quality", 
           text: "Perfect performance every time. No bad days, sick leave, or training needed.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
             </svg>
           )
         }
      ].map((benefit, index) => (
        <motion.div 
          key={benefit.title} 
          className="bg-slate-700/40 p-4 sm:p-6 rounded-lg border border-slate-600/50 hover:border-teal-500/60 transition-colors duration-300 text-center" 
          initial={{opacity:0, y:15}} 
          whileInView={{opacity:1, y:0}} 
          transition={{duration:0.5, delay:0.1 + index * 0.1}} 
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-3 sm:mb-4">
            {benefit.icon}
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-teal-400 mb-1.5 sm:mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">{benefit.title}</h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">{benefit.text}</p>
        </motion.div>
      ))}
    </div>
  </div>
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
          <VoiceConversationSimulator />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-12 sm:mb-16 md:mb-20">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Your Call Center is Bleeding Money
          </h3>
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">
              Human agents cost $8-25 per call, need breaks, get sick, and can only handle one conversation at a time. Meanwhile, 70% of calls are routine questions that follow predictable patterns.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-teal-300 leading-relaxed font-[family-name:var(--font-geist-mono)] font-semibold">
              See exactly how much you could save by automating routine calls with AI.
            </p>
          </div>
        </motion.div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <CallFlowBuilder />
                </div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <VoiceAgentBenefits />
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