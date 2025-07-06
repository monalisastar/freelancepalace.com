'use client';

import React, { useMemo } from 'react';
import ParticlesComponent from './ParticlesWrapper';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, ISourceOptions } from '@tsparticles/engine';

export default function AnimatedBackground() {
  const particlesInit = async (engine: Engine) => {
    console.log('✅ Particles initialized');
    await loadSlim(engine);
  };

  const options: ISourceOptions = useMemo(() => ({
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    background: {
      color: { value: '#0f0f0f' },
    },
    particles: {
      number: {
        value: 160,
        density: { enable: true, area: 800 },
      },
      color: {
        value: ['#ffffff', '#ffd700', '#00ffff', '#a855f7'],
      },
      shape: { type: 'circle' },
      opacity: { value: 0.8, random: true },
      size: { value: { min: 3, max: 8 }, random: true },
      move: {
        enable: true,
        speed: 1.5,
        direction: 'none' as const,
        outModes: { default: 'bounce' },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        repulse: { distance: 80, duration: 0.4 },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  }), []);

  return (
    <ParticlesComponent id="tsparticles" particlesInit={particlesInit} options={options} />
  );
}








