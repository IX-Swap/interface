import React from 'react'
import Progress from '../Progress/Progress'

export default function AccreditationProgress ({ activeStep, completed }) {
  return (
    <Progress steps={['Self-Accreditation', 'Declarations', 'Proof of Wealth']} activeStep={activeStep} completed={completed} />
  )
}
