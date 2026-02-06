'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

// Custom Logo Component
function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="url(#logo-gradient)" />
      <path
        d="M20 8L28 14V26L20 32L12 26V14L20 8Z"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="20" cy="20" r="4" fill="white" />
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#10b981" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Icon Components
function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

// Custom Cursor Component
function CustomCursor({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      {/* Main Cursor */}
      <div
        style={{
          position: 'fixed',
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.1s ease',
          mixBlendMode: 'difference',
        }}
      />
      {/* Cursor Trail */}
      <div
        style={{
          position: 'fixed',
          left: mousePosition.x - 25,
          top: mousePosition.y - 25,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '2px solid rgba(16, 185, 129, 0.5)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'all 0.15s ease-out',
        }}
      />
      {/* Glow Effect */}
      <div
        style={{
          position: 'fixed',
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9997,
          transition: 'all 0.3s ease-out',
          filter: 'blur(20px)',
        }}
      />
    </>
  )
}

// Floating Particles Component
function FloatingParticles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number }>>([])
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (mousePosition.x > 0 && mousePosition.y > 0) {
        const newParticle = {
          id: Date.now(),
          x: mousePosition.x + (Math.random() - 0.5) * 50,
          y: mousePosition.y + (Math.random() - 0.5) * 50,
          size: Math.random() * 8 + 4,
          opacity: 1,
        }
        setParticles(prev => [...prev.slice(-15), newParticle])
      }
    }, 50)

    return () => clearInterval(interval)
  }, [mousePosition])

  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({ ...p, opacity: p.opacity - 0.05, y: p.y - 2 }))
          .filter(p => p.opacity > 0)
      )
    }, 50)

    return () => clearInterval(fadeInterval)
  }, [])

  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'fixed',
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: `rgba(16, 185, 129, ${particle.opacity})`,
            pointerEvents: 'none',
            zIndex: 9996,
            transition: 'opacity 0.1s ease',
          }}
        />
      ))}
    </>
  )
}

