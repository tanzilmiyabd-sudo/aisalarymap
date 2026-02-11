'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';

// ============================================
// COLOR PALETTE - DESIGN TOKENS
// ============================================
const colors = {
  primary: {
    indigo: '#6366f1',
    indigoLight: '#818cf8',
    indigoDark: '#4f46e5',
    pink: '#ec4899',
    pinkLight: '#f472b6',
    pinkDark: '#db2777',
    cyan: '#22d3ee',
    cyanLight: '#67e8f9',
    cyanDark: '#06b6d4',
    purple: '#a855f7',
    purpleLight: '#c084fc',
    purpleDark: '#9333ea',
    teal: '#14b8a6',
    tealLight: '#2dd4bf',
    orange: '#f97316',
    orangeLight: '#fb923c',
    amber: '#f59e0b',
    amberLight: '#fbbf24',
    blue: '#3b82f6',
    blueLight: '#60a5fa',
    emerald: '#10b981',
    emeraldLight: '#34d399',
    rose: '#f43f5e',
    roseLight: '#fb7185',
    lime: '#84cc16',
    limeLight: '#a3e635',
  },
  status: {
    success: '#4ade80',
    successLight: '#86efac',
    successDark: '#22c55e',
    successBg: 'rgba(34, 197, 94, 0.15)',
    warning: '#fbbf24',
    warningLight: '#fcd34d',
    warningDark: '#f59e0b',
    warningBg: 'rgba(251, 191, 36, 0.15)',
    error: '#f87171',
    errorLight: '#fca5a5',
    errorDark: '#ef4444',
    errorBg: 'rgba(239, 68, 68, 0.15)',
    info: '#60a5fa',
    infoBg: 'rgba(96, 165, 250, 0.15)',
  },
  text: {
    primary: 'rgba(255,255,255,0.95)',
    secondary: 'rgba(255,255,255,0.75)',
    tertiary: 'rgba(255,255,255,0.55)',
    muted: 'rgba(255,255,255,0.4)',
    dark: '#1a1a2e',
  },
  background: {
    dark: '#0a0a1a',
    darker: '#050510',
    card: 'rgba(255,255,255,0.03)',
    cardHover: 'rgba(255,255,255,0.08)',
    glass: 'rgba(255,255,255,0.05)',
    glassStrong: 'rgba(255,255,255,0.1)',
    glassHover: 'rgba(255,255,255,0.12)',
    input: 'rgba(255,255,255,0.08)',
    inputHover: 'rgba(255,255,255,0.12)',
    inputFocus: 'rgba(99, 102, 241, 0.2)',
  },
  border: {
    light: 'rgba(255,255,255,0.1)',
    lighter: 'rgba(255,255,255,0.06)',
    accent: 'rgba(99, 102, 241, 0.5)',
    success: 'rgba(34, 197, 94, 0.3)',
    warning: 'rgba(251, 191, 36, 0.3)',
    error: 'rgba(239, 68, 68, 0.3)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
    secondary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    success: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
    warning: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    error: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
    cyan: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
    purple: 'linear-gradient(135deg, #9333ea 0%, #a855f7 100%)',
    pink: 'linear-gradient(135deg, #db2777 0%, #ec4899 100%)',
    orange: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
    teal: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
    blue: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
    dark: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a1a 100%)',
    glass: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
  },
  shadows: {
    card: '0 8px 32px rgba(0, 0, 0, 0.3)',
    cardHover: '0 20px 60px rgba(99, 102, 241, 0.3)',
    button: '0 4px 15px rgba(99, 102, 241, 0.4)',
    buttonHover: '0 8px 30px rgba(99, 102, 241, 0.6)',
    glow: '0 0 40px rgba(99, 102, 241, 0.5)',
  }
};

// Role Colors
const roleColors: { [key: string]: string } = {
  'AI': colors.gradients.secondary,
  'Machine': colors.gradients.pink,
  'Data': colors.gradients.cyan,
  'Computer': colors.gradients.purple,
  'NLP': colors.gradients.teal,
  'Deep': colors.gradients.orange,
  'default': colors.gradients.secondary,
};

// Stat Card Gradients
const statGradients = [
  `linear-gradient(135deg, ${colors.primary.indigo}26, ${colors.primary.indigo}0D)`,
  `linear-gradient(135deg, ${colors.primary.pink}26, ${colors.primary.pink}0D)`,
  `linear-gradient(135deg, ${colors.primary.cyan}26, ${colors.primary.cyan}0D)`,
  `linear-gradient(135deg, ${colors.primary.purple}26, ${colors.primary.purple}0D)`,
];

// Demo Data
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

// ============================================
// CALCULATOR COST DATA
// ============================================
const locationMultipliers = { high: 1.3, medium: 1.0, low: 0.8 };

const baseCosts = {
  housing: { rent1br: 1500, rent2br: 2200, rent3br: 3000, own: 2800 },
  utilities: { single: 150, couple: 200, family2: 300, family3: 400 },
  groceries: { single: 400, couple: 700, family2: 1200, family3: 1600 },
  dining: { single: 200, couple: 350, family2: 450, family3: 500 },
  transportation: { carPayment: 450, insurance: 200, gas: 150 },
  healthcare: { employer: 200, marketplace: 400, private: 600, none: 0 },
  medical: { single: 100, couple: 200, family2: 350, family3: 400 }
};

const taxBrackets = {
  federal: [
    { min: 0, max: 11000, rate: 0.10 },
    { min: 11000, max: 44725, rate: 0.12 },
    { min: 44725, max: 95375, rate: 0.22 },
    { min: 95375, max: 182050, rate: 0.24 },
    { min: 182050, max: 231250, rate: 0.32 },
    { min: 231250, max: 578125, rate: 0.35 },
    { min: 578125, max: Infinity, rate: 0.37 }
  ],
  stateTax: { high: 0.09, medium: 0.05, low: 0.03 }
};

const calculateFederalTax = (income: number): number => {
  let tax = 0;
  let remainingIncome = income;
  for (const bracket of taxBrackets.federal) {
    if (remainingIncome <= 0) break;
    const taxableInThisBracket = Math.min(remainingIncome, bracket.max - bracket.min);
    tax += taxableInThisBracket * bracket.rate;
    remainingIncome -= taxableInThisBracket;
  }
  return tax;
};

