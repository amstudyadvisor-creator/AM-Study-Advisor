/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Plane, 
  GraduationCap, 
  Globe, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  ChevronRight, 
  Menu, 
  X,
  Facebook,
  Instagram,
  ArrowRight,
  Award,
  Users,
  Briefcase,
  FileText,
  Home,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
interface Destination {
  id: string;
  name: string;
  flag: string;
  programs: string[];
  scholarships: string;
  work: string;
  visa: string;
}

// --- Constants ---
const DESTINATIONS: Destination[] = [
  {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    programs: ['Engineering', 'Design', 'Medicine', 'Business'],
    scholarships: 'DSU Scholarships, Regional Grants, University Merit Awards',
    work: '20 hours per week part-time allowed',
    visa: 'D-Type National Visa for Study'
  },
  {
    id: 'cyprus',
    name: 'Cyprus',
    flag: '🇨🇾',
    programs: ['Hospitality', 'IT', 'MBA', 'Nursing'],
    scholarships: 'Up to 50% Tuition Fee Waivers for International Students',
    work: 'Part-time work allowed in specific sectors',
    visa: 'Easy processing with high success rate'
  },
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    programs: ['Fashion', 'Culinary Arts', 'Luxury Management', 'STEM'],
    scholarships: 'Eiffel Excellence, Campus France Grants, CROUS',
    work: '964 hours per year (approx 20h/week)',
    visa: 'VLS-TS Visa with simplified renewal'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    programs: ['Law', 'Finance', 'Data Science', 'Creative Arts'],
    scholarships: 'Chevening, Commonwealth, GREAT Scholarships',
    work: '20 hours per week during term time',
    visa: 'Student Route (formerly Tier 4)'
  },
  {
    id: 'europe',
    name: 'Other Europe',
    flag: '🇪🇺',
    programs: ['General Studies', 'Language Courses', 'Research'],
    scholarships: 'Erasmus+, National Government Grants',
    work: 'Varies by country (usually 20h/week)',
    visa: 'Schengen Study Visas'
  }
];

const SERVICES = [
  { title: 'University Admission', icon: <GraduationCap className="w-8 h-8" />, desc: 'End-to-end support for securing your spot in top global universities.' },
  { title: 'Visa File Preparation', icon: <FileText className="w-8 h-8" />, desc: 'Expert guidance on documentation to ensure maximum visa success.' },
  { title: 'Scholarship Guidance', icon: <Award className="w-8 h-8" />, desc: 'Helping you find and apply for fully funded and partial scholarships.' },
  { title: 'Interview Preparation', icon: <Users className="w-8 h-8" />, desc: 'Mock interviews and tips to ace your university and visa interviews.' },
  { title: 'Accommodation Guidance', icon: <Home className="w-8 h-8" />, desc: 'Assistance in finding safe and affordable housing abroad.' },
  { title: 'Application Processing', icon: <Briefcase className="w-8 h-8" />, desc: 'Timely and accurate submission of all your application materials.' },
  { title: 'SOP Writing', icon: <FileText className="w-8 h-8" />, desc: 'Crafting compelling Statements of Purpose that stand out.' },
];

