import React from 'react'
import { Grid } from '@material-ui/core'
import { InternalRouteProps } from 'types/util'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { DataCard } from 'app/components/LandingPage/DataCard'

export interface LandingPageProps extends Partial<InternalRouteProps> {
  title?: string
  links: InternalRouteProps[]
}

export const AuthorizerLandingPage = (props: LandingPageProps) => {
  const { links, title } = props

  return (
    <RootContainer>
      <PageHeader title={title} showBreadcrumbs={false} />
      <Grid container justify='center' alignItems='flex-start' spacing={3}>
        {links.map((link, index) => (
          <Grid item key={index}>
            <DataCard link={link} variant={index % 5} />
          </Grid>
        ))}
      </Grid>
    </RootContainer>
  )
}
