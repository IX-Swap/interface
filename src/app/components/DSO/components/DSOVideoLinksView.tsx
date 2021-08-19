import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { DigitalSecurityOffering, DsoVideoLink } from 'types/dso'
import ReactPlayer from 'react-player/lazy'
import { VSpacer } from 'components/VSpacer'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export interface DSOVideoLinksViewProps {
  dso: DigitalSecurityOffering
  isTitleVisible?: boolean
}

export const DSOVideoLinksView = (props: DSOVideoLinksViewProps) => {
  const { dso, isTitleVisible = false } = props

  const fakeVideoLinks: DsoVideoLink[] = [
    {
      title: 'Title 1',
      link: 'https://www.youtube.com/watch?v=6tE1bl4GnzE'
    },
    {
      title: 'Title 1',
      link: 'https://www.youtube.com/watch?v=6tE1bl4GnzE'
    },
    {
      title: 'Title 1',
      link: 'https://www.youtube.com/watch?v=6tE1bl4GnzE'
    }
  ]

  const realVideoLinks =
    dso.videoLinks !== undefined ? dso.videoLinks : fakeVideoLinks

  return (
    <Grid container direction='column' spacing={5}>
      {isTitleVisible && (
        <Grid item>
          <FormSectionHeader title='FAQ' />
        </Grid>
      )}
      {realVideoLinks.map((item, i) => {
        return (
          <Grid item>
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