const UNIVERSITIES = [
  { name: 'University of Bologna', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/University_of_Bologna_logo.svg/1200px-University_of_Bologna_logo.svg.png' },
  { name: 'University of Padova', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/University_of_Padua_logo.svg/1200px-University_of_Padua_logo.svg.png' },
  { name: 'Sapienza University', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Sapienza_University_of_Rome_logo.svg/1200px-Sapienza_University_of_Rome_logo.svg.png' },
  { name: 'University of Paris', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Logo_Universit%C3%A9_de_Paris.svg/1200px-Logo_Universit%C3%A9_de_Paris.svg.png' },
  { name: 'University of Manchester', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/University_of_Manchester_logo.svg/1200px-University_of_Manchester_logo.svg.png' },
];

const TESTIMONIALS = [
  { name: 'Ahmed Khan', country: 'Italy', university: 'Politecnico di Milano', story: 'AM Study Advisor helped me get a full scholarship and visa in record time. Highly recommended!' },
  { name: 'Sara Ali', country: 'UK', university: 'University of Manchester', story: 'The visa preparation was flawless. I felt confident during my interview thanks to their mock sessions.' },
  { name: 'Zainab Bibi', country: 'France', university: 'Sorbonne University', story: 'From SOP to accommodation, they handled everything. I am now living my dream in Paris!' },
];

// --- Components ---

const Counter = ({ end, label }: { end: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-brand-red mb-2">{count}+</div>
      <div className="text-gray-600 font-medium uppercase tracking-wider text-sm">{label}</div>
    </div>
  );
};


const DestinationCard = ({ dest, onClick }: { dest: Destination; onClick: () => void; key?: React.Key }) => (
  <motion.div 
    whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
    onClick={onClick}
    className="relative group cursor-pointer bg-white rounded-2xl p-8 shadow-xl border border-gray-100 overflow-hidden card-3d"
  >
    <div className="absolute top-0 right-0 p-4 text-6xl opacity-20 group-hover:opacity-40 transition-opacity">
      {dest.flag}
    </div>
    <div className="text-4xl mb-4">{dest.flag}</div>
    <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
    <p className="text-gray-500 mb-4">Explore top universities and scholarships in {dest.name}.</p>
    <div className="flex items-center text-brand-red font-semibold group-hover:gap-2 transition-all">
      Learn More <ChevronRight className="w-5 h-5" />
    </div>
  </motion.div>
);

const Modal = ({ dest, onClose }: { dest: Destination; onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
        <X className="w-6 h-6" />
      </button>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl">{dest.flag}</span>
        <h2 className="text-3xl font-bold">{dest.name}</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-brand-red mb-2 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" /> Programs Available
          </h4>
          <div className="flex flex-wrap gap-2">
            {dest.programs.map(p => (
              <span key={p} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">{p}</span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-brand-red mb-2 flex items-center gap-2">
            <Award className="w-5 h-5" /> Scholarships
          </h4>
          <p className="text-gray-600">{dest.scholarships}</p>
        </div>
        
        <div>
          <h4 className="font-bold text-brand-red mb-2 flex items-center gap-2">
            <Briefcase className="w-5 h-5" /> Part-time Work
          </h4>
          <p className="text-gray-600">{dest.work}</p>
        </div>
        
        <div>
          <h4 className="font-bold text-brand-red mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Visa Guidance
          </h4>
          <p className="text-gray-600">{dest.visa}</p>
        </div>
      </div>
      
      <button 
        onClick={() => {
          onClose();
          document.getElementById('apply')?.scrollIntoView();
        }}
        className="w-full mt-8 bg-brand-red text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
      >
        Apply for {dest.name}
      </button>
    </motion.div>
  </motion.div>
);

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hello! I am AM Study Advisor AI. How can I help you with your study abroad journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an AI assistant for AM Study Advisor, a study abroad consultancy based in Islamabad, Pakistan. 
        Company Info:
        - Specializes in Italy, Cyprus, France, UK, and Europe.
        - Services: Admissions, Visa, Scholarships, SOP, Accommodation.
        - Contact: 0348 5534461, amstudyadvisor@gmail.com.
        - Address: Opposite To Street No 65 G-14/2 Islamabad.
        
        User Question: ${userMsg}`,
        config: {
          systemInstruction: "Be professional, helpful, and concise. Encourage users to book a free consultation or visit the office in Islamabad."
        }
      });
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm sorry, I couldn't process that. Please contact our team directly." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to AI. Please try again later or call us at 0348 5534461." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 mb-4 overflow-hidden border border-gray-200 flex flex-col h-[500px]"
          >
            <div className="bg-brand-red p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                <span className="font-bold">AM Advisor AI</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' ? 'bg-brand-red text-white rounded-tr-none' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-white flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about scholarships..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-brand-red text-white p-2 rounded-full hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        <Bot className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-medium">Chat with AI</span>
      </button>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Services', href: '#services' },
    { name: 'Scholarships', href: '#scholarships' },
    { name: 'Student Success', href: '#success' },
    { name: 'Apply Now', href: '#apply' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-brand-red selection:text-white">
      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center text-white font-bold text-xl">AM</div>
            <span className={`font-bold text-xl tracking-tight ${scrolled ? 'text-black' : 'text-white'}`}>Study Advisor</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-semibold hover:text-brand-red transition-colors ${
                  scrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <button 
            className="lg:hidden p-2 rounded-lg bg-white/10 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="text-black" /> : <Menu className={scrolled ? 'text-black' : 'text-white'} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-bold text-2xl">AM Advisor</span>
              <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-bold hover:text-brand-red transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-black">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-red rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] opacity-30" />
        </div>

        {/* Animated Airplane */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="airplane-path absolute">
            <Plane className="text-white/40 w-12 h-12" />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-brand-red/20 text-brand-red font-bold text-sm mb-6 border border-brand-red/30">
              GLOBAL EDUCATION EXPERTS
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-tight mb-8">
              Start Your Study Abroad <br />
              <span className="text-brand-red">Journey With AM</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Helping students get admission in top international universities with visa and scholarship support. Your future starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#apply" className="w-full sm:w-auto px-10 py-5 bg-brand-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all hover:scale-105 shadow-2xl shadow-red-500/20">
                Apply Now
              </a>
              <a href="#contact" className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                Free Consultation
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10"
          >
            <Counter end={500} label="Students Guided" />
            <Counter end={10} label="Countries" />
            <Counter end={95} label="Visa Success" />
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-white rotate-90" />
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Empowering Your <span className="text-brand-red">Global Dreams</span></h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                At AM Study Advisor, we understand that studying abroad is a life-changing decision. Our expert team provides comprehensive guidance to help you navigate the complexities of international education. We specialize in university admissions, visa processing, scholarship acquisition, and interview preparation, ensuring a smooth transition to your dream destination.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <span className="font-bold">Expert Counselors</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <span className="font-bold">Fast Processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <span className="font-bold">High Success Rate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <span className="font-bold">Global Network</span>
                </div>
              </div>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 bg-brand-red/5 rounded-3xl -rotate-3" />
              <div className="relative bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
                <h3 className="text-2xl font-bold mb-10 text-center">Our 4-Step Process</h3>
                <div className="space-y-12 relative">
                  <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-100" />
                  {[
                    { step: '1', title: 'Free Counseling', desc: 'Initial assessment of your profile and goals.' },
                    { step: '2', title: 'University Admission', desc: 'Securing offer letters from top institutions.' },
                    { step: '3', title: 'Visa Filing', desc: 'Expert documentation and submission.' },
                    { step: '4', title: 'Fly Abroad', desc: 'Pre-departure briefing and travel support.' },
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 }}
                      className="flex gap-6 relative z-10"
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-red-500/30">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                        <p className="text-gray-500">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Study Destinations --- */}
      <section id="destinations" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Study <span className="text-brand-red">Destinations</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Explore the world's most prestigious education hubs with our guidance.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.map(dest => (
              <DestinationCard key={dest.id} dest={dest} onClick={() => setSelectedDest(dest)} />
            ))}
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-brand-red">Services</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Comprehensive support for every stage of your international education journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Scholarships Section --- */}
      <section id="scholarships" className="py-24 bg-brand-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-red/5 skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Unlock Global <br /><span className="text-brand-red">Scholarships</span></h2>
              <p className="text-gray-400 text-lg mb-12">
                We help you secure funding for your education through various government and university programs. Don't let finances hold you back from your dreams.
              </p>
              
              <div className="space-y-8">
                {[
                  { country: 'Italy', info: 'Government DSU scholarships covering tuition and living expenses up to €7,000/year.' },
                  { country: 'France', info: 'Eiffel Excellence and CROUS grants for international students.' },
                  { country: 'UK', info: 'Chevening and Commonwealth scholarships for talented individuals.' },
                  { country: 'Cyprus', info: 'Up to 50% merit-based tuition fee discounts for all international students.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Award className="text-brand-red w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2">{item.country}</h4>
                      <p className="text-gray-400 text-sm">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col justify-end">
                  <h4 className="font-bold text-2xl">Government Grants</h4>
                </div>
                <div className="h-48 bg-brand-red rounded-3xl p-8 flex flex-col justify-end shadow-2xl shadow-red-500/20">
                  <h4 className="font-bold text-2xl">Fully Funded</h4>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="h-48 bg-white/10 rounded-3xl p-8 flex flex-col justify-end">
                  <h4 className="font-bold text-2xl">Merit Awards</h4>
                </div>
                <div className="h-64 bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col justify-end">
                  <h4 className="font-bold text-2xl">Fee Discounts</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- University Logo Slider --- */}
      <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
          {[...UNIVERSITIES, ...UNIVERSITIES].map((uni, idx) => (
            <div key={idx} className="flex items-center gap-4 mx-12 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
              <img src={uni.logo} alt={uni.name} className="h-12 object-contain" referrerPolicy="no-referrer" />
              <span className="font-bold text-gray-400">{uni.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- Student Success Section --- */}
      <section id="success" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Student <span className="text-brand-red">Success Stories</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Real stories from students who achieved their dreams with AM Study Advisor.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 relative"
              >
                <div className="text-brand-red mb-6 flex gap-1">
                  {[1,2,3,4,5].map(s => <Award key={s} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-600 italic mb-8">"{t.story}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{t.university}, {t.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Application Form --- */}
      <section id="apply" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-brand-black rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to <br /><span className="text-brand-red">Take Flight?</span></h2>
              <p className="text-gray-400 text-lg mb-12">
                Fill out the form and our expert counselors will get back to you within 24 hours for a free assessment.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-brand-red">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span>0348 5534461</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-brand-red">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span>amstudyadvisor@gmail.com</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 bg-white p-12 lg:p-20">
              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red/20" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Phone Number</label>
                    <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red/20" placeholder="+92 3XX XXXXXXX" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email Address</label>
                    <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red/20" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Interested Country</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red/20">
                      <option>Italy</option>
                      <option>France</option>
                      <option>UK</option>
                      <option>Cyprus</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Current Qualification</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red/20" placeholder="e.g. Bachelor in CS" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Message</label>
                  <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-brand-red/20" placeholder="Tell us about your goals..."></textarea>
                </div>
                <button className="w-full bg-brand-red text-white py-5 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-2">
                  Submit Application <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">Get In <span className="text-brand-red">Touch</span></h2>
              <div className="space-y-6">
                <div className="flex gap-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Call Us</h4>
                    <p className="text-gray-500">0348 5534461 / 0323 5435429</p>
                  </div>
                </div>
                <div className="flex gap-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email Us</h4>
                    <p className="text-gray-500">amstudyadvisor@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Visit Us</h4>
                    <p className="text-gray-500">Opposite To Street No 65 G-14/2 Islamabad</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <a href="https://www.facebook.com/share/17zK5PNoZn/" target="_blank" className="w-12 h-12 rounded-full bg-brand-black text-white flex items-center justify-center hover:bg-brand-red transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/amstudyadvisor" target="_blank" className="w-12 h-12 rounded-full bg-brand-black text-white flex items-center justify-center hover:bg-brand-red transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://tiktok.com/@am.study.advisor" target="_blank" className="w-12 h-12 rounded-full bg-brand-black text-white flex items-center justify-center hover:bg-brand-red transition-colors font-bold">
                  TT
                </a>
              </div>
            </div>
            
            <div className="h-[500px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.308894854533!2d72.964433!3d33.649333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9675aaaaaaab%3A0x1234567890abcdef!2sG-14%2F2%20Islamabad!5e0!3m2!1sen!2s!4v1709855344610!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-brand-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center text-white font-bold text-xl">AM</div>
                <span className="font-bold text-xl tracking-tight">Study Advisor</span>
              </div>
              <p className="text-gray-500 leading-relaxed">
                Your trusted partner for international education. We make your study abroad dreams a reality with expert guidance and support.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-8">Quick Links</h4>
              <ul className="space-y-4 text-gray-500">
                {navLinks.slice(0, 4).map(link => (
                  <li key={link.name}><a href={link.href} className="hover:text-brand-red transition-colors">{link.name}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-8">Support</h4>
              <ul className="space-y-4 text-gray-500">
                {navLinks.slice(4).map(link => (
                  <li key={link.name}><a href={link.href} className="hover:text-brand-red transition-colors">{link.name}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-8">Newsletter</h4>
              <p className="text-gray-500 mb-6">Subscribe to get the latest updates on scholarships.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-brand-red" />
                <button className="bg-brand-red p-2 rounded-xl hover:bg-red-700 transition-colors"><ChevronRight /></button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:row justify-between items-center gap-6 text-gray-500 text-sm">
            <p>© 2026 AM Study Advisor. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Floating WhatsApp Button --- */}
      <a 
        href="https://wa.me/923485534461?text=Hello%20AM%20Study%20Advisor,%20I%20want%20information%20about%20studying%20abroad." 
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-medium">WhatsApp Us</span>
      </a>

      {/* --- AI Chat Component --- */}
      <AIChat />

      {/* --- Destination Modal --- */}
      <AnimatePresence>
        {selectedDest && <Modal dest={selectedDest} onClose={() => setSelectedDest(null)} />}
      </AnimatePresence>

      {/* Custom Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
