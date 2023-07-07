import React from 'react'
import { Grid } from '@mui/material'
import { InternalRouteProps } from 'types/util'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
// import { DataCard } from 'app/components/LandingPage/DataCard'
import { LandingPageItem } from './LandingPageItem'

export interface LandingPageProps extends Partial<InternalRouteProps> {
  title?: string
  links: InternalRouteProps[]
}

export const AuthorizerLandingPage = (props: LandingPageProps) => {
  const { links, title } = props

  return (
    <>
      <PageHeader title={title} showBreadcrumbs={false} />
      <RootContainer>
        <Grid item container justifyContent='center' alignItems='flex-start'>
          {links.map((link, index) => (
            <LandingPageItem key={index} link={link} />
          ))}
        </Grid>
      </RootContainer>
    </>
  )
}
