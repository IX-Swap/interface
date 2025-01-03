'use client'

import liff from '@line/liff'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface LiffContextType {
  liffObject: typeof liff | null
  liffError: string | null
}

const LiffContext = createContext<LiffContextType | undefined>(undefined)

interface LiffProviderProps {
  children: ReactNode
}

export const LiffProvider: React.FC<LiffProviderProps> = ({ children }) => {
  const [liffObject, setLiffObject] = useState<typeof liff | null>(null)
  const [liffError, setLiffError] = useState<string | null>(null)

  useEffect(() => {
    liff
      .init({ liffId: '2006732958-EAK9vggN' })
      .then(() => {
        console.log('LIFF initialization is done')
        setLiffObject(liff)
        console.log(liff.getAppLanguage())
        console.log(liff.getVersion())
        console.log(liff.isInClient())
        console.log(liff.isLoggedIn())
        console.log(liff.getOS())
        console.log(liff.getLineVersion())
      })
      .catch((error: any) => {
        console.error(`LIFF initialization failed: ${error}`)
        setLiffError(error.toString())
      })
  }, [])

  return <LiffContext.Provider value={{ liffObject, liffError }}>{children}</LiffContext.Provider>
}

export const useLiff = () => {
  const context = useContext(LiffContext)
  if (!context) {
    throw new Error('useLiff must be used within a LiffProvider')
  }
  return context
}
