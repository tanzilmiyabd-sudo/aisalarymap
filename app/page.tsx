'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div style={{
      backgroundColor: '#050505',
      color: 'white',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center'
    }}>
      {/* Dynamic Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.1) 0%, transparent 50%)`,
        zIndex: 1
      }} />

      {/* Floating Elements / Particles */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: Math.random() * 3 + 'px',
          height: Math.random() * 3 + 'px',
          background: 'rgba(255,255,255,0.3)',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          borderRadius: '50%',
          animation: `float ${Math.random() * 10 + 5}s infinite linear`,
          zIndex: 0
        }} />
      ))}

      {/* Main Content Card */}
      <div style={{ position: 'relative', zIndex: 10, padding: '40px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(124, 58, 237, 0.1)',
          padding: '8px 20px',
          borderRadius: '100px',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          marginBottom: '30px',
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#A78BFA',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          <span style={{ width: '8px', height: '8px', background: '#34D399', borderRadius: '50%', boxShadow: '0 0 10px #34D399' }}></span>
          Neural Network Online
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 12vw, 7rem)',
          fontWeight: '900',
          margin: '0',
          letterSpacing: '-2px',
          background: 'linear-gradient(135deg, #fff 30%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1'
        }}>
          AI SALARY<br/>MAP
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 4vw, 22px)',
          color: '#888',
          maxWidth: '700px',
          margin: '25px auto',
          fontWeight: '300',
          lineHeight: '1.6'
        }}>
          Decoding the global economy of Artificial Intelligence. <br/>
          Compare salaries, living costs, and <span style={{ color: '#fff', fontWeight: '500' }}>AI skill premiums</span> across 500+ tech hubs.
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px', flexWrap: 'wrap' }}>
          <button style={{
            padding: '18px 45px',
            background: '#fff',
            color: '#000',
            borderRadius: '12px',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 30px rgba(255,255,255,0.2)'
          }}>
            Explore The Engine
          </button>
          <button style={{
            padding: '18px 45px',
            background: 'transparent',
            color: '#fff',
            borderRadius: '12px',
            fontWeight: '600',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            fontSize: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            Join Community 
          </button>
        </div>
      </div>

      {/* Stats Footer */}
      <div style={{
        position: 'absolute',
        bottom: '50px',
        display: 'flex',
        gap: '40px',
        color: '#444',
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        <span>500+ Cities</span>
        <span>50+ Roles</span>
        <span>Real-time Data</span>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
