import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { ReactComponent as Card } from 'assets/images/card.svg'
import { useStyles } from 'app/pages/accounts/components/VirtualAccountCard/VirtualAccountCard.styles'

export interface VirtualAccountCardProps {
  label: string
  info: React.ReactNode
}

export const VirtualAccountCard = ({
  label,
  info
}: VirtualAccountCardProps) => {
  const { container, infoContainer, labelContainer, labelText } = useStyles()

  return (
    <Box className={container}>
      <Box className={infoContainer}>{info}</Box>
      <Box className={labelContainer}>
        <Typography className={labelText}>{label}</Typography>
      </Box>
      <Card />
    </Box>
  )
}
