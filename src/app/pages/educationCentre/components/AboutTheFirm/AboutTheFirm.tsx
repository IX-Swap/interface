import { Typography } from '@material-ui/core'
import { Security } from 'app/pages/educationCentre/components/Securities/SecurityCard'
import React from 'react'

export interface AboutTheFirmProps {
  data: Security
}

export const AboutTheFirm = ({ data }: AboutTheFirmProps) => {
  return <Typography>{data.description}</Typography>
}
