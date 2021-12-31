import { Box } from '@material-ui/core'
import React from 'react'
import Card from 'assets/images/card.svg'
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
