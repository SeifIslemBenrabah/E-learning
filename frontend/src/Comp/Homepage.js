import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import one from '../assets/one.png'
import duolingo from '../assets/duolingo.png'
import Magic from '../assets/Magic.png'
import Codecov from '../assets/Codecov.png'
import UserTesting from '../assets/UserTesting.png'

/* ── dot-grid texture injected once ── */
const dotStyle = {
  backgroundImage: 'radial-gradient(circle, #2E86FB26 1.5px, transparent 1.5px)',
  backgroundSize: '28px 28px',
}

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: 'Structured Learning',
    desc: 'Each module contains Courses, TD sessions, and TP practicals — all in one organised space tailored to your curriculum.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: 'Collaborative Spaces',
    desc: 'Students and teachers share resources, communicate, and collaborate — fostering a real academic community.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: 'Quizzes & Assessments',
    desc: 'Teachers publish quizzes and assignments instantly. Students get immediate scored feedback to track their progress.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: 'Progress Tracking',
    desc: 'Real-time dashboards give admins, teachers, and students full visibility into academic performance and activity.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
      </svg>
    ),
    title: 'Resource Library',
    desc: 'Access curated playlists, websites, books, and YouTube channels linked directly to each module by your teachers.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: 'Role-Based Access',
    desc: 'Separate, secure portals for admins, teachers, and students — each with the right tools and nothing they don\'t need.',
  },
]

const steps = [
  { num: '01', title: 'Admin sets up classes', desc: 'The platform admin creates grade levels, promotions, and assigns teachers to modules in minutes.' },
  { num: '02', title: 'Teachers upload content', desc: 'Teachers publish course files, resources, quizzes, and assignments directly to their assigned modules.' },
  { num: '03', title: 'Students learn & grow', desc: 'Students access all materials, complete quizzes, and track their progress — anytime, anywhere.' },
]

const stats = [
  { value: '2,300+', label: 'Active Students' },
  { value: '150+', label: 'Expert Teachers' },
  { value: '500+', label: 'Course Modules' },
  { value: '98%', label: 'Satisfaction Rate' },
]