// ============================================
// ANIMATED COUNTER COMPONENT
// ============================================
const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '' }: { 
  end: number; duration?: number; prefix?: string; suffix?: string 
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
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
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return <span ref={countRef}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// ============================================
// FLOATING PARTICLES & MOUSE GLOW
// ============================================
const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false);
  const particles = useMemo(() => [
    { size: 8, left: 10, top: 20, duration: 15, delay: 0 },
    { size: 6, left: 25, top: 40, duration: 18, delay: 2 },
    { size: 10, left: 40, top: 15, duration: 12, delay: 1 },
    { size: 5, left: 55, top: 60, duration: 20, delay: 3 },
    { size: 7, left: 70, top: 30, duration: 14, delay: 0.5 },
    { size: 9, left: 85, top: 50, duration: 16, delay: 2.5 },
    { size: 6, left: 15, top: 70, duration: 19, delay: 1.5 },
    { size: 8, left: 30, top: 85, duration: 13, delay: 4 },
  ], []);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${p.size}px`,
          height: `${p.size}px`,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          left: `${p.left}%`,
          top: `${p.top}%`,
          animation: `floatParticle ${p.duration}s linear infinite`,
          animationDelay: `${p.delay}s`
        }} />
      ))}
    </div>
  );
};

const MouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.12) 0%, transparent 50%)`,
      transition: 'background 0.15s ease',
      pointerEvents: 'none', zIndex: 0
    }}/>
  );
};

// ============================================
// CALCULATOR UI COMPONENTS
// ============================================

// Custom Select
const CalcSelect = ({ icon, label, value, onChange, options, color }: {
  icon: string; label: string; value: string; onChange: (val: string) => void;
  options: { value: string; label: string }[]; color: string;
}) => (
  <div style={{
    background: colors.background.glass,
    border: `1px solid ${colors.border.light}`,
    borderRadius: '14px',
    padding: '14px',
    transition: 'all 0.3s ease',
    height: '100%'
  }}
  onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = colors.background.glassHover; }}
  onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border.light; e.currentTarget.style.background = colors.background.glass; }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
      <span style={{ 
        fontSize: '18px', width: '32px', height: '32px',
        background: `linear-gradient(135deg, ${color}33, ${color}1A)`,
        borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>{icon}</span>
      <span style={{ color: colors.text.secondary, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
    </div>
    <select value={value} onChange={(e) => onChange(e.target.value)} style={{
      width: '100%', padding: '10px 12px',
      background: colors.background.input, border: `1px solid ${colors.border.light}`,
      borderRadius: '8px', color: 'white', fontSize: '13px', fontWeight: '500',
      cursor: 'pointer', outline: 'none', appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
    }}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value} style={{ background: '#1a1a2e', color: 'white' }}>{opt.label}</option>
      ))}
    </select>
  </div>
);

// Checkbox
const CalcCheckbox = ({ icon, label, checked, onChange, color, amount }: {
  icon: string; label: string; checked: boolean; onChange: (checked: boolean) => void;
  color: string; amount?: number;
}) => (
  <div onClick={() => onChange(!checked)} style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 14px',
    background: checked ? `${color}1A` : colors.background.glass,
    border: `2px solid ${checked ? color : colors.border.light}`,
    borderRadius: '10px', cursor: 'pointer', transition: 'all 0.3s ease',
  }}
  onMouseEnter={(e) => { if (!checked) { e.currentTarget.style.borderColor = `${color}80`; e.currentTarget.style.background = colors.background.glassHover; } }}
  onMouseLeave={(e) => { if (!checked) { e.currentTarget.style.borderColor = colors.border.light; e.currentTarget.style.background = colors.background.glass; } }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: '20px', height: '20px', borderRadius: '5px',
        border: `2px solid ${checked ? color : colors.border.light}`,
        background: checked ? color : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{checked && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}</div>
      <span style={{ fontSize: '16px' }}>{icon}</span>
      <span style={{ color: colors.text.secondary, fontSize: '13px', fontWeight: '500' }}>{label}</span>
    </div>
    {amount !== undefined && (
      <span style={{ color: checked ? color : colors.text.tertiary, fontSize: '13px', fontWeight: '600' }}>${amount}</span>
    )}
  </div>
);

// Tab Button
const CalcTabButton = ({ label, icon, isActive, onClick, color }: { 
  label: string; icon: string; isActive: boolean; onClick: () => void; color: string;
}) => (
  <button onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
    background: isActive ? color : colors.background.glass,
    border: `1px solid ${isActive ? 'transparent' : colors.border.light}`,
    borderRadius: '12px', color: 'white', fontSize: '13px', fontWeight: '600',
    cursor: 'pointer', transition: 'all 0.3s ease',
    boxShadow: isActive ? `0 8px 24px ${colors.primary.indigo}66` : 'none',
  }}
  onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = colors.background.glassHover; } }}
  onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = isActive ? color : colors.background.glass; } }}
  >
    <span style={{ fontSize: '16px' }}>{icon}</span>{label}
  </button>
);

// Result Item
const CalcResultItem = ({ icon, label, value, color, isNegative = false, isTotal = false }: {
  icon: string; label: string; value: number; color: string; isNegative?: boolean; isTotal?: boolean;
}) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: isTotal ? '14px 16px' : '10px 12px',
    background: isTotal ? colors.gradients.glass : colors.background.glass,
    borderRadius: '10px', marginBottom: '6px',
    border: `1px solid ${isTotal ? colors.border.accent : colors.border.lighter}`,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '16px' }}>{icon}</span>
      <span style={{ color: isTotal ? 'white' : colors.text.secondary, fontSize: isTotal ? '14px' : '13px', fontWeight: isTotal ? '700' : '500' }}>{label}</span>
    </div>
    <span style={{ fontWeight: isTotal ? '800' : '700', fontSize: isTotal ? '16px' : '14px', color: isNegative ? colors.status.error : color }}>
      {isNegative && value > 0 ? '-' : ''}${Math.abs(value).toLocaleString()}
    </span>
  </div>
);

