'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';

// ডামি ডাটা
const demoData = [
  { city: "San Francisco, USA", role: "AI Prompt Engineer", salary: 12500, rent: 4200, internet_speed: "1000 Mbps", flag: "🇺🇸" },
  { city: "Dubai, UAE", role: "Machine Learning Engineer", salary: 8500, rent: 2100, internet_speed: "500 Mbps", flag: "🇦🇪" },
  { city: "London, UK", role: "Data Scientist", salary: 9500, rent: 3200, internet_speed: "350 Mbps", flag: "🇬🇧" },
  { city: "Singapore", role: "AI Research Scientist", salary: 10500, rent: 2800, internet_speed: "1000 Mbps", flag: "🇸🇬" },
  { city: "Berlin, Germany", role: "Computer Vision Engineer", salary: 7500, rent: 1800, internet_speed: "250 Mbps", flag: "🇩🇪" },
  { city: "Tokyo, Japan", role: "NLP Engineer", salary: 8800, rent: 2500, internet_speed: "800 Mbps", flag: "🇯🇵" },
  { city: "Toronto, Canada", role: "AI Product Manager", salary: 9200, rent: 2400, internet_speed: "500 Mbps", flag: "🇨🇦" },
  { city: "Sydney, Australia", role: "Deep Learning Engineer", salary: 8900, rent: 2600, internet_speed: "400 Mbps", flag: "🇦🇺" },
];

