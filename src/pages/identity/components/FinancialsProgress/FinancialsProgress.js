import React from 'react'
import Progress from '../Progress/Progress'

export default function FinancialsProgress ({ activeStep, completed }) {
  return (
    <Progress steps={['Occupation', 'Bank Account', 'Income']} activeStep={activeStep} completed={completed} />
  )
}
