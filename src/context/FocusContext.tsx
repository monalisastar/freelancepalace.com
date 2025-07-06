"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// ✅ Updated FocusType to match Hero.tsx usage
export type FocusType = 'default' | 'web3' | 'ai' | 'climate' | 'ethics' | 'creative';

interface FocusContextType {
  focus: FocusType;
  setFocus: (focus: FocusType) => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider = ({ children }: { children: ReactNode }) => {
  const [focus, setFocus] = useState<FocusType>('default');

  return (
    <FocusContext.Provider value={{ focus, setFocus }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useFocus must be used within a FocusProvider');
  }
  return context;
};

