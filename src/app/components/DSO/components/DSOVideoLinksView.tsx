import React from 'react'
import { Grid, Typography, Alert } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import ReactPlayer from 'react-player/lazy'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'

export interface DSOVideoLinksViewProps {
  dso: DigitalSecurityOffering
}

export const DSOVideoLinksView = ({ dso }: DSOVideoLinksViewProps) => {
  return (
    <Grid container direction='column' spacing={3}>
      <FieldContainer>
        <Grid container spacing={5}>
          {dso.videos.map(item => (
            <Grid item xs={12} key={item.title}>
              {ReactPlayer.canPlay(item.link as string) ? (
                <ReactPlayer
                  width='100%'
                  height={434}
                  style={{
                    borderRadius: 8,
                    overflow: 'hidden'
                  }}
                  url={item.link}
                />
              ) : (
                <Alert variant='filled' severity='error'>
                  Invalid Video URL
                </Alert>
              )}

              <Typography variant='h5' sx={{ mt: 2 }}>
                {item.title}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
