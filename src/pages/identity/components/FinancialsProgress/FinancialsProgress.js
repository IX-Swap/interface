import React from 'react'
import Progress from '../Progress/Progress'

export default function FinancialsProgress ({ activeStep }) {
  return (
    <Progress steps={['Occupation', 'Bank Account', 'Income']} activeStep={activeStep} />
  )
}