// Progress Ring
const ProgressRing = ({ percentage, size = 120, strokeWidth = 10, color }: { 
  percentage: number; size?: number; strokeWidth?: number; color: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={colors.border.light} strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 8px ${color}80)` }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '24px', fontWeight: '800', color }}>{percentage.toFixed(0)}%</span>
        <span style={{ fontSize: '10px', color: colors.text.tertiary, textTransform: 'uppercase', letterSpacing: '1px' }}>Saved</span>
      </div>
    </div>
  );
};

// Expense Bar (Visual chart)
const ExpenseBar = ({ label, icon, amount, total, color }: {
  label: string; icon: string; amount: number; total: number; color: string;
}) => {
  const percentage = total > 0 ? (amount / total) * 100 : 0;
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px' }}>{icon}</span>
          <span style={{ color: colors.text.secondary, fontSize: '12px', fontWeight: '500' }}>{label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: color, fontSize: '13px', fontWeight: '700' }}>${amount.toLocaleString()}</span>
          <span style={{ color: colors.text.tertiary, fontSize: '11px' }}>({percentage.toFixed(0)}%)</span>
        </div>
      </div>
      <div style={{ width: '100%', height: '8px', background: colors.background.glass, borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{
          width: `${percentage}%`, height: '100%',
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          borderRadius: '4px', transition: 'width 0.5s ease'
        }} />
      </div>
    </div>
  );
};

// Mini Stat Card
const MiniStat = ({ icon, label, value, color, suffix = '' }: {
  icon: string; label: string; value: string | number; color: string; suffix?: string;
}) => (
  <div style={{
    background: colors.background.glass,
    border: `1px solid ${colors.border.light}`,
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  }}
  onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
  onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border.light; e.currentTarget.style.transform = 'translateY(0)'; }}
  >
    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
    <div style={{ fontSize: '20px', fontWeight: '800', color, marginBottom: '4px' }}>
      {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
    </div>
    <div style={{ fontSize: '11px', color: colors.text.tertiary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
  </div>
);

// Tip Card
const TipCard = ({ icon, title, description, color }: {
  icon: string; title: string; description: string; color: string;
}) => (
  <div style={{
    background: `linear-gradient(135deg, ${color}15, ${color}08)`,
    border: `1px solid ${color}30`,
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start'
  }}>
    <span style={{
      width: '36px', height: '36px', flexShrink: 0,
      background: `${color}20`, borderRadius: '10px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '18px'
    }}>{icon}</span>
    <div>
      <div style={{ color: 'white', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{title}</div>
      <div style={{ color: colors.text.secondary, fontSize: '12px', lineHeight: 1.5 }}>{description}</div>
    </div>
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(demoData);
  const [selectedRole, setSelectedRole] = useState('all');
  const [mounted, setMounted] = useState(false);
  
  // Calculator States
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcTab, setCalcTab] = useState<'monthly' | 'yearly' | 'hidden'>('monthly');
  
  // Selections
  const [region, setRegion] = useState('medium');
  const [familyType, setFamilyType] = useState('single');
  const [housingType, setHousingType] = useState('rent1br');
  const [carsCount, setCarsCount] = useState('1');
  const [insuranceType, setInsuranceType] = useState('employer');
  const [lifestyle, setLifestyle] = useState('moderate');
  
  // Income
  const [annualIncome, setAnnualIncome] = useState(80000);
  
  // Checkboxes
  const [hasDental, setHasDental] = useState(true);
  const [hasVision, setHasVision] = useState(true);
  const [hasGym, setHasGym] = useState(false);
  const [hasStreaming, setHasStreaming] = useState(true);
  const [hasPet, setHasPet] = useState(false);
  const [hasChildcare, setHasChildcare] = useState(false);
  const [hasRetirement, setHasRetirement] = useState(true);
  const [hasSavings, setHasSavings] = useState(true);

  useEffect(() => { setMounted(true); }, []);

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

  // ============================================
  // CALCULATE ALL COSTS
  // ============================================
  const multiplier = locationMultipliers[region as keyof typeof locationMultipliers];
  const lifestyleMultiplier = lifestyle === 'frugal' ? 0.8 : lifestyle === 'comfortable' ? 1.2 : 1.0;
  const cars = parseInt(carsCount);
  
  // Housing
  const rent = Math.round(baseCosts.housing[housingType as keyof typeof baseCosts.housing] * multiplier);
  const utilities = Math.round(baseCosts.utilities[familyType as keyof typeof baseCosts.utilities] * multiplier);
  const internet = familyType === 'single' ? 100 : 150;
  
  // Food
  const groceries = Math.round(baseCosts.groceries[familyType as keyof typeof baseCosts.groceries] * multiplier * lifestyleMultiplier);
  const dining = Math.round(baseCosts.dining[familyType as keyof typeof baseCosts.dining] * lifestyleMultiplier);
  
  // Transportation
  const carPayment = cars * baseCosts.transportation.carPayment;
  const carInsurance = Math.round(cars * baseCosts.transportation.insurance * multiplier);
  const gasAndMaint = cars * baseCosts.transportation.gas;
  
  // Healthcare
  const healthPremium = baseCosts.healthcare[insuranceType as keyof typeof baseCosts.healthcare];
  const medicalOut = baseCosts.medical[familyType as keyof typeof baseCosts.medical];
  
  // Additional
  const dentalCost = hasDental ? 50 : 0;
  const visionCost = hasVision ? 30 : 0;
  const gymCost = hasGym ? 50 : 0;
  const streamingCost = hasStreaming ? 80 : 0;
  const petCost = hasPet ? 150 : 0;
  const childcareCost = hasChildcare && (familyType === 'family2' || familyType === 'family3') ? 1200 : 0;
  
  // Hidden
  const propertyTax = housingType === 'own' ? Math.round(rent * 12 * 0.015 / 12) : 0;
  const hoaFees = housingType === 'own' ? 200 : 0;
  const homeMaintenance = housingType === 'own' ? 300 : 50;
  const bankFees = 25;
  
  // Retirement & Savings
  const retirement401k = hasRetirement ? Math.round(annualIncome * 0.06 / 12) : 0;
  const emergencySavings = hasSavings ? Math.round(annualIncome * 0.1 / 12) : 0;
  
  // Tax Calculations
  const federalTax = calculateFederalTax(annualIncome);
  const stateTax = annualIncome * taxBrackets.stateTax[region as keyof typeof taxBrackets.stateTax];
  const ficaTax = annualIncome * 0.0765;
  const totalTax = federalTax + stateTax + ficaTax;
  const netAnnualIncome = annualIncome - totalTax;
  const monthlyNetIncome = Math.round(netAnnualIncome / 12);
  
  // Totals
  const housingTotal = rent + utilities + internet;
  const foodTotal = groceries + dining;
  const transportTotal = carPayment + carInsurance + gasAndMaint;
  const healthTotal = healthPremium + medicalOut + dentalCost + visionCost;
  const additionalTotal = gymCost + streamingCost + petCost + childcareCost;
  const hiddenTotal = propertyTax + hoaFees + homeMaintenance + bankFees;
  const savingsTotal = retirement401k + emergencySavings;
  
  const totalMonthlyExpenses = housingTotal + foodTotal + transportTotal + healthTotal + additionalTotal + hiddenTotal + savingsTotal;
  const monthlySavings = monthlyNetIncome - totalMonthlyExpenses;
  const savingsPercentage = monthlyNetIncome > 0 ? (monthlySavings / monthlyNetIncome) * 100 : 0;
  const taxRate = annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0;

  // Financial Status
  const getFinancialStatus = () => {
    if (savingsPercentage >= 30) return { color: colors.status.success, icon: '🎉', message: 'Excellent! Saving 30%+ - Financial freedom awaits!', score: 'A+' };
    if (savingsPercentage >= 20) return { color: colors.status.success, icon: '👍', message: 'Great! Meeting the 20% savings goal.', score: 'A' };
    if (savingsPercentage >= 10) return { color: colors.status.warning, icon: '⚡', message: 'Good start. Try increasing to 20%.', score: 'B' };
    if (savingsPercentage > 0) return { color: colors.status.warning, icon: '⚠️', message: 'Low savings. Consider reducing expenses.', score: 'C' };
    return { color: colors.status.error, icon: '🚨', message: 'Budget deficit! Immediate action needed.', score: 'D' };
  };
  const financialStatus = getFinancialStatus();

  // Get tips based on situation
  const getTips = () => {
    const tips = [];
    if (housingTotal / monthlyNetIncome > 0.3) tips.push({ icon: '🏠', title: 'Housing costs high', description: 'Consider a roommate or smaller place. Aim for under 30% of income.', color: colors.primary.pink });
    if (foodTotal > 800) tips.push({ icon: '🍔', title: 'Food expenses high', description: 'Meal prep and cooking at home can save $200-400/month.', color: colors.primary.orange });
    if (cars > 1) tips.push({ icon: '🚗', title: 'Multiple vehicles', description: 'Consider if you need both cars. Could save $500+/month.', color: colors.primary.purple });
    if (!hasRetirement) tips.push({ icon: '💼', title: 'No retirement savings', description: 'Start with even 3% to get employer match benefits.', color: colors.primary.indigo });
    if (streamingCost > 60) tips.push({ icon: '📺', title: 'Subscriptions add up', description: 'Review and cancel unused services to save money.', color: colors.primary.cyan });
    if (savingsPercentage < 10) tips.push({ icon: '🏦', title: 'Build emergency fund', description: 'Aim to save 3-6 months of expenses for security.', color: colors.status.success });
    return tips.slice(0, 3);
  };
  const tips = getTips();

  const getRoleBadgeColor = (role: string) => roleColors[role.split(' ')[0]] || roleColors['default'];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: colors.background.dark,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      <MouseGlow />
      
      <div style={{
        position: 'fixed', inset: 0,
        background: `
          radial-gradient(circle at 20% 80%, ${colors.primary.pink}33 0%, transparent 40%),
          radial-gradient(circle at 80% 20%, ${colors.primary.cyan}33 0%, transparent 40%),
          radial-gradient(circle at 40% 40%, ${colors.primary.purple}26 0%, transparent 40%)
        `,
        pointerEvents: 'none', zIndex: 0
      }}/>
      
      <FloatingParticles />

      {/* Glowing Orbs */}
      <div style={{
        position: 'fixed', width: '500px', height: '500px',
        background: `radial-gradient(circle, ${colors.primary.indigo}66 0%, transparent 70%)`,
        borderRadius: '50%', top: '-250px', right: '-250px',
        filter: 'blur(60px)', animation: 'pulse 4s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 0
      }}/>
      <div style={{
        position: 'fixed', width: '400px', height: '400px',
        background: `radial-gradient(circle, ${colors.primary.pink}4D 0%, transparent 70%)`,
        borderRadius: '50%', bottom: '-200px', left: '-200px',
        filter: 'blur(60px)', animation: 'pulse 5s ease-in-out infinite reverse',
        pointerEvents: 'none', zIndex: 0
      }}/>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <header style={{ padding: '80px 20px 60px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'inline-block', marginBottom: '20px', animation: 'float 3s ease-in-out infinite' }}>
          <div style={{
            width: '100px', height: '100px',
            background: colors.gradients.primary, borderRadius: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '50px', boxShadow: `0 20px 60px ${colors.primary.indigo}80`,
            transform: 'rotate(-5deg)', margin: '0 auto'
          }}>🌍</div>
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: '900', marginBottom: '20px', letterSpacing: '-3px',
          background: `linear-gradient(135deg, #fff 0%, ${colors.primary.indigoLight} 50%, ${colors.primary.pinkLight} 100%)`,
          backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>AI Salary Map</h1>
        
        <p style={{
          fontSize: 'clamp(16px, 3vw, 22px)', color: colors.text.secondary,
          maxWidth: '700px', margin: '0 auto 50px', lineHeight: '1.6', fontWeight: '300'
        }}>
          🚀 Discover real-time salary data for <span style={{ color: colors.primary.indigoLight, fontWeight: '600' }}>AI professionals</span> across 
          <span style={{ color: colors.primary.cyan, fontWeight: '600' }}> 500+ global cities</span>
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '50px', flexWrap: 'wrap' }}>
          {[
            { num: 500, label: 'Cities', icon: '🌆', color: colors.primary.indigo },
            { num: 20, label: 'AI Roles', icon: '🤖', color: colors.primary.pink },
            { num: 10000, label: 'Data Points', icon: '📊', color: colors.primary.cyan },
            { num: 2026, label: 'Updated', icon: '✨', color: colors.primary.purple }
          ].map((stat, i) => (
            <div key={i} style={{
              background: statGradients[i], backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.border.light}`, borderRadius: '20px',
              padding: '20px 30px', minWidth: '140px', transition: 'all 0.3s ease', cursor: 'pointer'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)'; e.currentTarget.style.boxShadow = `0 20px 40px ${stat.color}40`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: stat.color, marginBottom: '4px' }}>
                <AnimatedCounter end={stat.num} suffix={stat.num === 500 || stat.num === 10000 ? '+' : ''} />
              </div>
              <div style={{ fontSize: '12px', color: colors.text.tertiary, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          <div style={{
            background: colors.background.glassStrong, backdropFilter: 'blur(20px)',
            borderRadius: '100px', padding: '8px', border: `2px solid ${colors.border.light}`,
            display: 'flex', alignItems: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}>
            <div style={{
              width: '50px', height: '50px', background: colors.gradients.secondary,
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginLeft: '8px', fontSize: '20px', flexShrink: 0
            }}>🔍</div>
            <input type="text" placeholder="Search city or role..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, padding: '16px 20px', border: 'none', outline: 'none', fontSize: '17px', color: 'white', background: 'transparent' }}
            />
            <button style={{
              background: colors.gradients.primary, color: 'white', border: 'none',
              padding: '16px 40px', borderRadius: '50px', fontSize: '16px', fontWeight: '700',
              cursor: 'pointer', marginRight: '4px', textTransform: 'uppercase', letterSpacing: '1px'
            }}>Search</button>
          </div>
        </div>
      </header>

      {/* ============================================ */}
      {/* CALCULATOR SECTION - IMPROVED NO EMPTY SPACES */}
      {/* ============================================ */}
      <section style={{ maxWidth: '1400px', margin: '0 auto 60px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        
        {/* Calculator Toggle Header */}
        <div onClick={() => setShowCalculator(!showCalculator)} style={{
          background: colors.gradients.glass, backdropFilter: 'blur(20px)',
          border: `1px solid ${showCalculator ? colors.border.accent : colors.border.light}`,
          borderRadius: showCalculator ? '24px 24px 0 0' : '24px',
          padding: '28px 36px', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          transition: 'all 0.3s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '70px', height: '70px', background: colors.gradients.primary,
              borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '32px', boxShadow: colors.shadows.button
            }}>🧮</div>
            <div>
              <h3 style={{ color: 'white', fontSize: '26px', fontWeight: '800', marginBottom: '6px' }}>
                🇺🇸 USA Living Cost Calculator
              </h3>
              <p style={{ color: colors.text.secondary, fontSize: '15px' }}>
                Complete Cost of Living Analysis Including All Hidden Expenses
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {showCalculator && (
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: colors.text.tertiary, textTransform: 'uppercase' }}>Net Income</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: colors.primary.cyan }}>${monthlyNetIncome.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: colors.text.tertiary, textTransform: 'uppercase' }}>Savings</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: monthlySavings >= 0 ? colors.status.success : colors.status.error }}>${monthlySavings.toLocaleString()}</div>
                </div>
              </div>
            )}
            <div style={{
              width: '50px', height: '50px', background: colors.background.glass,
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', transition: 'transform 0.4s ease',
              transform: showCalculator ? 'rotate(180deg)' : 'rotate(0deg)'
            }}>⬇️</div>
          </div>
        </div>

        {/* Calculator Panel */}
        <div style={{
          maxHeight: showCalculator ? '5000px' : '0', overflow: 'hidden',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: showCalculator ? 1 : 0,
        }}>
          <div style={{
            background: `linear-gradient(180deg, ${colors.background.card} 0%, ${colors.background.darker}90 100%)`,
            backdropFilter: 'blur(40px)',
            border: `1px solid ${colors.border.light}`, borderTop: 'none',
            borderRadius: '0 0 24px 24px', padding: '32px'
          }}>
            
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <CalcTabButton label="Monthly Costs" icon="📅" isActive={calcTab === 'monthly'} onClick={() => setCalcTab('monthly')} color={colors.gradients.secondary} />
              <CalcTabButton label="Annual Overview" icon="📊" isActive={calcTab === 'yearly'} onClick={() => setCalcTab('yearly')} color={colors.gradients.cyan} />
              <CalcTabButton label="Hidden Costs" icon="👁️" isActive={calcTab === 'hidden'} onClick={() => setCalcTab('hidden')} color={colors.gradients.orange} />
            </div>

            {/* ============================================ */}
            {/* MAIN 3-COLUMN LAYOUT */}
            {/* ============================================ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              
              {/* ============================================ */}
              {/* COLUMN 1 - BASIC INPUTS */}
              {/* ============================================ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ width: '32px', height: '32px', background: colors.gradients.secondary, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>📝</span>
                  Basic Information
                </h4>
                
                <CalcSelect icon="📍" label="Region" value={region} onChange={setRegion} color={colors.primary.indigo}
                  options={[
                    { value: 'high', label: 'High Cost (CA, NY, MA)' },
                    { value: 'medium', label: 'Medium Cost (TX, FL)' },
                    { value: 'low', label: 'Low Cost (OH, TN)' }
                  ]}
                />
                <CalcSelect icon="👨‍👩‍��‍👦" label="Family" value={familyType} onChange={setFamilyType} color={colors.primary.pink}
                  options={[
                    { value: 'single', label: 'Single' },
                    { value: 'couple', label: 'Couple' },
                    { value: 'family2', label: '2 Kids' },
                    { value: 'family3', label: '3+ Kids' }
                  ]}
                />
                <CalcSelect icon="🏠" label="Housing" value={housingType} onChange={setHousingType} color={colors.primary.cyan}
                  options={[
                    { value: 'rent1br', label: 'Rent 1BR' },
                    { value: 'rent2br', label: 'Rent 2BR' },
                    { value: 'rent3br', label: 'Rent 3BR' },
                    { value: 'own', label: 'Own Home' }
                  ]}
                />
                <CalcSelect icon="🚗" label="Cars" value={carsCount} onChange={setCarsCount} color={colors.primary.purple}
                  options={[
                    { value: '0', label: 'No Car' },
                    { value: '1', label: '1 Car' },
                    { value: '2', label: '2 Cars' },
                    { value: '3', label: '3+ Cars' }
                  ]}
                />
                <CalcSelect icon="🏥" label="Insurance" value={insuranceType} onChange={setInsuranceType} color={colors.primary.teal}
                  options={[
                    { value: 'employer', label: 'Employer' },
                    { value: 'marketplace', label: 'Marketplace' },
                    { value: 'private', label: 'Private' },
                    { value: 'none', label: 'None' }
                  ]}
                />
                <CalcSelect icon="✨" label="Lifestyle" value={lifestyle} onChange={setLifestyle} color={colors.primary.amber}
                  options={[
                    { value: 'frugal', label: 'Frugal' },
                    { value: 'moderate', label: 'Moderate' },
                    { value: 'comfortable', label: 'Comfortable' }
                  ]}
                />

                {/* Income Slider */}
                <div style={{
                  background: `linear-gradient(135deg, ${colors.primary.indigo}1A, ${colors.primary.purple}1A)`,
                  border: `2px solid ${colors.primary.indigo}40`,
                  borderRadius: '14px', padding: '16px', marginTop: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '24px', width: '40px', height: '40px', background: colors.gradients.secondary, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💰</span>
                    <div>
                      <span style={{ color: 'white', fontSize: '14px', fontWeight: '700', display: 'block' }}>Annual Income</span>
                      <span style={{ color: colors.text.tertiary, fontSize: '11px' }}>Before tax</span>
                    </div>
                  </div>
                  <input type="range" min={20000} max={500000} step={5000} value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    style={{ width: '100%', height: '8px', borderRadius: '4px', cursor: 'pointer', accentColor: colors.primary.indigo }}
                  />
                  <div style={{ marginTop: '12px', textAlign: 'center' }}>
                    <span style={{ fontSize: '32px', fontWeight: '900', color: colors.primary.indigoLight }}>${annualIncome.toLocaleString()}</span>
                    <span style={{ color: colors.text.tertiary, fontSize: '14px' }}>/year</span>
                  </div>
                </div>
              </div>

              {/* ============================================ */}
              {/* COLUMN 2 - ADDITIONAL EXPENSES & CHART */}
              {/* ============================================ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ width: '32px', height: '32px', background: colors.gradients.orange, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>➕</span>
                  Additional Expenses
                </h4>

                {/* Checkboxes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <CalcCheckbox icon="🦷" label="Dental" checked={hasDental} onChange={setHasDental} color={colors.primary.cyan} amount={50} />
                  <CalcCheckbox icon="👓" label="Vision" checked={hasVision} onChange={setHasVision} color={colors.primary.purple} amount={30} />
                  <CalcCheckbox icon="🏋️" label="Gym" checked={hasGym} onChange={setHasGym} color={colors.primary.orange} amount={50} />
                  <CalcCheckbox icon="📺" label="Streaming" checked={hasStreaming} onChange={setHasStreaming} color={colors.primary.pink} amount={80} />
                  <CalcCheckbox icon="🐕" label="Pet" checked={hasPet} onChange={setHasPet} color={colors.primary.amber} amount={150} />
                  <CalcCheckbox icon="👶" label="Childcare" checked={hasChildcare} onChange={setHasChildcare} color={colors.primary.teal} amount={1200} />
                  <CalcCheckbox icon="💼" label="401(k)" checked={hasRetirement} onChange={setHasRetirement} color={colors.primary.indigo} amount={retirement401k} />
                  <CalcCheckbox icon="🏦" label="Emergency Fund" checked={hasSavings} onChange={setHasSavings} color={colors.status.success} amount={emergencySavings} />
                </div>

                {/* Expense Distribution Chart */}
                <div style={{
                  background: colors.background.glass, border: `1px solid ${colors.border.light}`,
                  borderRadius: '14px', padding: '16px', marginTop: 'auto'
                }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📊</span> Budget Allocation
                  </div>
                  <ExpenseBar label="Housing" icon="🏠" amount={housingTotal} total={totalMonthlyExpenses} color={colors.primary.pink} />
                  <ExpenseBar label="Food" icon="🍔" amount={foodTotal} total={totalMonthlyExpenses} color={colors.primary.orange} />
                  <ExpenseBar label="Transport" icon="🚗" amount={transportTotal} total={totalMonthlyExpenses} color={colors.primary.purple} />
                  <ExpenseBar label="Healthcare" icon="🏥" amount={healthTotal} total={totalMonthlyExpenses} color={colors.status.error} />
                  <ExpenseBar label="Other" icon="📦" amount={additionalTotal + hiddenTotal} total={totalMonthlyExpenses} color={colors.primary.cyan} />
                  <ExpenseBar label="Savings" icon="💰" amount={savingsTotal} total={totalMonthlyExpenses} color={colors.status.success} />
                </div>
              </div>

              {/* ============================================ */}
              {/* COLUMN 3 - RESULTS */}
              {/* ============================================ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ width: '32px', height: '32px', background: colors.gradients.success, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>📊</span>
                  Financial Summary
                </h4>

                {/* Main Result */}
                <div style={{
                  background: monthlySavings >= 0 
                    ? `linear-gradient(135deg, ${colors.status.successDark}20, ${colors.status.success}10)`
                    : `linear-gradient(135deg, ${colors.status.errorDark}20, ${colors.status.error}10)`,
                  border: `2px solid ${monthlySavings >= 0 ? colors.border.success : colors.border.error}`,
                  borderRadius: '16px', padding: '20px', textAlign: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '16px' }}>
                    <ProgressRing percentage={Math.max(0, savingsPercentage)} color={monthlySavings >= 0 ? colors.status.success : colors.status.error} size={100} strokeWidth={8} />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '11px', color: colors.text.tertiary, textTransform: 'uppercase', marginBottom: '4px' }}>
                        {monthlySavings >= 0 ? 'Monthly Savings' : 'Monthly Deficit'}
                      </div>
                      <div style={{
                        fontSize: '32px', fontWeight: '900',
                        color: monthlySavings >= 0 ? colors.status.success : colors.status.error,
                      }}>${Math.abs(monthlySavings).toLocaleString()}</div>
                      <div style={{ fontSize: '12px', color: colors.text.secondary, marginTop: '4px' }}>
                        Grade: <span style={{ color: financialStatus.color, fontWeight: '700' }}>{financialStatus.score}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: colors.background.glass, borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{financialStatus.icon}</span>
                    <span style={{ color: colors.text.secondary, fontSize: '12px', textAlign: 'left', lineHeight: 1.4 }}>{financialStatus.message}</span>
                  </div>
                </div>

                {/* Mini Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  <MiniStat icon="💵" label="Net Income" value={monthlyNetIncome} color={colors.primary.cyan} />
                  <MiniStat icon="💸" label="Expenses" value={totalMonthlyExpenses} color={colors.primary.pink} />
                  <MiniStat icon="📈" label="Tax Rate" value={taxRate.toFixed(0)} suffix="%" color={colors.status.error} />
                  <MiniStat icon="🎯" label="Save Rate" value={Math.max(0, savingsPercentage).toFixed(0)} suffix="%" color={colors.status.success} />
                </div>

                {/* Quick Breakdown */}
                <div style={{
                  background: colors.background.glass, border: `1px solid ${colors.border.light}`,
                  borderRadius: '14px', padding: '16px'
                }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'white', marginBottom: '12px' }}>
                    {calcTab === 'monthly' ? '💸 Monthly Breakdown' : calcTab === 'yearly' ? '📅 Annual Summary' : '👁️ Hidden Costs'}
                  </div>
                  
                  {calcTab === 'monthly' && (
                    <>
                      <CalcResultItem icon="🏠" label="Housing" value={housingTotal} color={colors.primary.pink} />
                      <CalcResultItem icon="🍔" label="Food" value={foodTotal} color={colors.primary.orange} />
                      <CalcResultItem icon="🚗" label="Transport" value={transportTotal} color={colors.primary.purple} />
                      <CalcResultItem icon="🏥" label="Healthcare" value={healthTotal} color={colors.status.error} />
                      <CalcResultItem icon="📦" label="Other" value={additionalTotal} color={colors.primary.cyan} />
                      <CalcResultItem icon="👁️" label="Hidden" value={hiddenTotal} color={colors.primary.amber} />
                      <CalcResultItem icon="💰" label="Savings" value={savingsTotal} color={colors.status.success} />
                      <CalcResultItem icon="📊" label="TOTAL" value={totalMonthlyExpenses} color={colors.primary.indigo} isTotal />
                    </>
                  )}
                  
                  {calcTab === 'yearly' && (
                    <>
                      <CalcResultItem icon="💵" label="Gross Income" value={annualIncome} color={colors.primary.indigo} />
                      <CalcResultItem icon="🏛️" label="Federal Tax" value={Math.round(federalTax)} color={colors.status.error} isNegative />
                      <CalcResultItem icon="🏠" label="State Tax" value={Math.round(stateTax)} color={colors.status.error} isNegative />
                      <CalcResultItem icon="🔒" label="FICA" value={Math.round(ficaTax)} color={colors.status.error} isNegative />
                      <CalcResultItem icon="💰" label="Net Income" value={Math.round(netAnnualIncome)} color={colors.status.success} isTotal />
                      <CalcResultItem icon="💸" label="Annual Expenses" value={totalMonthlyExpenses * 12} color={colors.primary.pink} isNegative />
                      <CalcResultItem icon="🎯" label="Annual Savings" value={monthlySavings * 12} color={monthlySavings >= 0 ? colors.status.success : colors.status.error} isTotal />
                    </>
                  )}
                  
                  {calcTab === 'hidden' && (
                    <>
                      <CalcResultItem icon="🏛️" label="Property Tax" value={propertyTax} color={colors.primary.amber} />
                      <CalcResultItem icon="🏢" label="HOA Fees" value={hoaFees} color={colors.primary.orange} />
                      <CalcResultItem icon="🔧" label="Maintenance" value={homeMaintenance} color={colors.primary.teal} />
                      <CalcResultItem icon="💳" label="Bank Fees" value={bankFees} color={colors.primary.pink} />
                      <CalcResultItem icon="📺" label="Subscriptions" value={gymCost + streamingCost} color={colors.primary.purple} />
                      <CalcResultItem icon="💼" label="401(k)" value={retirement401k} color={colors.primary.indigo} />
                      <CalcResultItem icon="🏦" label="Emergency Fund" value={emergencySavings} color={colors.status.success} />
                      <CalcResultItem icon="👁️" label="Total Hidden" value={hiddenTotal + savingsTotal} color={colors.primary.orange} isTotal />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* BOTTOM SECTION - TIPS & YEARLY PROJECTION */}
            {/* ============================================ */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginTop: '24px' }}>
              
              {/* Tips Section */}
              <div style={{
                background: colors.background.glass, border: `1px solid ${colors.border.light}`,
                borderRadius: '16px', padding: '20px'
              }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '32px', height: '32px', background: colors.gradients.warning, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>💡</span>
                  Smart Recommendations
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                  {tips.length > 0 ? tips.map((tip, i) => (
                    <TipCard key={i} icon={tip.icon} title={tip.title} description={tip.description} color={tip.color} />
                  )) : (
                    <>
                      <TipCard icon="🎉" title="You're doing great!" description="Your budget is well balanced. Keep up the good work!" color={colors.status.success} />
                      <TipCard icon="📈" title="Consider investing" description="With good savings, explore index funds or retirement accounts." color={colors.primary.indigo} />
                      <TipCard icon="🎯" title="Set bigger goals" description="You could aim for 30%+ savings rate for early retirement." color={colors.primary.purple} />
                    </>
                  )}
                </div>
              </div>

              {/* Yearly Summary Card */}
              <div style={{
                background: colors.gradients.glass, border: `1px solid ${colors.border.light}`,
                borderRadius: '16px', padding: '20px'
              }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📆</span> Long-term Projection
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: colors.background.glass, borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: colors.text.tertiary, textTransform: 'uppercase', marginBottom: '4px' }}>Annual Savings</div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: monthlySavings >= 0 ? colors.status.success : colors.status.error }}>${(monthlySavings * 12).toLocaleString()}</div>
                  </div>
                  <div style={{ background: colors.background.glass, borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: colors.text.tertiary, textTransform: 'uppercase', marginBottom: '4px' }}>5-Year Savings</div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: colors.primary.cyan }}>${(monthlySavings * 60).toLocaleString()}</div>
                  </div>
                  <div style={{ background: colors.background.glass, borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: colors.text.tertiary, textTransform: 'uppercase', marginBottom: '4px' }}>10-Year Potential*</div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: colors.primary.purple }}>${(monthlySavings * 120 * 1.07).toLocaleString()}</div>
                    <div style={{ fontSize: '10px', color: colors.text.muted, marginTop: '4px' }}>*With 7% annual return</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Stats Bar */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px',
              marginTop: '24px', padding: '20px',
              background: colors.background.glass, borderRadius: '14px', border: `1px solid ${colors.border.light}`
            }}>
              <MiniStat icon="💵" label="Gross/Year" value={`$${(annualIncome/1000).toFixed(0)}K`} color={colors.primary.indigo} />
              <MiniStat icon="💸" label="Tax/Year" value={`$${(totalTax/1000).toFixed(0)}K`} color={colors.status.error} />
              <MiniStat icon="🏠" label="Housing %" value={((housingTotal/monthlyNetIncome)*100).toFixed(0)} suffix="%" color={colors.primary.pink} />
              <MiniStat icon="🍔" label="Food %" value={((foodTotal/monthlyNetIncome)*100).toFixed(0)} suffix="%" color={colors.primary.orange} />
              <MiniStat icon="💰" label="Saved/Year" value={`$${(monthlySavings*12/1000).toFixed(0)}K`} color={colors.status.success} />
              <MiniStat icon="🎯" label="Goal" value={savingsPercentage >= 20 ? '✓' : `${(20-savingsPercentage).toFixed(0)}% more`} color={savingsPercentage >= 20 ? colors.status.success : colors.status.warning} />
            </div>

          </div>
        </div>
      </section>

      {/* Role Filter Pills */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', padding: '0 20px 50px', flexWrap: 'wrap', position: 'relative', zIndex: 10 }}>
        {uniqueRoles.slice(0, 6).map((role) => (
          <button key={role} onClick={() => setSelectedRole(role)} style={{
            padding: '12px 24px', borderRadius: '50px',
            border: selectedRole === role ? '2px solid transparent' : `2px solid ${colors.border.light}`,
            background: selectedRole === role ? colors.gradients.primary : colors.background.glass,
            color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
            transition: 'all 0.3s ease', backdropFilter: 'blur(10px)',
          }}>
            {role === 'all' ? '🎯 All Roles' : role}
          </button>
        ))}
      </div>

      {/* Cards Section */}
      <main style={{ padding: '60px 20px 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>🔥 Top Cities for AI Talent</h2>
            <p style={{ color: colors.text.secondary }}>
              Showing <span style={{ color: colors.primary.indigoLight, fontWeight: '600' }}>{filteredData.length}</span> cities
            </p>
          </div>

          {!mounted ? (
            <div style={{ textAlign: 'center', padding: '100px' }}>
              <div style={{ width: '60px', height: '60px', margin: '0 auto', border: `4px solid ${colors.primary.indigo}33`, borderTopColor: colors.primary.indigo, borderRadius: '50%', animation: 'spin 1s linear infinite' }}/>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
              {filteredData.map((item, index) => {
                const savings = item.salary - item.rent - 800;
                return (
                  <Link key={index} href={`/salary/${item.city.toLowerCase().replace(/ /g, '-').replace(/,/g, '')}/${item.role.toLowerCase().replace(/ /g, '-')}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: colors.background.card, backdropFilter: 'blur(20px)',
                      borderRadius: '24px', padding: '28px', border: `1px solid ${colors.border.lighter}`,
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      cursor: 'pointer', position: 'relative', overflow: 'hidden', height: '100%'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 30px 60px ${colors.primary.indigo}4D`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{
                        position: 'absolute', top: '20px', right: '20px',
                        background: getRoleBadgeColor(item.role), color: 'white',
                        padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase'
                      }}>{item.role.split(' ')[0]}</div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '36px' }}>{item.flag}</span>
                        <div>
                          <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'white', marginBottom: '2px' }}>{item.city.split(',')[0]}</h3>
                          <span style={{ color: colors.text.tertiary, fontSize: '14px' }}>{item.city.split(',')[1] || ''}</span>
                        </div>
                      </div>

                      <p style={{ color: colors.text.secondary, fontSize: '14px', marginBottom: '24px' }}>{item.role}</p>

                      <div style={{
                        fontSize: '42px', fontWeight: '900',
                        background: `linear-gradient(135deg, #fff 0%, ${colors.primary.indigoLight} 100%)`,
                        backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        marginBottom: '24px', lineHeight: 1
                      }}>${item.salary.toLocaleString()}<span style={{ fontSize: '16px', opacity: 0.7 }}>/mo</span></div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', paddingTop: '20px', borderTop: `1px solid ${colors.border.light}` }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', color: colors.text.tertiary, marginBottom: '6px', textTransform: 'uppercase' }}>🏠 Rent</div>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: colors.primary.pinkLight }}>${item.rent.toLocaleString()}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', color: colors.text.tertiary, marginBottom: '6px', textTransform: 'uppercase' }}>💰 Save</div>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: savings > 3000 ? colors.status.success : colors.status.warning }}>+${savings.toLocaleString()}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', color: colors.text.tertiary, marginBottom: '6px', textTransform: 'uppercase' }}>📶 Speed</div>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: colors.primary.cyanLight }}>{item.internet_speed.split(' ')[0]}</div>
                        </div>
                      </div>

                      <div style={{
                        position: 'absolute', bottom: '20px', right: '20px',
                        width: '40px', height: '40px', background: colors.gradients.primary,
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: 0.7, color: 'white', fontSize: '16px'
                      }}>→</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)', padding: '80px 20px 40px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', background: colors.gradients.primary, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🌍</div>
              <span style={{ color: 'white', fontSize: '24px', fontWeight: '800' }}>AI Salary Map</span>
            </div>
            <p style={{ color: colors.text.secondary, lineHeight: '1.8', fontSize: '14px' }}>The most comprehensive salary database for AI professionals worldwide.</p>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>🔗 Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.5' }}>
              {['Home', 'About', 'Privacy', 'Contact'].map(link => <li key={link}><a href="#" style={{ color: colors.text.secondary, textDecoration: 'none', fontSize: '14px' }}>{link}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>🌆 Top Cities</h4>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.5' }}>
              {['San Francisco', 'Dubai', 'Singapore', 'London'].map(city => <li key={city}><a href="#" style={{ color: colors.text.secondary, textDecoration: 'none', fontSize: '14px' }}>{city}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>📬 Stay Updated</h4>
            <p style={{ color: colors.text.secondary, fontSize: '14px', marginBottom: '16px' }}>Get weekly salary insights</p>
            <div style={{ display: 'flex', background: colors.background.glassStrong, borderRadius: '12px', padding: '4px', border: `1px solid ${colors.border.light}` }}>
              <input type="email" placeholder="your@email.com" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: '12px', color: 'white', fontSize: '14px' }} />
              <button style={{ background: colors.gradients.primary, border: 'none', padding: '12px 20px', borderRadius: '10px', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Subscribe</button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '60px', paddingTop: '30px', borderTop: `1px solid ${colors.border.light}`, textAlign: 'center', fontSize: '13px', color: colors.text.muted }}>
          <p>© 2026 AI Salary Map. Made with 💜 for AI professionals worldwide.</p>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: ${colors.primary.indigo}4D; color: white; }
        input::placeholder { color: ${colors.text.muted}; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: ${colors.background.dark}; }
        ::-webkit-scrollbar-thumb { background: ${colors.primary.indigo}66; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: ${colors.primary.indigo}; }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(-5deg); } 50% { transform: translateY(-15px) rotate(-5deg); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.1); opacity: 0.6; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes floatParticle { 0% { transform: translateY(0) rotate(0deg); opacity: 0; } 10% { opacity: 0.3; } 90% { opacity: 0.3; } 100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; } }
        input:focus, button:focus, select:focus { outline: 2px solid ${colors.primary.indigo}; outline-offset: 2px; }
        input[type="range"] { -webkit-appearance: none; appearance: none; cursor: pointer; background: ${colors.border.light}; border-radius: 4px; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: white; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.3); border: 2px solid ${colors.primary.indigo}; }
        select option { background: #1a1a2e; color: white; }
      `}</style>
    </div>
  );
}