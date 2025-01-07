'use client'

import liff from '@line/liff'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface LiffContextType {}

const LiffContext = createContext<LiffContextType | undefined>(undefined)

interface LiffProviderProps {
  children: ReactNode
}

export const LiffProvider: React.FC<LiffProviderProps> = ({ children }) => {
  useEffect(() => {
    liff
      .init({ liffId: '2006746651-DmRwZed0' })
      .then(() => {
        console.log('LIFF initialization is done')
        // console.log(liff.getAppLanguage())
        console.log(liff.getVersion())
        console.log(liff.isInClient())
        console.log(liff.isLoggedIn())
        console.log(liff.getOS())
        console.log(liff.getLineVersion())
      })
      .catch((error: any) => {
        console.error(`LIFF initialization failed: ${error}`)
      })
  }, [])

  return <LiffContext.Provider value={{}}>{children}</LiffContext.Provider>
}

export const useLiff = () => {
  const context = useContext(LiffContext)
  if (!context) {
    throw new Error('useLiff must be used within a LiffProvider')
  }
  return context
}
