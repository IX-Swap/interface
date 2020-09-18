import React from 'react'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { Paper, Box, Typography, Button, Grid } from '@material-ui/core'
import { DSOTitle } from 'v2/app/components/DSO/DSOTitle'
import { DSODetails } from 'v2/app/components/DSO/components/DSODetails'
import { Asset } from 'v2/types/asset'
import { useInvestRouter } from 'v2/app/pages/invest/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'

export interface DSOfferingCardProps {
  dso: DigitalSecurityOffering
}

export const DSOCard = (props: DSOfferingCardProps) => {
  const { dso } = props
  const { routes } = useInvestRouter()

  return (
    <Paper>
      <Box px={4} pt={2} pb={4}>
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
                to={routes.offeringView}
                params={{ offeringId: dso._id, issuerId: dso.user }}
              >
                View
              </AppRouterLink>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <DSODetails dso={dso} currency={dso.currency[0] as Asset} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}
