import React from 'react'
import { Grid } from '@mui/material'
import { LandingPageItem } from './LandingPageItem'
import { InternalRouteProps } from 'types/util'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export interface LandingPageProps extends Partial<InternalRouteProps> {
  title?: string
  links: InternalRouteProps[]
}

export const LandingPage = (props: LandingPageProps) => {
  const { links, title } = props

  return (
    <>
      <PageHeader title={title} alignment='center' showBreadcrumbs={false} />
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
