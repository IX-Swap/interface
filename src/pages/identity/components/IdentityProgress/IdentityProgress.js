import React from 'react'
import Progress from '../Progress/Progress'

export default function IdentityProgress ({ activeStep, completed }) {
  return (
    <Progress steps={['Personal', 'Address', 'Documents']} activeStep={activeStep} completed={completed} />
  )
}
