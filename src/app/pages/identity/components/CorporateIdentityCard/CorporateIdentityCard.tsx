import { Grid, Typography, Paper } from '@mui/material'
import React, { useState } from 'react'

export interface CorporateIdentityCardProps {
  title: string
  description?: string
  actionButton?: React.ReactComponentElement<any>
  image?: React.ReactComponentElement<any>
}

export const CorporateIdentityCard = ({
  title,
  description,
  actionButton,
  image
}: CorporateIdentityCardProps) => {
  const [raised, setRaised] = useState(false)
  const handleMouseEnter = () => {
    setRaised(true)
  }
  const handleMouseLeave = () => {
    setRaised(false)
  }

  return (
    <Paper
      elevation={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        pb: 6,
        pt: 3,
        px: 5,
        boxShadow: raised ? '0px 32px 64px rgba(59, 66, 81, 0.08)' : 'none',
        maxWidth: 400
      }}
    >
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        {image !== undefined && (
          <Grid item xs={12} container justifyContent='center'>
            {image}
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant='h5' align='center'>
            {title}
          </Typography>
        </Grid>
        {description !== undefined && (
          <Grid item xs={12}>
            <Typography
              variant='body1'
              align='center'
              sx={{
                px: {
                  xs: 0,
                  lg: 6
                }
              }}
            >
              {description}
            </Typography>
          </Grid>
        )}
        {actionButton !== undefined && (
          <Grid item xs={12}>
            {actionButton}
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}
