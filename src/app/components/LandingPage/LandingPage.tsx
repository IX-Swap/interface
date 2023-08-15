import React from 'react'
import { Grid, Box } from '@mui/material'
import { LandingPageItem } from './LandingPageItem'
import { InternalRouteProps } from 'types/util'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { useTheme } from '@mui/material/styles'

export interface LandingPageProps extends Partial<InternalRouteProps> {
  title?: string
  links: InternalRouteProps[]
}

export const LandingPage = (props: LandingPageProps) => {
  const { links, title } = props
  const theme = useTheme()

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader
          title={title}
          alignment='center'
          showBreadcrumbs={false}
          titleWrapperStyle={{ paddingTop: '15px' }}
        />
        <RootContainer>
          <Box
            sx={{
              backgroundColor: theme.palette.backgrounds.light,
              borderRadius: 3
            }}
          >
            <Grid
              item
              container
              justifyContent='center'
              alignItems='flex-start'
            >
              {links.map((link, index) => (
                <LandingPageItem key={index} link={link} />
              ))}
            </Grid>
          </Box>
        </RootContainer>
      </Grid>
    </Grid>
  )
}
