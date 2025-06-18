import React, { useEffect, useState } from 'react';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Dynamic cursor-following gradient overlay */}
      <div 
        className="absolute inset-0 opacity-60 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(147, 51, 234, 0.4) 0%, 
            rgba(59, 130, 246, 0.3) 25%, 
            rgba(16, 185, 129, 0.2) 50%, 
            rgba(245, 101, 101, 0.1) 75%, 
            transparent 100%)`
        }}
      ></div>

      {/* Secondary cursor-following layer with different colors */}
      <div 
        className="absolute inset-0 opacity-40 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, 
            rgba(236, 72, 153, 0.3) 0%, 
            rgba(168, 85, 247, 0.25) 30%, 
            rgba(14, 165, 233, 0.2) 60%, 
            transparent 100%)`
        }}
      ></div>

      {/* Animated floating orbs with enhanced colors */}
      <div 
        className="absolute w-96 h-96 rounded-full blur-3xl animate-float opacity-30 transition-all duration-1000"
        style={{
          background: 'linear-gradient(45deg, #8b5cf6, #06b6d4)',
          left: `${20 + mousePosition.x * 0.1}%`,
          top: `${10 + mousePosition.y * 0.05}%`,
        }}
      ></div>
      
      <div 
        className="absolute w-80 h-80 rounded-full blur-3xl animate-float-delay opacity-25 transition-all duration-1200"
        style={{
          background: 'linear-gradient(135deg, #ec4899, #f59e0b)',
          right: `${15 + mousePosition.x * 0.08}%`,
          bottom: `${20 + mousePosition.y * 0.06}%`,
        }}
      ></div>
      
      <div 
        className="absolute w-72 h-72 rounded-full blur-3xl animate-pulse opacity-20 transition-all duration-800"
        style={{
          background: 'linear-gradient(225deg, #10b981, #3b82f6)',
          left: `${60 + mousePosition.x * 0.12}%`,
          top: `${40 + mousePosition.y * 0.08}%`,
        }}
      ></div>

      {/* Additional smaller orbs for more detail */}
      <div 
        className="absolute w-64 h-64 rounded-full blur-2xl animate-bounce-slow opacity-15 transition-all duration-900"
        style={{
          background: 'linear-gradient(315deg, #f97316, #ef4444)',
          right: `${40 + mousePosition.x * 0.07}%`,
          top: `${60 + mousePosition.y * 0.04}%`,
        }}
      ></div>
      
      <div 
        className="absolute w-56 h-56 rounded-full blur-2xl animate-spin-slow opacity-18 transition-all duration-1100"
        style={{
          background: 'linear-gradient(180deg, #6366f1, #8b5cf6)',
          left: `${80 + mousePosition.x * 0.09}%`,
          bottom: `${40 + mousePosition.y * 0.05}%`,
        }}
      ></div>

      {/* Interactive light streaks */}
      <div 
        className="absolute inset-0 opacity-10 transition-all duration-500"
        style={{
          background: `conic-gradient(from ${mousePosition.x * 3.6}deg at ${mousePosition.x}% ${mousePosition.y}%, 
            transparent 0deg, 
            rgba(147, 51, 234, 0.5) 60deg, 
            transparent 120deg, 
            rgba(59, 130, 246, 0.4) 180deg, 
            transparent 240deg, 
            rgba(16, 185, 129, 0.3) 300deg, 
            transparent 360deg)`
        }}
      ></div>
      
      
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-noise"></div>
    </div>
  );
}

