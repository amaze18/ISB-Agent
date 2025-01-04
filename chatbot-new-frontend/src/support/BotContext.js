// src/support/BotContext.js
"use client";
import { createContext, useContext, useState } from 'react';

const BotContext = createContext();

export function BotProvider({ children }) {
  const [selectedBotId, setSelectedBotId] = useState('delhi_mentor_male'); // Default bot

  return (
    <BotContext.Provider value={{ selectedBotId, setSelectedBotId }}>
      {children}
    </BotContext.Provider>
  );
}

export function useBot() {
  return useContext(BotContext);
}