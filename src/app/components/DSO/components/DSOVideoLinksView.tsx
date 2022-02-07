import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import ReactPlayer from 'react-player/lazy'
import { VSpacer } from 'components/VSpacer'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export interface DSOVideoLinksViewProps {
  dso: DigitalSecurityOffering
  isTitleVisible?: boolean
}

export const DSOVideoLinksView = (props: DSOVideoLinksViewProps) => {
  const { dso, isTitleVisible = false } = props

  return (
    <Grid container direction='column' spacing={5}>
      {isTitleVisible && (
        <Grid item>
          <FormSectionHeader title='Videos' />
        </Grid>
      )}
      {dso.videos.map(item => {
        return (
          <Grid item key={item.title}>
            <Typography variant={'subtitle1'}>{item.title}</Typography>
            <VSpacer size={'small'} />
            <ReactPlayer width={'100%'} height={434} url={item.link} />
            <VSpacer size={'medium'} />
          </Grid>
        )
      })}
    </Grid>
  )
}
