'use client';

import React from 'react';
import Particles from '@tsparticles/react';
import type { ISourceOptions, Engine } from '@tsparticles/engine';

type Props = {
  id: string;
  particlesInit: (engine: Engine) => Promise<void>;
  options: ISourceOptions;
};

export default function ParticlesWrapper({ id, particlesInit, options }: Props) {
  return (
    <Particles
      id={id}
      options={options}
      // ⛳️ Safe override here since TS is broken
      {...{ particlesInit } as any}
    />
  );
}

