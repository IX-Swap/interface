import React from 'react'
import { Dso } from '../../../../types/dso'
import { Paper, Box, Typography, Button, Grid } from '@material-ui/core'
import DsoTitle from './title'
import OfferDetails from './components/offer-details'

const DsoOfferingCard = ({ dso, onClickView }: {dso: Dso, onClickView: (dso: Dso) => void }) => {
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
              <DsoTitle
                dso={dso}
              />

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
            <OfferDetails dso={dso} currency={dso.currency[0]} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default DsoOfferingCard
