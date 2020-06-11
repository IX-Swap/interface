// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Button,
  Paper,
  Typography,
} from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import type { Commitment } from 'context/commitment/types';
import type { Dso } from 'context/dso/types';
import { formatMoney } from 'helpers/formatNumbers';
import { blue } from '@material-ui/core/colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { snackbarService } from 'uno-material-ui';
import moment from 'moment';
import { downloadByUri } from 'context/base/authorizer/actions';
import Uploader from 'components/GenericUploader';
import AuthorizeConfirmDialog from './AuthorizeConfirmDialog';
import { toggleCommitmentStatus, uploadSigned } from '../modules/actions';

const DsoSummary = ({
  dso,
  onClickView,
  status,
}: {
  dso: Dso,
  onClickView: Function,
  status: string,
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
          {status}
        </Box>
      </Box>
      <Typography variant="h5">
        <b>{dso.tokenName}</b>
      </Typography>
      <Typography>
        <b>{dso.issuerName}</b>
      </Typography>
      <Typography>{dso.capitalStructure}</Typography>
    </Box>
    <Box p={4}>
      <Typography>
        <b>Token</b>
        <span style={{ marginLeft: '1em' }}>{dso.tokenSymbol}</span>
      </Typography>
      <Typography>
        <b>DSO Price</b>
        <span style={{ marginLeft: '1em' }}>
          {formatMoney(dso.pricePerUnit, (dso || {}).symbol)}
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
  const [file, setFile] = useState('');
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

      // Temporary solution
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }

    snackbarService.showSnackbar(message, type);
    setSaving(false);
  };

  const onUploadCountersigned = (res: any) => {
    const update = uploadSigned(commitment._id, res._id);
    if (update) {
      commitment.countersignedSubscriptionDocument = res._id;
      setFile(res.originalFileName);
    }
  };

  useEffect(() => {
    setFile(dso.countersignedSubscriptionDocument ? 'Download' : '');
  }, []);

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
                <CommitmentItem label="Bank Name" value={individual.bankName} />
                <CommitmentItem
                  label="Bank Account Number"
                  value={individual.bankAccountNumber}
                />
                <CommitmentItem
                  label="Accredation Status"
                  // TODO: Currently no way of knowing which type
                  value="Individual"
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
                <CommitmentItem
                  label="DSO Tokens"
                  value={commitment.numberOfUnits}
                />
                <CommitmentItem
                  label="Price Per Token"
                  value={formatMoney(
                    commitment.pricePerUnit,
                    (commitment.currency || {}).symbol
                  )}
                />
                <CommitmentItem
                  label="Total Committed Amount"
                  value={formatMoney(
                    commitment.totalAmount,
                    (commitment.currency || {}).symbol
                  )}
                />
                <CommitmentItem
                  label="Date of Commitment"
                  value={moment(commitment.createdAt).format('MM/DD/YYYY')}
                />
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
                      onClick={() =>
                        downloadByUri(
                          `/issuance/commitment/dataroom/subscription/signed/raw/${commitment._id}`
                        )
                      }
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
                  {commitment.status === 'Unauthorized' && (
                    <Grid item xs={6} style={{ display: 'flex' }}>
                      <Uploader
                        edit
                        showTitle={false}
                        justify="flex-start"
                        originalFileName={file}
                        onUpload={onUploadCountersigned}
                        width="initial"
                        document={{
                          title: 'Document Signed by Issuer',
                          label: 'commitment-countersigned-document',
                          type: 'commitmentCounterSignedDocument',
                        }}
                      />
                      {commitment.countersignedSubscriptionDocument && (
                        <Button
                          onClick={() =>
                            downloadByUri(
                              `/issuance/commitment/dataroom/subscription/counter-signed/raw/${commitment._id}`
                            )
                          }
                        >
                          <CloudDownloadIcon />
                        </Button>
                      )}
                    </Grid>
                  )}
                  {commitment.status !== 'Unauthorized' && (
                    <Grid item xs={6}>
                      <Button
                        disabled={!commitment.countersignedSubscriptionDocument}
                        variant="contained"
                        color="primary"
                        style={{ width: '120px' }}
                        onClick={() =>
                          downloadByUri(
                            `/issuance/commitment/dataroom/subscription/counter-signed/raw/${commitment._id}`
                          )
                        }
                      >
                        Download
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <DsoSummary dso={dso} onClickView={onViewDso} status={dso.status} />
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
                disabled={
                  saving || !commitment.countersignedSubscriptionDocument
                }
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
