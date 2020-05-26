// @flow
import React from 'react';
import type { Node } from 'react';
import { Paper, Box, Grid, Typography, Button } from '@material-ui/core';
import type { Dso } from 'context/dso/types';
import OfferDetail from './OfferDetail';
import DsoTitle from './DsoTitle';

const SectionContainer = ({
  children,
  title,
}: {
  children: Node,
  title?: string,
}) => (
  <Box py={2} px={4} border={1} borderColor="#eaeaea" height="100%">
    {title && (
      <Box mt={2}>
        <Typography>
          <b>{title}</b>
        </Typography>
      </Box>
    )}
    <Box mt={2}>{children}</Box>
  </Box>
);

const OfferingTermItem = ({
  label,
  value,
}: {
  label: string,
  value: string,
}) => (
  <Grid container item xs={4} spacing={2}>
    <Grid item>
      <Typography>{label}:</Typography>
    </Grid>
    <Grid item>
      <Typography>{value}</Typography>
    </Grid>
  </Grid>
);

const OfferInformation = ({
  dso,
  headerButtonText,
  headerButtonAction,
}: {
  dso: Dso,
  headerButtonText?: string,
  headerButtonAction?: Function,
}) => (
  <Paper>
    <Box p={4}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <DsoTitle issuerName={dso.issuerName} tokenSymbol={dso.tokenSymbol} />
        </Grid>

        {headerButtonAction && headerButtonText && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={headerButtonAction}
            >
              {headerButtonText}
            </Button>
          </Grid>
        )}
      </Grid>
      <Box mt={4}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <SectionContainer title="Introduction">
              <Typography paragraph>{dso.description}</Typography>
            </SectionContainer>
          </Grid>

          <Grid item xs={4}>
            <SectionContainer>
              <OfferDetail label="Status" value={dso.status} />
              <OfferDetail
                label="Capital Structure"
                value={dso.capitalStructure}
              />
              <OfferDetail label="Unit Price" value={dso.pricePerToken} />
              <OfferDetail
                label="Total Fundraising Amount"
                value={dso.totalFundraisingAmount}
              />
              <OfferDetail
                label="Minimum Investment"
                value={dso.minimumCommittment}
              />
            </SectionContainer>
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <SectionContainer title="Offering Terms">
          <Grid container spacing={2}>
            <OfferingTermItem
              label="Investment Period"
              value={dso.investmentPeriod}
            />
            <OfferingTermItem label="Divident Yield" value="-" />
            <OfferingTermItem label="Gross IRR" value="-" />

            <OfferingTermItem
              label="Investment Structure"
              value={dso.investmentStructure}
            />
            <OfferingTermItem label="Equity Multiple" value="-" />
            <OfferingTermItem label="Distribution Frequency" value="-" />

            <OfferingTermItem
              label="Capital Structure"
              value={dso.capitalStructure}
            />
            <OfferingTermItem label="Interest Rate" value="-" />
            <OfferingTermItem label="Leverage" value="-" />
          </Grid>
        </SectionContainer>
      </Box>

      <Box mt={4}>
        <SectionContainer title="Business Model">
          <Typography>
            <span dangerouslySetInnerHTML={{ __html: '-' }} />
          </Typography>
        </SectionContainer>
      </Box>

      <Box mt={4}>
        <SectionContainer title="Token Address">-</SectionContainer>
      </Box>

      <Box mt={4}>
        <SectionContainer title="Use of Proceeds">
          <Typography>
            <span dangerouslySetInnerHTML={{ __html: '-' }} />
          </Typography>
        </SectionContainer>
      </Box>

      <Box mt={4}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <SectionContainer title="Dataroom">asdasd</SectionContainer>
          </Grid>
          <Grid item xs={6}>
            <SectionContainer title="Fund Raising Milestone">
              <Typography>
                <span
                  dangerouslySetInnerHTML={{
                    __html: dso.investmentHighlights,
                  }}
                />
              </Typography>
            </SectionContainer>
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <SectionContainer title="Team">-</SectionContainer>
      </Box>
    </Box>
  </Paper>
);

export default OfferInformation;
