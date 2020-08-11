//
import React from 'react'
import { Paper, Grid, Box, Typography, Button } from '@material-ui/core'

import { formatMoney } from 'helpers/formatNumbers'
import OfferDetail from '../OfferDetail'
import DsoTitle from '../DsoTitle'

const OfferCard = ({ dso, onClickView }) => {
  const currency = dso.currency.length ? dso.currency[0] : {}

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
                tokenSymbol={dso.tokenSymbol}
                issuerName={dso.issuerName}
                documents={dso.documents}
                logo={(dso || {}).logo}
                dsoId={(dso || {})._id}
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
              onClick={onClickView}
            >
              View
            </Button>
          </Grid>
          <Grid item xs={3}>
            <OfferDetail label='Status' value={dso.status} />
            <OfferDetail
              label='Capital Structure'
              value={dso.capitalStructure}
            />
            <OfferDetail
              label='Unit Price'
              value={formatMoney(dso.pricePerUnit, currency.symbol)}
            />
            <OfferDetail
              label='Total Fundraising Amount'
              value={formatMoney(dso.totalFundraisingAmount, currency.symbol)}
            />
            <OfferDetail
              label='Minimum Investment'
              value={formatMoney(dso.minimumInvestment, dso.tokenSymbol)}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default OfferCard
