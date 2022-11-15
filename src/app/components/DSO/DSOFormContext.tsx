import React, { createContext, useContext, useState } from 'react'

interface Step {
  values: any
  errors: any
}

interface DSOFormContextInterface {
  stepValues: Step[]
  setStepValues: any
}

const DSOFormContext = createContext<DSOFormContextInterface | null>(null)

export const DSOFormContextWrapper: React.FC = ({ children }) => {
  const [stepValues, setStepValues] = useState([])

  return (
    <DSOFormContext.Provider value={{ stepValues, setStepValues }}>
      {children}
    </DSOFormContext.Provider>
  )
}

export const useDSOFormContext = () => {
  const DSOForm = useContext(DSOFormContext)

  if (DSOForm === undefined) {
    throw new Error(
      'useDSOFormContext must be used inside of DSOFormContext component'
    )
  }

  return DSOForm as DSOFormContextInterface
}
