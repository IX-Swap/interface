// @flow
import React from 'react';
import { useHistory } from 'react-router-dom';
import type { Node } from 'react';
import { Paper, Box, Grid, Typography, Button } from '@material-ui/core';
import type { Dso } from 'context/dso/types';
import { formatMoney, toPercentage } from 'helpers/formatNumbers';
import { useIsIssuer } from 'services/acl';

import OfferDetail from '../OfferDetail';
import DsoTitle from '../DsoTitle';
import TeamMember from './DsoTeamMember';

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

const DsoInformation = ({
  dso,
  headerButtonText,
  headerButtonAction,
  onClickDocument,
  headerButtonShown = true,
}: {
  dso: Dso,
  headerButtonShown?: boolean,
  headerButtonText?: string,
  headerButtonAction?: Function,
  onClickDocument: Function,
}) => {
  const isIssuer = useIsIssuer();
  const history = useHistory();

  return (
    <Paper>
      <Box p={4}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <DsoTitle
              issuerName={dso.issuerName}
              tokenSymbol={dso.tokenSymbol}
            />
          </Grid>

          {headerButtonAction && headerButtonText && headerButtonShown && (
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
                <Typography paragraph>
                  <span
                    dangerouslySetInnerHTML={{ __html: dso.introduction }}
                  />
                </Typography>
              </SectionContainer>
            </Grid>

            <Grid item xs={4}>
              <SectionContainer>
                <OfferDetail label="Status" value={dso.status} />
                <OfferDetail
                  label="Capital Structure"
                  value={dso.capitalStructure}
                />
                <OfferDetail
                  label="Unit Price"
                  value={formatMoney(dso.pricePerUnit, dso.currency.symbol)}
                />
                <OfferDetail
                  label="Total Fundraising Amount"
                  value={formatMoney(
                    dso.totalFundraisingAmount,
                    dso.currency.symbol
                  )}
                />
                <OfferDetail
                  label="Minimum Investment"
                  value={formatMoney(
                    dso.minimumInvestment,
                    dso.currency.symbol
                  )}
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
                // TODO:  Check if what the number denotes (eg months, yrs?)
                value={dso.investmentPeriod.toString()}
              />
              <OfferingTermItem
                label="Divident Yield"
                value={toPercentage(dso.dividendYeild)}
              />
              <OfferingTermItem
                label="Gross IRR"
                value={toPercentage(dso.grossIRR)}
              />

              <OfferingTermItem
                label="Investment Structure"
                value={dso.investmentStructure}
              />
              <OfferingTermItem
                label="Equity Multiple"
                value={dso.equityMultiple}
              />
              <OfferingTermItem
                label="Distribution Frequency"
                value={dso.distributionFrequency}
              />

              <OfferingTermItem
                label="Capital Structure"
                value={dso.capitalStructure}
              />
              <OfferingTermItem
                label="Interest Rate"
                value={toPercentage(dso.interestRate)}
              />
              <OfferingTermItem label="Leverage" value={dso.leverage || '-'} />
            </Grid>
          </SectionContainer>
        </Box>

        <Box mt={4}>
          <SectionContainer title="Business Model">
            <Typography>
              <span dangerouslySetInnerHTML={{ __html: dso.businessModel }} />
            </Typography>
          </SectionContainer>
        </Box>

        <Box mt={4}>
          <SectionContainer title="Token Address">
            <Grid container item justify="space-between">
              <Typography color="primary">
                {(dso.deploymentInfo && dso.deploymentInfo.token) || '-'}
              </Typography>
              {isIssuer && !dso.deploymentInfo && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push(`/issuance/${dso._id}/deploy`)}
                >
                  Deploy
                </Button>
              )}
            </Grid>
          </SectionContainer>
        </Box>

        <Box mt={4}>
          <SectionContainer title="Use of Proceeds">
            <Typography>
              <span dangerouslySetInnerHTML={{ __html: dso.useOfProceeds }} />
            </Typography>
          </SectionContainer>
        </Box>

        <Box mt={4}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <SectionContainer title="Dataroom">
                {dso.documents.map((document) => (
                  <Button
                    key={document._id}
                    onClick={() => onClickDocument(document)}
                  >
                    <Typography>{document.title}</Typography>
                  </Button>
                ))}
              </SectionContainer>
            </Grid>
            <Grid item xs={6}>
              <SectionContainer title="Fund Raising Milestone">
                <Typography>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: dso.fundraisingMilestone,
                    }}
                  />
                </Typography>
              </SectionContainer>
            </Grid>
          </Grid>
        </Box>

        <Box mt={4}>
          <SectionContainer title="Team">
            {(dso.team || []).map((member) => (
              <TeamMember member={member} key={member._id} />
            ))}
          </SectionContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default DsoInformation;
