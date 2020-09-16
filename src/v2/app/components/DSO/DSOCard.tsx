import React from 'react'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { Paper, Box, Typography, Button, Grid } from '@material-ui/core'
import { DSOTitle } from 'v2/app/components/DSO/DSOTitle'
import { DSODetails } from 'v2/app/components/DSO/components/DSODetails'
import { Asset } from 'v2/types/asset'

export interface DSOfferingCardProps {
  dso: DigitalSecurityOffering
  onClickView: (dso: DigitalSecurityOffering) => void
}

export const DSOCard = (props: DSOfferingCardProps) => {
  const { dso, onClickView } = props

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
              onClick={() => onClickView(dso)}
            >
              View
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
