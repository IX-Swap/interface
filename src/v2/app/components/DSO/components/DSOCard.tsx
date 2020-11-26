import React from 'react'
import { DigitalSecurityOffering } from 'v2/types/dso'
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent
} from '@material-ui/core'
import { DSOTitle } from 'v2/app/components/DSO/components/DSOTitle'
import { DSODetails } from 'v2/app/components/DSO/components/DSODetails'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'

export interface DSOfferingCardProps {
  dso: DigitalSecurityOffering
  viewURL: string
}

export const DSOCard = (props: DSOfferingCardProps) => {
  const { dso, viewURL } = props

  return (
    <Card variant='outlined'>
      <CardContent>
        <Grid container justify='space-between' spacing={2}>
          <Grid
            item
            container
            xs={9}
            alignItems='flex-start'
            justify='space-between'
            direction='column'
          >
            <Box pt={1}>
              <DSOTitle dso={dso} />

              <Box mt={4}>
                <Typography paragraph>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: dso.introduction
                    }}
                  />
                </Typography>
              </Box>
            </Box>

            <Button
              component={AppRouterLinkComponent}
              variant='contained'
              color='primary'
              disableElevation
              to={viewURL}
              params={{ dsoId: dso._id, issuerId: dso.user }}
            >
              View
            </Button>
          </Grid>
          <Grid item xs={3}>
            <DSODetails dso={dso} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
