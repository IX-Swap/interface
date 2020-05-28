// @flow
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import type { Node } from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import type { Dso } from 'context/dso/types';
import { formatMoney, toPercentage } from 'helpers/formatNumbers';
import { useIsIssuer } from 'services/acl';

import RichEditor from '../rte';
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
  <Box
    py={2}
    px={4}
    border={1}
    borderColor="#eaeaea"
    height="100%"
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    {title && (
      <Box mt={2}>
        <Typography>
          <b>{title}</b>
        </Typography>
      </Box>
    )}
    <Box mt={2} style={{ flexGrow: 1 }}>
      {children}
    </Box>
  </Box>
);

const OfferingTermItem = ({
  label,
  value,
  edit = false,
  raw,
}: {
  raw?: string,
  edit?: boolean,
  label: string,
  value: string,
}) => (
  <Grid container item xs={4} spacing={2}>
    <Grid item xs={6}>
      <Typography>{label}:</Typography>
    </Grid>
    <Grid item xs={6}>
      {!edit && <Typography>{value}</Typography>}
      {edit && <TextField value={raw || value} />}
    </Grid>
  </Grid>
);

const DsoInformation = ({
  dso,
  headerButtonText,
  headerButtonAction,
  onClickDocument,
  headerButtonShown = true,
  edit = false,
}: {
  dso: Dso,
  edit?: boolean,
  headerButtonShown?: boolean,
  headerButtonText?: string,
  headerButtonAction?: Function,
  onClickDocument: Function,
}) => {
  const isIssuer = useIsIssuer();
  const history = useHistory();
  const [editableDso, setEditableDso] = useState(dso);

  const onDsoTitleChange = (a: string, b: string) => {
    setEditableDso({
      ...editableDso,
      tokenSymbol: a,
      issuerName: b,
    });
  };

  return (
    <Paper>
      <Box p={4}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <DsoTitle
              edit={edit}
              issuerName={editableDso.issuerName}
              tokenSymbol={editableDso.tokenSymbol}
              onChange={onDsoTitleChange}
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
                {!edit && (
                  <Typography paragraph>
                    <span
                      dangerouslySetInnerHTML={{ __html: dso.introduction }}
                    />
                  </Typography>
                )}
                {edit && (
                  <RichEditor value={dso.introduction || 'Introduction'} />
                )}
              </SectionContainer>
            </Grid>

            <Grid item xs={4}>
              <SectionContainer>
                <OfferDetail label="Status" value={dso.status} />
                <OfferDetail
                  edit={edit}
                  label="Capital Structure"
                  value={dso.capitalStructure}
                />
                <OfferDetail
                  edit={edit}
                  label="Unit Price"
                  value={formatMoney(dso.pricePerUnit, dso.currency.symbol)}
                  raw={`${dso.pricePerUnit || ''}`}
                />
                <OfferDetail
                  edit={edit}
                  label="Total Fundraising Amount"
                  value={formatMoney(
                    dso.totalFundraisingAmount,
                    dso.currency.symbol
                  )}
                  raw={`${dso.totalFundraisingAmount || ''}`}
                />
                <OfferDetail
                  edit={edit}
                  label="Minimum Investment"
                  value={formatMoney(
                    dso.minimumInvestment,
                    dso.currency.symbol
                  )}
                  raw={`${dso.minimumInvestment || ''}`}
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
                edit={edit}
                raw={`${dso.investmentPeriod || ''}`}
                // TODO:  Check if what the number denotes (eg months, yrs?)
                value={dso.investmentPeriod.toString()}
              />
              <OfferingTermItem
                label="Divident Yield"
                edit={edit}
                raw={`${dso.dividendYeild || ''}`}
                value={toPercentage(dso.dividendYeild)}
              />
              <OfferingTermItem
                label="Gross IRR"
                edit={edit}
                raw={`${dso.grossIRR || ''}`}
                value={toPercentage(dso.grossIRR)}
              />

              <OfferingTermItem
                label="Investment Structure"
                edit={edit}
                raw={`${dso.investmentStructure || ''}`}
                value={dso.investmentStructure}
              />
              <OfferingTermItem
                label="Equity Multiple"
                edit={edit}
                raw={dso.equityMultiple}
                value={dso.equityMultiple}
              />
              <OfferingTermItem
                label="Distribution Frequency"
                edit={edit}
                raw={dso.distributionFrequency || ''}
                value={dso.distributionFrequency}
              />

              <OfferingTermItem
                label="Capital Structure"
                edit={edit}
                raw={dso.capitalStructure || ''}
                value={dso.capitalStructure}
              />
              <OfferingTermItem
                label="Interest Rate"
                edit={edit}
                raw={`${dso.interestRate || ''}`}
                value={toPercentage(dso.interestRate)}
              />
              <OfferingTermItem label="Leverage" value={dso.leverage || '-'} />
            </Grid>
          </SectionContainer>
        </Box>

        <Box mt={4}>
          <SectionContainer title="Business Model">
            {!edit && (
              <Typography>
                <span dangerouslySetInnerHTML={{ __html: dso.businessModel }} />
              </Typography>
            )}
            {edit && (
              <RichEditor value={dso.businessModel || 'Business Model'} />
            )}
          </SectionContainer>
        </Box>

        <Box mt={4}>
          <SectionContainer title="Token Address">
            <Grid container item justify="space-between">
              <Typography color="primary">
                {(dso.deploymentInfo && dso.deploymentInfo.token) || '-'}
              </Typography>
              {isIssuer &&
                !dso.deploymentInfo &&
                dso.status === 'Approved' &&
                !edit && (
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
            {!edit && (
              <Typography>
                <span dangerouslySetInnerHTML={{ __html: dso.useOfProceeds }} />
              </Typography>
            )}
            {edit && (
              <RichEditor value={dso.useOfProceeds || 'Use of Proceeds'} />
            )}
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
                {!edit && (
                  <Typography>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: dso.fundraisingMilestone,
                      }}
                    />
                  </Typography>
                )}
                {edit && (
                  <RichEditor
                    value={dso.fundraisingMilestone || 'Use of Proceeds'}
                  />
                )}
              </SectionContainer>
            </Grid>
          </Grid>
        </Box>

        <Box mt={4}>
          <SectionContainer title="Team">
            {(dso.team || []).map((member) => (
              <TeamMember edit={edit} member={member} key={member._id} />
            ))}
          </SectionContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default DsoInformation;
