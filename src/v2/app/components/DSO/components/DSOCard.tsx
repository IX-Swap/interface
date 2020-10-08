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
import { AppRouterLink } from 'v2/components/AppRouterLink'

export interface DSOfferingCardProps {
  dso: DigitalSecurityOffering
  viewURL: string
}

export const DSOCard = (props: DSOfferingCardProps) => {
  const { dso, viewURL } = props

  return (
    <Card>
      <CardContent>
        <Grid container justify='space-between' spacing={2}>
          <Grid
            item
            container
            xs={9}
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
              style={{ width: '120px' }}
              variant='contained'
              color='primary'
            >
              <AppRouterLink
                to={viewURL}
                params={{ dsoId: dso._id, issuerId: dso.user }}
              >
                View
              </AppRouterLink>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <DSODetails
              dso={dso}
              // currency={dso.currency[0] as Asset}
              currency={undefined}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
