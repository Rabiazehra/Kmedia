"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessibilityContextType {
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  disableVisualEffects: boolean;
  toggleDisableVisualEffects: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [disableVisualEffects, setDisableVisualEffects] = useState(false);

  const toggleReduceMotion = () => setReduceMotion((prev) => !prev);
  const toggleDisableVisualEffects = () => setDisableVisualEffects((prev) => !prev);

  return (
    <AccessibilityContext.Provider value={{ reduceMotion, toggleReduceMotion, disableVisualEffects, toggleDisableVisualEffects }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}