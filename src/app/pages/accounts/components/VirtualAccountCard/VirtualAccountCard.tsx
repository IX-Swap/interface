import { Box } from '@mui/material'
import React from 'react'
import { ReactComponent as Card } from 'assets/images/card.svg'
import { useStyles } from 'app/pages/accounts/components/VirtualAccountCard/VirtualAccountCard.styles'

export interface VirtualAccountCardProps {
  label: string
  info: React.ReactNode
}

export const VirtualAccountCard = ({ info }: VirtualAccountCardProps) => {
  const { container, infoContainer } = useStyles()

  return (
    <Box className={container}>
      <Box className={infoContainer}>{info}</Box>
      <Card />
    </Box>
  )
}
