// @flow
import React from 'react';
import { Paper, Grid, Box, Typography, Button } from '@material-ui/core';
import type { Dso } from 'context/dso/types';
import OfferDetail from './OfferDetail';
import DsoTitle from './DsoTitle';

const OfferCard = ({
  dso,
  onClickView,
}: {
  dso: Dso,
  onClickView: Function,
}) => (
  <Paper>
    <Box px={4} pt={2} pb={4}>
      <Grid container justify="space-between">
        <Grid item container xs={9} justify="space-between" direction="column">
          <Box pt={1}>
            <DsoTitle
              tokenSymbol={dso.tokenSymbol}
              issuerName={dso.issuerName}
            />

            <Box mt={4}>
              <Typography paragraph>
                <span
                  dangerouslySetInnerHTML={{
                    __html: dso.description,
                  }}
                />
              </Typography>
            </Box>
          </Box>

          <Button
            style={{ width: '120px' }}
            variant="contained"
            color="primary"
            onClick={onClickView}
          >
            View
          </Button>
        </Grid>
        <Grid item xs={3}>
          <OfferDetail label="Status" value={dso.status} />
          <OfferDetail label="Capital Structure" value={dso.capitalStructure} />
          <OfferDetail label="Unit Price" value={dso.pricePerToken} />
          <OfferDetail
            label="Total Fundraising Amount"
            value={dso.totalFundraisingAmount}
          />
          <OfferDetail
            label="Minimum Investment"
            value={dso.minimumCommittment}
          />
        </Grid>
      </Grid>
    </Box>
  </Paper>
);

export default OfferCard;