export default function Homepage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="w-full font-sans text-blue overflow-x-hidden">

      {/* ══════════ NAVBAR ══════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-extrabold text-2xl tracking-tight text-blue">ESI<span className="text-primary">Learn</span></span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-blue/80">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how" className="hover:text-primary transition-colors">How it works</a>
            <a href="#stats" className="hover:text-primary transition-colors">About</a>
          </div>
          <Link to="/Login" className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30 hover:bg-blue hover:shadow-blue/30 transition-all duration-200">
            Sign In
          </Link>
        </div>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-blue" style={dotStyle}>
        {/* Glowing orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/30 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="flex flex-col gap-7">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-1.5 rounded-full text-xs font-semibold w-fit backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              ESI-SBA Official E-Learning Platform
            </div>
            <h1 className="text-white text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Level up your<br />
              <span className="text-primary">Computer</span><br />
              <span className="text-primary">Science</span> skills.
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              All your courses, resources, quizzes, and assignments — centralised in one platform built for ESI-SBA students and teachers.
            </p>
            <div className="flex flex-row gap-4 flex-wrap">
              <Link to="/Login" className="bg-primary text-white px-7 py-3 rounded-full font-semibold shadow-xl shadow-primary/40 hover:scale-105 transition-transform duration-200">
                Get Started
              </Link>
              <a href="#features" className="border border-white/20 text-white/80 px-7 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors duration-200">
                Learn More
              </a>
            </div>
            {/* Mini stats */}
            <div className="flex flex-row gap-8 pt-2">
              <div>
                <p className="text-white font-bold text-2xl">2k+</p>
                <p className="text-white/50 text-xs">Students</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-white font-bold text-2xl">150+</p>
                <p className="text-white/50 text-xs">Teachers</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-white font-bold text-2xl">500+</p>
                <p className="text-white/50 text-xs">Modules</p>
              </div>
            </div>
          </div>

          {/* Right — hero image + floating card */}
          <div className="relative flex justify-center">
            {/* Glow behind image */}
            <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-2xl" />
            <img src={one} alt="Student learning" className="relative w-80 md:w-96 drop-shadow-2xl" />

            {/* Floating card */}
            <div className="absolute top-6 -left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3 shadow-xl">
              <div className="bg-primary p-2.5 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-base leading-none">2,000+</p>
                <p className="text-white/60 text-xs mt-0.5">Video Courses</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-8 -right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                <div>
                  <p className="text-white font-semibold text-sm leading-none">New Quiz</p>
                  <p className="text-white/50 text-xs mt-0.5">Available now</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade into white */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ══════════ TRUSTED BY ══════════ */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-gray text-sm font-medium mb-6 uppercase tracking-widest">Trusted technologies &amp; partners</p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            <img src={duolingo} alt="Duolingo" className="h-7 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300" />
            <img src={Codecov} alt="Codecov" className="h-7 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300" />
            <img src={UserTesting} alt="UserTesting" className="h-7 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300" />
            <img src={Magic} alt="Magic" className="h-7 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300" />
          </div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">What we offer</span>
            <h2 className="text-blue text-4xl font-extrabold mt-2">Everything you need to succeed</h2>
            <p className="text-gray mt-3 max-w-xl mx-auto">A complete academic platform designed around how ESI-SBA students and teachers actually work.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group relative bg-bluebg hover:bg-blue rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl hover:shadow-blue/20 hover:-translate-y-1 cursor-default">
                <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 text-primary flex items-center justify-center transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg text-blue group-hover:text-white transition-colors duration-300">{f.title}</h3>
                <p className="text-gray text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section id="how" className="py-24 relative overflow-hidden" style={{ background: '#f8faff' }}>
        <div className="absolute inset-0" style={{ ...dotStyle, opacity: 0.5 }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Simple process</span>
            <h2 className="text-blue text-4xl font-extrabold mt-2">How ESILearn works</h2>
            <p className="text-gray mt-3 max-w-lg mx-auto">Up and running in three steps — for everyone from the admin to the student.</p>
          </div>
          <div className="relative grid md:grid-cols-3 gap-8">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30">
                  <span className="text-white font-extrabold text-2xl">{s.num}</span>
                </div>
                <h3 className="font-bold text-xl text-blue">{s.title}</h3>
                <p className="text-gray text-sm leading-relaxed max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section id="stats" className="py-20 bg-blue relative overflow-hidden" style={dotStyle}>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6">
          <p className="text-center text-white/50 text-sm font-semibold uppercase tracking-widest mb-12">Platform at a glance</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-center">
                <span className="text-primary text-5xl font-extrabold">{s.value}</span>
                <span className="text-white/60 text-sm font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA BANNER ══════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Ready to start?</span>
          <h2 className="text-blue text-4xl md:text-5xl font-extrabold leading-tight">
            Your academic journey<br />starts here.
          </h2>
          <p className="text-gray text-lg max-w-lg">
            Join thousands of ESI-SBA students already using the platform to access their courses, ace their quizzes, and collaborate with classmates.
          </p>
          <Link to="/Login" className="mt-2 bg-primary text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl shadow-primary/30 hover:scale-105 hover:bg-blue transition-all duration-200">
            Access Your Dashboard →
          </Link>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-blue text-white/60 pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            <div className="flex flex-col gap-4">
              <span className="font-extrabold text-2xl text-white">ESI<span className="text-primary">Learn</span></span>
              <p className="text-sm leading-relaxed text-white/40">
                The official e-learning platform of ESI-SBA — built for students, teachers, and administrators.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white font-semibold text-sm mb-1">Platform</p>
              <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
              <a href="#how" className="text-sm hover:text-primary transition-colors">How it works</a>
              <a href="#stats" className="text-sm hover:text-primary transition-colors">About</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white font-semibold text-sm mb-1">Roles</p>
              <Link to="/Login" className="text-sm hover:text-primary transition-colors">Student Login</Link>
              <Link to="/Login" className="text-sm hover:text-primary transition-colors">Teacher Login</Link>
              <Link to="/Login" className="text-sm hover:text-primary transition-colors">Admin Login</Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white font-semibold text-sm mb-1">Support</p>
              <span className="text-sm">Help Center</span>
              <span className="text-sm">Terms of Service</span>
              <span className="text-sm">Privacy Policy</span>
            </div>
          </div>
          <p className="text-center text-xs text-white/30 mt-8">
            © {new Date().getFullYear()} ESILearn · École Supérieure en Informatique · All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
