import { Box } from '@material-ui/core'
import React from 'react'

export interface LabelIconProps {
  icon: JSX.Element
  bgColor?: string
}

export const LabelIcon = ({ icon, bgColor }: LabelIconProps) => {
  return (
    <Box
      bgcolor={bgColor}
      borderRadius={3}
      width={25}
      height={25}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      {icon}
    </Box>
  )
}
