import React from 'react'
import { Grid } from '@material-ui/core'
import { LandingPageItem } from './LandingPageItem'
import { InternalRouteProps } from 'v2/types/util'

export interface LandingPageProps extends InternalRouteProps {
  links: InternalRouteProps[]
}

export const LandingPage = (props: LandingPageProps) => {
  const { links } = props

  return (
    <Grid item container justify='center' alignItems='flex-start'>
      {links.map((link, index) => (
        <LandingPageItem key={index} link={link} />
      ))}
    </Grid>
  )
}
