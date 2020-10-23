import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { LandingPageItem } from './LandingPageItem'
import { InternalRouteProps } from 'v2/types/util'
import { AuthorizerRoute } from 'v2/app/pages/authorizer/router'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'
import { useLocation } from 'react-router-dom'

export interface LandingPageProps extends InternalRouteProps {
  links: InternalRouteProps[]
}

export const LandingPage = (props: LandingPageProps) => {
  const { pathname } = useLocation()
  const { links } = props

  if (pathname === AuthorizerRoute.landing) {
    return (
      <Container>
        <PageHeader />
        <Grid item container justify='center' alignItems='flex-start'>
          {links.map((link, index) => (
            <LandingPageItem key={index} link={link} />
          ))}
        </Grid>
      </Container>
    )
  }

  return (
    <Grid item container justify='center' alignItems='flex-start'>
      {links.map((link, index) => (
        <LandingPageItem key={index} link={link} />
      ))}
    </Grid>
  )
}
