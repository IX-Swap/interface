'use client'

import liff from '@line/liff'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface LiffContextType {
  isLiffBrowser: boolean
}

const LiffContext = createContext<LiffContextType | undefined>(undefined)

interface LiffProviderProps {
  children: ReactNode
}

export const LiffProvider: React.FC<LiffProviderProps> = ({ children }) => {
  const [isLiffBrowser, setIsLiffBrowser] = useState(false)

  // useEffect(() => {
  //   liff
  //     .init({ liffId: '2006746651-DmRwZed0' })
  //     .then(() => {
  //       console.log('LIFF initialization is done')
  //       // console.log(liff.getAppLanguage())
  //       console.log(liff.getVersion())
  //       console.log(liff.isInClient())
  //       console.log(liff.isLoggedIn())
  //       console.log(liff.getOS())
  //       console.log(liff.getLineVersion())

  //       setIsLiffBrowser(liff.isInClient()) // Set the value of isLiffBrowser
  //     })
  //     .catch((error: any) => {
  //       console.error(`LIFF initialization failed: ${error}`)
  //     })
  // }, [])

  return <LiffContext.Provider value={{ isLiffBrowser }}>{children}</LiffContext.Provider>
}

export const useLiff = () => {
  const context = useContext(LiffContext)
  if (!context) {
    throw new Error('useLiff must be used within a LiffProvider')
  }
  return context
}
