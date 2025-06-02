"use client";

import React, { useState } from 'react';
import { PageHeroTitle } from '../components/PageHeroTitle';
import { ThemedInnerPageLayout } from '../components/ThemedInnerPageLayout';

export default function GetInTouchPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse full name into first and last name
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    // Prepare webhook payload
    const webhookData = {
      firstName: firstName,
      lastName: lastName,
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.message,
      projectDetails: formData.message, // Alternative field name
      source: 'Contact Form - Agency Dev Works'
    };

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/PqpLnJVC3VrmBmWnu5d2/webhook-trigger/0a316d28-e8a1-4fed-9cfd-560c89257ff1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setIsSubmitted(true);
      } else {
        console.error('Form submission failed:', response.statusText);
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    }
  };

  return (
    <ThemedInnerPageLayout>
      <PageHeroTitle titleLine1="Get in" titleLine2="Touch" />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Let&apos;s discuss how our cutting-edge solutions can help you achieve your goals. 
              We&apos;re here to turn your vision into reality.
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-900/80 rounded-xl p-8 border border-slate-700/50 shadow-xl">
              {!isSubmitted ? (
                <>
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">
                    Tell Us About Your Project
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    {/* Company Field */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                        placeholder="Your company name"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                        Project Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 resize-vertical"
                        placeholder="Tell us about your project, goals, and how we can help..."
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>

                  {/* Additional Contact Info */}
                  <div className="mt-8 pt-8 border-t border-slate-700/50 text-center">
                    <p className="text-slate-400 text-sm">
                      Prefer to reach out directly? Contact us at{' '}
                      <a href="mailto:official@agencydevworks.ai" className="text-cyan-400 hover:text-cyan-300">
                        official@agencydevworks.ai
                      </a>
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 animate-fade-in">
                  <div className="mb-8">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Your Message Was Sent!
                    </h3>
                    <p className="text-xl text-slate-300 mb-6">
                      Thank you for reaching out to us.
                    </p>
                    <p className="text-lg text-slate-400">
                      Please expect a reply within <span className="text-cyan-400 font-semibold">1-2 business days</span>.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-sm"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ThemedInnerPageLayout>
  );
} 