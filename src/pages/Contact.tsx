import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 bg-[#F4EDE4]">
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold text-[#F36B21] tracking-wider uppercase font-heading">Get in Touch</span>
        <h1 className="text-4xl font-bold tracking-tight text-[#222222] font-heading">
          Contact Support
        </h1>
        <p className="text-[#666666] text-sm">
          Have questions, feedback, or feature requests? Drop us a message below.
        </p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5D9CC] shadow-sm">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold font-heading text-[#222222]">Message Sent Successfully!</h3>
            <p className="text-sm text-[#666666] max-w-md mx-auto">
              Thank you for reaching out, {name}. Our support team will get back to you at {email} shortly.
            </p>
            <button
              onClick={() => { setSubmitted(false); setName(''); setEmail(''); setSubject(''); setMessage(''); }}
              className="mt-4 px-6 py-2.5 bg-[#F36B21] text-white rounded-xl text-sm font-semibold shadow-md"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#666666]">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FFF9F2] border border-[#E5D9CC] rounded-xl px-4 py-3 text-sm text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F36B21]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#666666]">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FFF9F2] border border-[#E5D9CC] rounded-xl px-4 py-3 text-sm text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F36B21]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#666666]">Subject</label>
              <input
                type="text"
                placeholder="Feature Request or Bug Report"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#FFF9F2] border border-[#E5D9CC] rounded-xl px-4 py-3 text-sm text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F36B21]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#666666]">Message</label>
              <textarea
                rows={5}
                placeholder="How can we help you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#FFF9F2] border border-[#E5D9CC] rounded-xl p-4 text-sm text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F36B21]"
              />
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#F36B21] hover:bg-[#E95516] text-white font-semibold text-sm shadow-lg shadow-[#F36B21]/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
