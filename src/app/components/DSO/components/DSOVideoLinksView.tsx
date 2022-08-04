import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import ReactPlayer from 'react-player/lazy'

export interface DSOVideoLinksViewProps {
  dso: DigitalSecurityOffering
}

export const DSOVideoLinksView = ({ dso }: DSOVideoLinksViewProps) => {
  return (
    <Grid container spacing={3}>
      {dso.videos.map(item => (
        <Grid item xs={12} key={item.title}>
          <ReactPlayer
            width='100%'
            height={434}
            style={{
              borderRadius: 8,
              overflow: 'hidden'
            }}
            url={item.link}
          />
          <Typography variant='h5' sx={{ mt: 1 }}>
            {item.title}
          </Typography>
        </Grid>
      ))}
    </Grid>
  )
}
