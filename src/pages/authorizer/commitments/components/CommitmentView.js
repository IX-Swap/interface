// @flow
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Button,
  Paper,
  Typography,
} from '@material-ui/core';
import type { Commitment } from 'context/commitment/types';
import type { Dso } from 'context/dso/types';
import { formatMoney } from 'helpers/formatNumbers';
import { blue } from '@material-ui/core/colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { snackbarService } from 'uno-material-ui';
import AuthorizeConfirmDialog from './AuthorizeConfirmDialog';
import { toggleCommitmentStatus } from '../modules/actions';

const DsoSummary = ({
  dso,
  onClickView,
}: {
  dso: Dso,
  onClickView: Function,
}) => (
  <Paper style={{ height: '96%' }}>
    <Box
      px={4}
      pb={4}
      pt={6}
      position="relative"
      style={{ borderBottom: '1px solid #f0f0f0' }}
    >
      <Box position="absolute" top={0} right={0}>
        <Box
          py={1}
          px={4}
          style={{ backgroundColor: blue[500], color: 'white' }}
        >
          {dso.status}
        </Box>
      </Box>
      <Typography variant="h5">
        <b>{dso.tokenName}</b>
      </Typography>
      <Typography>
        <b>{dso.issuerName}</b>
      </Typography>
      <Typography>Prefered Equity</Typography>
    </Box>
    <Box p={4}>
      <Typography>
        <b>Token</b>
        <span style={{ marginLeft: '1em' }}>{dso.tokenSymbol}</span>
      </Typography>
      <Typography>
        <b>DSO Price</b>
        <span style={{ marginLeft: '1em' }}>
          {formatMoney(dso.pricePerUnit, dso.currency.symbol)}
        </span>
      </Typography>
      <Typography>
        <b>Investment Structure</b>
        <span style={{ marginLeft: '1em' }}>{dso.investmentStructure}</span>
      </Typography>
      <Box mt={2}>
        <Typography paragraph>
          <span dangerouslySetInnerHTML={{ __html: dso.introduction }} />
        </Typography>
      </Box>
      <Button variant="contained" onClick={onClickView}>
        View
      </Button>
    </Box>
  </Paper>
);

const CommitmentItem = ({ label, value }: { label: string, value: string }) => (
  <Grid item xs={3}>
    <Typography>
      <b>{label}</b>
    </Typography>
    <Typography>{value}</Typography>
  </Grid>
);

const CommitmentView = ({
  commitment,
  onClickBack,
  onViewIdentity,
  onViewDso,
}: {
  commitment: Commitment,
  onClickBack: Function,
  onViewIdentity: Function,
  onViewDso: Function,
}) => {
  const { dso, individual, status } = commitment;
  const [saving, setSaving] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    setSaving(true);
    const confirm = await toggleCommitmentStatus(commitment, newStatus);
    let message = 'Failed to update withdraw status!';
    let type = 'error';

    if (confirm) {
      message = 'Successfully updated withdraw status!';
      type = 'success';
      setOpen(false);
    }

    snackbarService.showSnackbar(message, type);
    setSaving(false);
  };

  return (
    <Container>
      <Box mb={3}>
        <Grid container alignItems="center">
          <Button type="button" onClick={() => onClickBack()} disabled={saving}>
            <ArrowBackIosIcon />
          </Button>
          <Typography variant="h5">Back</Typography>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8} container spacing={2} direction="column">
          <Grid item>
            <Box component={Paper} px={4} py={6}>
              <Typography paragraph variant="h5">
                <b>Investor Identity</b>
              </Typography>
              <Grid container spacing={2}>
                <CommitmentItem
                  label="Investor Name"
                  value={`${individual.firstName} ${individual.lastName}`}
                />
                <CommitmentItem
                  label="Country"
                  value={individual.countryOfResidence}
                />
                <CommitmentItem
                  label="Bank Name"
                  value={individual.bankAccountName}
                />
                <CommitmentItem
                  label="Bank Account Number"
                  value={individual.bankAccountNumber}
                />
                <CommitmentItem
                  label="Accredation Status"
                  value={individual.status}
                />
                <CommitmentItem
                  label="US National"
                  value={individual.nationality === 'American' ? 'Yes' : 'No'}
                />
                <Grid item xs={6} container alignItems="center">
                  <Grid item xs={6}>
                    <Typography>
                      <b>Full Investor Profile</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onViewIdentity(individual)}
                    >
                      View
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <Box component={Paper} px={4} py={6}>
              <Typography paragraph variant="h5">
                <b>Investor Commitment</b>
              </Typography>
              <Grid container spacing={2}>
                <CommitmentItem label="Investor Name" value="Name" />
                <CommitmentItem label="Investor Name" value="Name" />
                <CommitmentItem label="Investor Name" value="Name" />
                <CommitmentItem label="Investor Name" value="Name" />
              </Grid>

              <Box mt={6}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Typography>
                      Subscription Document Signed by Investor
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: '120px' }}
                    >
                      Download
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Box mt={3}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Typography>
                      Subscription Document Signed by Issuer
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" style={{ width: '120px' }}>
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <DsoSummary dso={dso} onClickView={onViewDso} />
        </Grid>
      </Grid>

      {status === 'Unauthorized' && (
        <Box mt={1}>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpen(true);
                  setNewStatus('approve');
                }}
                disabled={saving}
              >
                Approve
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(true);
                  setNewStatus('reject');
                }}
                disabled={saving}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      <AuthorizeConfirmDialog
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        newStatus={newStatus}
        handleConfirm={handleConfirm}
      />
    </Container>
  );
};

export default CommitmentView;
