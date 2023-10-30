import React from 'react'
import { Typography, Box } from '@mui/material'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'

interface StatsProps {
  title: string
  description: string
  stats: string | number
  increase: string | number
}

export const Stats = ({ title, description, stats, increase }: StatsProps) => {
  return (
    <FieldContainer>
      <Typography variant='h5' color={'otpInput.color'}>
        {title}
      </Typography>
      <Typography color={'text.secondary'} mt={2}>
        {description}
      </Typography>
      <Typography
        variant='h1'
        color={'primary'}
        textAlign={'right'}
        fontWeight={'bold'}
        mt={2}
      >
        {stats}
      </Typography>
      <Box display={'flex'} justifyContent={'end'} gap={0.5} mt={1}>
        <Typography color={'#6ABC10'} fontWeight={'bold'}>
          +{increase}
        </Typography>
        <Typography color={'text.secondary'}>since last week</Typography>
      </Box>
    </FieldContainer>
  )
}