// Ripple Effect Component
function RippleEffect() {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }
      setRipples(prev => [...prev, newRipple])
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 1000)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          style={{
            position: 'fixed',
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 9995,
            animation: 'ripple 1s ease-out forwards',
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes ripple {
          0% {
            width: 20px;
            height: 20px;
            opacity: 1;
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

// Magnetic Button Component
function MagneticButton({ children, href, style }: { children: React.ReactNode; href: string; style: React.CSSProperties }) {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.3
    const deltaY = (e.clientY - centerY) * 0.3
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <Link
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      {children}
    </Link>
  )
}

// Tilt Card Component
function TiltCard({ children, style, onMouseEnter, onMouseLeave }: { 
  children: React.ReactNode; 
  style: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`)
  }

  const handleMouseLeave = () => {
    setTransform('')
    onMouseLeave?.()
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: transform || style.transform,
        transition: 'transform 0.2s ease-out',
      }}
    >
      {children}
    </div>
  )
}

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  // Track mouse position
  useEffect(() => {
    setIsClient(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const cities = [
    { name: 'San Francisco', country: 'USA', emoji: '🇺🇸', salary: '$485K', rent: '$3,500', score: '9.2', savings: '58%' },
    { name: 'Berlin', country: 'Germany', emoji: '🇩🇪', salary: '$228K', rent: '$1,400', score: '8.8', savings: '72%' },
    { name: 'London', country: 'UK', emoji: '🇬🇧', salary: '$256K', rent: '$2,200', score: '8.7', savings: '61%' },
    { name: 'Singapore', country: 'Singapore', emoji: '🇸🇬', salary: '$322K', rent: '$2,500', score: '9.1', savings: '65%' },
    { name: 'Dubai', country: 'UAE', emoji: '🇦🇪', salary: '$266K', rent: '$1,800', score: '8.5', savings: '70%' },
    { name: 'Lisbon', country: 'Portugal', emoji: '🇵🇹', salary: '$156K', rent: '$1,200', score: '8.6', savings: '68%' }
  ]

  const features = [
    { icon: '📊', title: 'Real Data', desc: 'Verified salary data from 50,000+ AI professionals', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
    { icon: '🌍', title: '500+ Cities', desc: 'Comprehensive coverage across all continents', gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' },
    { icon: '🚀', title: 'AI Skills', desc: 'Required skills & certifications for each role', gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' },
    { icon: '💰', title: 'Cost Analysis', desc: 'Detailed cost of living breakdowns', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    { icon: '📈', title: 'Career Growth', desc: 'Salary progression & career paths', gradient: 'linear-gradient(135deg, #ef4444, #dc2626)' },
    { icon: '🎯', title: 'Smart Match', desc: 'Find your perfect city based on preferences', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)' }
  ]

  const stats = [
    { emoji: '🌍', value: '500+', label: 'Cities Worldwide', color: '#10b981' },
    { emoji: '💼', value: '50+', label: 'AI/ML Roles', color: '#3b82f6' },
    { emoji: '💰', value: '$450K', label: 'Avg Total Comp', color: '#8b5cf6' },
    { emoji: '📊', value: '10K+', label: 'Data Points', color: '#f59e0b' }
  ]

  const socialLinks = [
    { icon: <TwitterIcon />, label: 'Twitter', href: '#' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', href: '#' },
    { icon: <GithubIcon />, label: 'GitHub', href: '#' },
    { icon: <MailIcon />, label: 'Email', href: '#' },
  ]

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0a0f', 
      color: 'white', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      cursor: 'none',
    }}>
      
      {/* Mouse Effects */}
      {isClient && (
        <>
          <CustomCursor mousePosition={mousePosition} />
          <FloatingParticles mousePosition={mousePosition} />
          <RippleEffect />
        </>
      )}

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '16px 20px',
        background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <Logo size={40} />
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
              AI Salary<span style={{ color: '#10b981' }}>Map</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {[
              { label: 'Cities', icon: <MapPinIcon /> },
              { label: 'Jobs', icon: <BriefcaseIcon /> },
              { label: 'Skills', icon: null },
              { label: 'Compare', icon: null },
            ].map((item, i) => (
              <Link 
                key={i} 
                href={`/${item.label.toLowerCase()}`}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  color: '#9ca3af', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'color 0.2s',
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <MagneticButton 
              href="/calculator"
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                display: 'inline-block',
              }}
            >
              Calculate Salary
            </MagneticButton>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        padding: '160px 20px 80px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #0f1419 50%, #0a0a0f 100%)',
      }}>
        {/* Animated Glow Effects that follow mouse */}
        <div style={{
          position: 'absolute',
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          transition: 'all 0.5s ease-out',
        }} />
        <div style={{
          position: 'absolute',
          top: '0',
          left: '20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0',
          right: '20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }} />
        
        <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '999px',
            marginBottom: '32px',
            backdropFilter: 'blur(10px)',
            animation: 'pulse 2s infinite',
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              background: '#10b981',
              borderRadius: '50%',
              animation: 'blink 1s infinite',
            }} />
            <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '600' }}>
              ✨ Trusted by 50,000+ AI professionals worldwide
            </span>
          </div>

          {/* Main Heading with gradient animation */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}>
            <span style={{ color: 'white', display: 'block' }}>Find Your Ideal</span>
            <span style={{
              background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientShift 3s ease infinite',
            }}>
              AI Career City
            </span>
          </h1>

          <p style={{ fontSize: '20px', color: '#9ca3af', maxWidth: '800px', margin: '0 auto 48px', lineHeight: '1.6' }}>
            Compare AI & ML salaries, cost of living, and required skills across 
            <span style={{ color: 'white', fontWeight: '600' }}> 500+ cities worldwide</span>. 
            Make data-driven career decisions with real insights.
          </p>

          {/* Search Bar */}
          <div style={{
            position: 'relative',
            maxWidth: '800px',
            margin: '0 auto 48px',
          }}>
            <div style={{
              position: 'absolute',
              inset: '0',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
              borderRadius: '20px',
              filter: 'blur(40px)',
              zIndex: 0,
            }} />
            <div style={{ position: 'relative', display: 'flex', zIndex: 1 }}>
              <input
                type="text"
                placeholder="🔍 Search cities, jobs, or skills..."
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  paddingRight: '160px',
                  fontSize: '18px',
                  background: 'rgba(26, 29, 35, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  color: 'white',
                  outline: 'none',
                  cursor: 'text',
                }}
              />
              <MagneticButton
                href="/cities"
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '12px 32px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  textDecoration: 'none',
                  boxShadow: '0 10px 30px -10px rgba(16, 185, 129, 0.5)',
                  display: 'inline-block',
                }}
              >
                Explore →
              </MagneticButton>
            </div>
          </div>

          {/* Stats with Tilt Effect */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px', 
            maxWidth: '900px', 
            margin: '0 auto' 
          }}>
            {stats.map((stat, i) => (
              <TiltCard 
                key={i} 
                style={{
                  padding: '32px',
                  background: 'rgba(26, 29, 35, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(20px)',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>{stat.emoji}</div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: stat.color, marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>{stat.label}</div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* TOP CITIES SECTION */}
      <section style={{ padding: '80px 20px', background: '#0a0a0f' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ 
              display: 'inline-block',
              padding: '4px 16px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '999px',
              fontSize: '14px',
              color: '#10b981',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px'
            }}>
              Featured Cities
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '900',
              color: 'white',
              marginBottom: '16px',
            }}>
              Top Cities for AI Professionals
            </h2>
            <p style={{ fontSize: '18px', color: '#9ca3af' }}>
              Compare salaries, cost of living, and quality of life in the best tech hubs
            </p>
          </div>

          {/* Cities Grid with Tilt Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '32px',
            marginBottom: '48px'
          }}>
            {cities.map((city, i) => (
              <TiltCard 
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'relative',
                  padding: '28px',
                  background: hoveredCard === i 
                    ? 'linear-gradient(135deg, rgba(26, 29, 35, 1) 0%, rgba(16, 185, 129, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(26, 29, 35, 0.9) 0%, rgba(26, 29, 35, 0.7) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  backdropFilter: 'blur(20px)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  boxShadow: hoveredCard === i ? '0 20px 40px -10px rgba(16, 185, 129, 0.3)' : 'none',
                }}
              >
                {/* Shine Effect on Hover */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: hoveredCard === i ? '100%' : '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  transition: 'left 0.5s ease',
                  pointerEvents: 'none',
                }} />

                {/* Rank Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'white',
                  boxShadow: '0 8px 20px -5px rgba(16, 185, 129, 0.5)',
                }}>
                  {i + 1}
                </div>

                {/* City Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ 
                    fontSize: '48px', 
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                    transform: hoveredCard === i ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}>
                    {city.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '24px', 
                      fontWeight: 'bold', 
                      color: hoveredCard === i ? '#10b981' : 'white',
                      marginBottom: '4px',
                      transition: 'color 0.3s ease',
                    }}>
                      {city.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#9ca3af' }}>{city.country}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                  <div style={{
                    padding: '16px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>💰 Avg Salary</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{city.salary}</div>
                  </div>
                  <div style={{
                    padding: '16px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>⭐ Quality</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>{city.score}/10</div>
                  </div>
                </div>

                {/* Footer Info */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  paddingTop: '20px', 
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '14px'
                }}>
                  <div>
                    <span style={{ color: '#9ca3af' }}>🏠 Rent: </span>
                    <span style={{ color: 'white', fontWeight: '600' }}>{city.rent}/mo</span>
                  </div>
                  <div>
                    <span style={{ color: '#9ca3af' }}>💵 Savings: </span>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>{city.savings}</span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* View All Button */}
          <div style={{ textAlign: 'center' }}>
            <MagneticButton 
              href="/cities"
              style={{
                display: 'inline-block',
                padding: '16px 32px',
                background: 'transparent',
                border: '2px solid rgba(16, 185, 129, 0.5)',
                borderRadius: '12px',
                color: '#10b981',
                fontSize: '16px',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              View All 500+ Cities →
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ 
        padding: '100px 20px', 
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0f1419 50%, #0a0a0f 100%)' 
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '900',
            color: 'white',
            textAlign: 'center',
            marginBottom: '64px',
          }}>
            Why Choose AI Salary Map?
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '32px' 
          }}>
            {features.map((feature, i) => (
              <TiltCard 
                key={i}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  textAlign: 'center',
                  padding: '40px 24px',
                  background: hoveredFeature === i ? feature.gradient : 'rgba(26, 29, 35, 0.5)',
                  border: hoveredFeature === i ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ 
                  fontSize: '56px', 
                  marginBottom: '16px',
                  transform: hoveredFeature === i ? 'scale(1.2) rotate(-10deg)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: 'white' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', color: hoveredFeature === i ? 'rgba(255,255,255,0.9)' : '#9ca3af', lineHeight: '1.6' }}>
                  {feature.desc}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: '100px 20px', background: 'linear-gradient(180deg, #0a0a0f 0%, #0f1419 100%)' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 40px',
          background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
          borderRadius: '32px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 30px 60px -20px rgba(16, 185, 129, 0.4)',
        }}>
          {/* Pattern */}
          <div style={{
            position: 'absolute',
            inset: '0',
            opacity: '0.1',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 4rem)', 
              fontWeight: '900', 
              color: 'white', 
              marginBottom: '24px' 
            }}>
              Ready to Find Your Dream City?
            </h2>
            <p style={{ 
              fontSize: '20px', 
              color: 'rgba(255, 255, 255, 0.9)', 
              marginBottom: '48px', 
              maxWidth: '800px', 
              margin: '0 auto 48px' 
            }}>
              Join thousands of AI professionals who found their perfect work-life balance
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <MagneticButton 
                href="/cities"
                style={{
                  padding: '20px 40px',
                  background: 'white',
                  color: '#0a0a0f',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '18px',
                  fontWeight: '900',
                  textDecoration: 'none',
                  boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
                  display: 'inline-block',
                }}
              >
                🚀 Explore Cities Now
              </MagneticButton>
              <MagneticButton 
                href="/calculator"
                style={{
                  padding: '20px 40px',
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '16px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                💰 Calculate My Salary
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ 
        padding: '80px 20px 40px', 
        background: '#0a0a0f',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '48px',
            marginBottom: '60px'
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Logo size={44} />
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: 'white' }}>
                  AI Salary<span style={{ color: '#10b981' }}>Map</span>
                </span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
                The most comprehensive AI salary database. Compare salaries, cost of living, and required skills across 500+ cities worldwide.
              </p>
              
              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    style={{
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: hoveredSocial === i ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: hoveredSocial === i ? '#10b981' : '#9ca3af',
                      transition: 'all 0.2s ease',
                      transform: hoveredSocial === i ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                    }}
                    onMouseEnter={() => setHoveredSocial(i)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Explore Links */}
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '20px', fontSize: '16px' }}>
                Explore
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Cities', 'Jobs', 'Skills', 'Compare', 'Calculator'].map((item) => (
                  <Link 
                    key={item} 
                    href={`/${item.toLowerCase()}`} 
                    style={{ 
                      color: '#9ca3af', 
                      textDecoration: 'none', 
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources Links */}
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '20px', fontSize: '16px' }}>
                Resources
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Blog', 'API Documentation', 'Salary Guide', 'Career Tips', 'FAQ'].map((item) => (
                  <Link 
                    key={item} 
                    href="#" 
                    style={{ 
                      color: '#9ca3af', 
                      textDecoration: 'none', 
                      fontSize: '14px',
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '20px', fontSize: '16px' }}>
                Company
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 'Advertise'].map((item) => (
                  <Link 
                    key={item} 
                    href="#" 
                    style={{ 
                      color: '#9ca3af', 
                      textDecoration: 'none', 
                      fontSize: '14px',
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            paddingTop: '32px', 
            borderTop: '1px solid rgba(255, 255, 255, 0.05)' 
          }}>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              © 2024 AI Salary Map. All rights reserved.
            </p>
            <p style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              color: '#6b7280', 
              fontSize: '14px' 
            }}>
              Made with <HeartIcon /> for AI professionals worldwide
            </p>
          </div>
        </div>
      </footer>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        * {
          cursor: none !important;
        }
        
        input {
          cursor: text !important;
        }
      `}</style>
    </div>
  )
}