// Animated Counter Component (Fixed)
const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return <span ref={countRef}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Floating Particles Component (Fixed - Client Only)
const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false);
  
  // Fixed particle positions (no random)
  const particles = useMemo(() => [
    { size: 8, left: 10, top: 20, duration: 15, delay: 0 },
    { size: 6, left: 25, top: 40, duration: 18, delay: 2 },
    { size: 10, left: 40, top: 15, duration: 12, delay: 1 },
    { size: 5, left: 55, top: 60, duration: 20, delay: 3 },
    { size: 7, left: 70, top: 30, duration: 14, delay: 0.5 },
    { size: 9, left: 85, top: 50, duration: 16, delay: 2.5 },
    { size: 6, left: 15, top: 70, duration: 19, delay: 1.5 },
    { size: 8, left: 30, top: 85, duration: 13, delay: 4 },
    { size: 5, left: 60, top: 75, duration: 17, delay: 0.8 },
    { size: 7, left: 80, top: 10, duration: 15, delay: 3.5 },
    { size: 9, left: 5, top: 45, duration: 18, delay: 1.2 },
    { size: 6, left: 45, top: 55, duration: 14, delay: 2.8 },
    { size: 8, left: 75, top: 65, duration: 16, delay: 0.3 },
    { size: 5, left: 20, top: 90, duration: 20, delay: 4.5 },
    { size: 7, left: 90, top: 35, duration: 12, delay: 1.8 },
  ], []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `rgba(255,255,255,0.15)`,
            borderRadius: '50%',
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `floatParticle ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// Mouse Glow Component (Client Only)
const MouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15) 0%, transparent 50%)`,
      transition: 'background 0.1s ease',
      pointerEvents: 'none',
      zIndex: 0
    }}/>
  );
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(demoData);
  const [selectedRole, setSelectedRole] = useState('all');
  const [mounted, setMounted] = useState(false);
  
  // Calculator States
  const [calcSalary, setCalcSalary] = useState(8000);
  const [calcRent, setCalcRent] = useState(2000);
  const [calcFood, setCalcFood] = useState(500);
  const [calcOther, setCalcOther] = useState(300);
  const [showCalculator, setShowCalculator] = useState(false);

  // Fix hydration - wait for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const results = demoData.filter(item => {
      const matchesSearch = item.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'all' || item.role === selectedRole;
      return matchesSearch && matchesRole;
    });
    setFilteredData(results);
  }, [searchTerm, selectedRole]);

  const uniqueRoles = ['all', ...Array.from(new Set(demoData.map(item => item.role)))];
  const totalSavings = calcSalary - calcRent - calcFood - calcOther;

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#0a0a1a',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Mouse Tracking Glow - Client Only */}
      <MouseGlow />
      
      {/* Static Background Gradients */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 40%),
          radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.2) 0%, transparent 40%),
          radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.15) 0%, transparent 40%)
        `,
        pointerEvents: 'none',
        zIndex: 0
      }}/>
      
      {/* Floating Particles - Client Only */}
      <FloatingParticles />

      {/* Glowing Orbs */}
      <div style={{
        position: 'fixed',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '-250px',
        right: '-250px',
        filter: 'blur(60px)',
        animation: 'pulse 4s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 0
      }}/>
      <div style={{
        position: 'fixed',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        bottom: '-200px',
        left: '-200px',
        filter: 'blur(60px)',
        animation: 'pulse 5s ease-in-out infinite reverse',
        pointerEvents: 'none',
        zIndex: 0
      }}/>

      {/* Hero Section */}
      <header style={{
        padding: '80px 20px 60px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Animated Logo */}
        <div style={{
          display: 'inline-block',
          marginBottom: '20px',
          animation: 'float 3s ease-in-out infinite'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #22d3ee 100%)',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '50px',
            boxShadow: '0 20px 60px rgba(99, 102, 241, 0.5)',
            transform: 'rotate(-5deg)',
            margin: '0 auto'
          }}>
            🌍
          </div>
        </div>

        {/* Main Title with Gradient */}
        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 72px)',
          fontWeight: '900',
          marginBottom: '20px',
          letterSpacing: '-3px',
          background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #f0abfc 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 80px rgba(99, 102, 241, 0.5)'
        }}>
          AI Salary Map
        </h1>
        
        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(16px, 3vw, 22px)',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '700px',
          margin: '0 auto 50px',
          lineHeight: '1.6',
          fontWeight: '300'
        }}>
          🚀 Discover real-time salary data for <span style={{ color: '#a5b4fc', fontWeight: '600' }}>AI professionals</span> across 
          <span style={{ color: '#22d3ee', fontWeight: '600' }}> 500+ global cities</span>
        </p>

        {/* Animated Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '50px',
          flexWrap: 'wrap'
        }}>
          {[
            { num: 500, label: 'Cities', icon: '🌆', color: '#6366f1' },
            { num: 20, label: 'AI Roles', icon: '🤖', color: '#ec4899' },
            { num: 10000, label: 'Data Points', icon: '📊', color: '#22d3ee' },
            { num: 2026, label: 'Updated', icon: '✨', color: '#a855f7' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '20px 30px',
              minWidth: '140px',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.boxShadow = `0 20px 40px ${stat.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ 
                fontSize: '28px', 
                fontWeight: 'bold', 
                color: stat.color,
                marginBottom: '4px'
              }}>
                <AnimatedCounter end={stat.num} suffix={stat.num === 500 ? '+' : stat.num === 10000 ? '+' : ''} />
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Premium Search Bar */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '100px',
            padding: '8px',
            border: '2px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
          }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '8px',
              fontSize: '20px',
              flexShrink: 0
            }}>
              🔍
            </div>
            <input
              type="text"
              placeholder="Search city or role (e.g., 'Dubai', 'Data Scientist')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '16px 20px',
                border: 'none',
                outline: 'none',
                fontSize: '17px',
                color: 'white',
                background: 'transparent',
                fontWeight: '400'
              }}
            />
            <button style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
              color: 'white',
              border: 'none',
              padding: '16px 40px',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginRight: '4px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(99, 102, 241, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Calculator Section */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto 60px',
        padding: '0 20px',
        position: 'relative',
        zIndex: 10
      }}>
        <div 
          onClick={() => setShowCalculator(!showCalculator)}
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '24px 32px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(99, 102, 241, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              🧮
            </div>
            <div>
              <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>
                Savings Calculator
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                Calculate how much you can save in any city
              </p>
            </div>
          </div>
          <div style={{
            fontSize: '24px',
            transition: 'transform 0.3s ease',
            transform: showCalculator ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ⬇️
          </div>
        </div>

        {/* Calculator Panel */}
        <div style={{
          maxHeight: showCalculator ? '600px' : '0',
          overflow: 'hidden',
          transition: 'all 0.5s ease',
          opacity: showCalculator ? 1 : 0
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '40px',
            marginTop: '16px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {/* Salary Input */}
              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                  💰 Monthly Salary ($)
                </label>
                <input
                  type="range"
                  min="1000"
                  max="30000"
                  value={calcSalary}
                  onChange={(e) => setCalcSalary(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1', height: '8px', borderRadius: '4px', cursor: 'pointer' }}
                />
                <div style={{ 
                  color: '#a5b4fc', 
                  fontSize: '28px', 
                  fontWeight: 'bold', 
                  marginTop: '8px',
                  textAlign: 'center'
                }}>
                  ${calcSalary.toLocaleString()}
                </div>
              </div>

              {/* Rent Input */}
              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                  🏠 Monthly Rent ($)
                </label>
                <input
                  type="range"
                  min="200"
                  max="8000"
                  value={calcRent}
                  onChange={(e) => setCalcRent(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#ec4899', height: '8px', borderRadius: '4px', cursor: 'pointer' }}
                />
                <div style={{ 
                  color: '#f9a8d4', 
                  fontSize: '28px', 
                  fontWeight: 'bold', 
                  marginTop: '8px',
                  textAlign: 'center'
                }}>
                  ${calcRent.toLocaleString()}
                </div>
              </div>

              {/* Food Input */}
              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                  🍔 Food & Groceries ($)
                </label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  value={calcFood}
                  onChange={(e) => setCalcFood(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#22d3ee', height: '8px', borderRadius: '4px', cursor: 'pointer' }}
                />
                <div style={{ 
                  color: '#67e8f9', 
                  fontSize: '28px', 
                  fontWeight: 'bold', 
                  marginTop: '8px',
                  textAlign: 'center'
                }}>
                  ${calcFood.toLocaleString()}
                </div>
              </div>

              {/* Other Expenses */}
              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                  📱 Other Expenses ($)
                </label>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  value={calcOther}
                  onChange={(e) => setCalcOther(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#a855f7', height: '8px', borderRadius: '4px', cursor: 'pointer' }}
                />
                <div style={{ 
                  color: '#c4b5fd', 
                  fontSize: '28px', 
                  fontWeight: 'bold', 
                  marginTop: '8px',
                  textAlign: 'center'
                }}>
                  ${calcOther.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Results */}
            <div style={{
              background: totalSavings > 0 
                ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))'
                : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))',
              borderRadius: '20px',
              padding: '32px',
              textAlign: 'center',
              border: `1px solid ${totalSavings > 0 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
            }}>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '8px' }}>
                {totalSavings > 0 ? '🎉 Monthly Savings' : '⚠️ Monthly Deficit'}
              </div>
              <div style={{
                fontSize: '56px',
                fontWeight: '900',
                color: totalSavings > 0 ? '#22c55e' : '#ef4444',
                textShadow: `0 0 40px ${totalSavings > 0 ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`
              }}>
                ${Math.abs(totalSavings).toLocaleString()}
              </div>
              <div style={{ 
                color: 'rgba(255,255,255,0.6)', 
                fontSize: '14px', 
                marginTop: '12px',
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap'
              }}>
                <span>📅 ${(totalSavings * 12).toLocaleString()}/year</span>
                <span>💎 ${(totalSavings * 60).toLocaleString()}/5 years</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Filter Pills */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        padding: '0 20px 50px',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 10
      }}>
        {uniqueRoles.slice(0, 6).map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            style={{
              padding: '12px 24px',
              borderRadius: '50px',
              border: selectedRole === role 
                ? '2px solid transparent' 
                : '2px solid rgba(255,255,255,0.2)',
              background: selectedRole === role 
                ? 'linear-gradient(135deg, #6366f1, #ec4899)' 
                : 'rgba(255,255,255,0.05)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              if (selectedRole !== role) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedRole !== role) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {role === 'all' ? '🎯 All Roles' : role}
          </button>
        ))}
      </div>

      {/* Cards Section */}
      <main style={{
        padding: '60px 20px 80px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Section Title */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              color: 'white',
              marginBottom: '12px'
            }}>
              🔥 Top Cities for AI Talent
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>
              Showing <span style={{ color: '#a5b4fc', fontWeight: '600' }}>{filteredData.length}</span> cities
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {/* Loading State */}
          {!mounted ? (
            <div style={{ textAlign: 'center', padding: '100px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto',
                border: '4px solid rgba(99, 102, 241, 0.2)',
                borderTopColor: '#6366f1',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}/>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '20px' }}>Loading cities...</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '28px'
            }}>
              {filteredData.map((item, index) => {
                const citySlug = item.city.toLowerCase().replace(/ /g, '-').replace(/,/g, '');
                const roleSlug = item.role.toLowerCase().replace(/ /g, '-');
                const savings = item.salary - item.rent - 800;
                
                return (
                  <Link
                    key={index}
                    href={`/salary/${citySlug}/${roleSlug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div 
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '28px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        height: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 30px 60px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.5)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      }}
                    >
                      {/* Role Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: 'white',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
                      }}>
                        {item.role.split(' ')[0]}
                      </div>

                      {/* Flag & City */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '36px' }}>{item.flag}</span>
                        <div>
                          <h3 style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: 'white',
                            marginBottom: '2px'
                          }}>
                            {item.city.split(',')[0]}
                          </h3>
                          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                            {item.city.split(',')[1] || ''}
                          </span>
                        </div>
                      </div>

                      {/* Role */}
                      <p style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '14px',
                        marginBottom: '24px'
                      }}>
                        {item.role}
                      </p>

                      {/* Salary - Big Number */}
                      <div style={{
                        fontSize: '42px',
                        fontWeight: '900',
                        background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '24px',
                        lineHeight: 1
                      }}>
                        ${item.salary.toLocaleString()}
                        <span style={{ fontSize: '16px', opacity: 0.7 }}>/mo</span>
                      </div>

                      {/* Stats Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '16px',
                        paddingTop: '20px',
                        borderTop: '1px solid rgba(255,255,255,0.1)'
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            🏠 Rent
                          </div>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: '#f9a8d4' }}>
                            ${item.rent.toLocaleString()}
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            💰 Save
                          </div>
                          <div style={{ 
                            fontSize: '18px', 
                            fontWeight: '700', 
                            color: savings > 3000 ? '#4ade80' : '#fbbf24'
                          }}>
                            +${savings.toLocaleString()}
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            📶 Speed
                          </div>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: '#67e8f9' }}>
                            {item.internet_speed.split(' ')[0]}
                          </div>
                        </div>
                      </div>

                      {/* Hover Arrow */}
                      <div style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.7,
                        transition: 'all 0.3s',
                        color: 'white',
                        fontSize: '16px'
                      }}>
                        →
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* No Results */}
          {filteredData.length === 0 && mounted && (
            <div style={{
              textAlign: 'center',
              padding: '100px 20px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
              <h3 style={{ fontSize: '28px', color: 'white', marginBottom: '12px' }}>
                No results found
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Premium Footer */}
      <footer style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)',
        padding: '80px 20px 40px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                🌍
              </div>
              <span style={{ color: 'white', fontSize: '24px', fontWeight: '800' }}>AI Salary Map</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', fontSize: '14px' }}>
              The most comprehensive salary database for AI professionals worldwide. 
              Make informed career decisions with real-time data.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
              🔗 Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.5' }}>
              {['Home', 'About', 'Privacy', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#a5b4fc'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Cities */}
          <div>
            <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
              🌆 Top Cities
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.5' }}>
              {['San Francisco', 'Dubai', 'Singapore', 'London'].map((city) => (
                <li key={city}>
                  <a href="#" style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f9a8d4'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
              📬 Stay Updated
            </h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '16px' }}>
              Get weekly salary insights
            </p>
            <div style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '4px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  padding: '12px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
              <button style={{
                background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '10px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'transform 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright - Fixed year */}
        <div style={{
          marginTop: '60px',
          paddingTop: '30px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.4)'
        }}>
          <p>© 2026 AI Salary Map. Made with 💜 for AI professionals worldwide.</p>
        </div>
      </footer>

      {/* Global CSS Animations */}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
        
        ::selection {
          background: rgba(99, 102, 241, 0.3);
          color: white;
        }
        
        input::placeholder {
          color: rgba(255,255,255,0.4);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes floatParticle {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}