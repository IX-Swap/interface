// @flow
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import DsoTitle from 'components/Dso/DsoTitle';
import { makeStyles } from '@material-ui/styles';
import { formatMoney } from 'helpers/formatNumbers';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { snackbarService } from 'uno-material-ui';
import type { Dso } from 'context/dso/types';
import type { Commitment } from 'context/commitment/types';
import {
  fetchAccountBalanceByAsset,
  addCommitment,
  downloadFile,
} from '../modules/actions';
import { useInvestState } from '../modules';
import Uploader from './Uploader';

const useStyles = makeStyles(() => ({
  label: {
    fontWeight: 'bold',
    color: '#999999',
    fontSize: '0.95em',
  },
  value: {
    fontWeight: 'bold',
    fontSize: '1.45em',
  },
}));

const BalanceHeader = ({ label, value }: { label: string, value: string }) => {
  const classes = useStyles();

  return (
    <Grid item xs={3} container justify="center" direction="column">
      <Typography className={classes.label}>{label}:</Typography>
      <Typography className={classes.value}>{value}</Typography>
    </Grid>
  );
};

const CommitmentItem = ({
  dso,
  commitment,
  asset,
}: {
  dso: Dso,
  commitment?: Commitment,
  asset: string,
}) => {
  const history = useHistory();
  const [saving, setSaving] = useState(false);
  const [balance, setBalance] = useState(null);
  const [estimatedValue, setEstimatedValue] = useState(0);
  const [numberOfUnits, setNumberOfUnits] = useState(0);
  const [subscriptionDocument, setSubscriptionDocument] = useState(null);
  const { editMode } = useInvestState();

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async (data) => {
    setSaving(true);
    const { walletAddress, otp } = data;
    const { currency, _id, minimumInvestment } = dso;

    if (numberOfUnits < minimumInvestment) {
      snackbarService.showSnackbar(
        'Number of units is below minimum investment',
        'error'
      );

      setSaving(false);
      return;
    }

    if (!subscriptionDocument) {
      snackbarService.showSnackbar(
        'You need to upload a signed subscription document',
        'error'
      );

      setSaving(false);
      return;
    }

    const signedSubscriptionDocument = subscriptionDocument._id;

    try {
      const res = await addCommitment({
        walletAddress,
        numberOfUnits,
        otp,
        currency: currency[0]._id,
        dso: _id,
        signedSubscriptionDocument,
      });

      if (res) {
        snackbarService.showSnackbar(
          'Successfully added commitment.',
          'success'
        );
        setTimeout(() => {
          // update this later to a less hacky solution
          window.location.reload();
        }, 1000);
      }

      setSaving(false);
    } catch (error) {
      snackbarService.showSnackbar(
        error.message ? error.message : 'Something went wrong.',
        'error'
      );
      setSaving(false);
    }
  };

  const onClickDownload = async (documentId) => {
    try {
      await downloadFile(documentId);
    } catch (error) {
      snackbarService.showSnackbar(
        error.message ? error.message : 'Something went wrong.',
        'error'
      );
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        // get balance of account with same currency as dso
        const res = await fetchAccountBalanceByAsset(asset);
        setBalance(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (dso) {
      fetch();
    }
  }, [dso, asset]);

  useEffect(() => {
    if (dso) {
      const amount = watch('amount');
      if (amount) setNumberOfUnits(amount / dso.pricePerUnit);
    }
  }, [dso, watch]);

  useEffect(() => {
    if (commitment) {
      setEstimatedValue(commitment.numberOfUnits * dso.pricePerUnit);
    }
  }, [commitment, dso]);

  return (
    <Container>
      <Box component={Paper} p={4}>
        <Grid container>
          <Grid item xs={6}>
            <DsoTitle
              issuerName={dso.issuerName}
              tokenSymbol={dso.tokenSymbol}
            />
          </Grid>

          <BalanceHeader
            label="Account Balance"
            value={
              balance
                ? formatMoney(balance.available, dso.currency[0].symbol)
                : '0'
            }
          />
          <BalanceHeader
            label="Estimated Value"
            value={formatMoney(estimatedValue, dso.currency[0].symbol)}
          />
        </Grid>
        <Grid container alignItems="center" direction="column">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box width="400px" p={4} mt={4}>
              <Box mb={2}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Button}
                  fullWidth
                  disabled={saving}
                  onClick={() => onClickDownload(dso.subscriptionDocument)}
                >
                  Download Subscription Document
                </Button>
              </Box>

              {editMode ? (
                <Uploader
                  onUploadSuccess={(doc) => setSubscriptionDocument(doc)}
                />
              ) : (
                <Box mb={2}>
                  <Button
                    variant="contained"
                    component={Button}
                    fullWidth
                    disabled={saving}
                    onClick={() => {
                      if (commitment) {
                        onClickDownload(commitment.signedSubscriptionDocument);
                      }
                    }}
                  >
                    Download Signed Subscription Document
                  </Button>
                </Box>
              )}

              {editMode ? (
                <TextField
                  error={!!errors.amount}
                  name="amount"
                  inputRef={register({ required: true })}
                  fullWidth
                  type="number"
                  label="Investment Amount"
                  style={{ marginBottom: '1em' }}
                  disabled={saving}
                />
              ) : (
                <TextField
                  fullWidth
                  label="Investment Amount"
                  value={commitment ? formatMoney(commitment.totalAmount) : 0}
                  style={{ marginBottom: '1em' }}
                  disabled
                />
              )}

              <TextField
                fullWidth
                label="Unit Price"
                value={formatMoney(
                  dso ? dso.pricePerUnit : 0,
                  dso ? dso.currency[0].symbol : undefined
                )}
                style={{ marginBottom: '1em' }}
                disabled
              />

              {editMode ? (
                <TextField
                  error={!!errors.numberOfUnits}
                  name="numberOfUnits"
                  inputRef={register({ required: true })}
                  fullWidth
                  type="number"
                  label="Number of Units"
                  style={{ marginBottom: '1em' }}
                  value={numberOfUnits}
                />
              ) : (
                <TextField
                  fullWidth
                  label="Number of Units"
                  style={{ marginBottom: '2em' }}
                  disabled
                  value={commitment && commitment.numberOfUnits}
                />
              )}

              {editMode ? (
                <TextField
                  error={!!errors.walletAddress}
                  name="walletAddress"
                  inputRef={register({ required: true })}
                  fullWidth
                  label="Destination Wallet Address"
                  style={{ marginBottom: '2em' }}
                  disabled={saving}
                />
              ) : (
                <TextField
                  fullWidth
                  label="Destination Wallet Address"
                  style={{ marginBottom: '2em' }}
                  disabled
                  value={commitment && commitment.walletAddress}
                />
              )}

              {editMode && (
                <TextField
                  error={!!errors.otp}
                  name="otp"
                  fullWidth
                  inputRef={register({ required: true })}
                  variant="outlined"
                  label="OTP"
                  style={{ marginBottom: '1em' }}
                  disabled={saving}
                />
              )}
            </Box>

            <Box width="400px">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {editMode ? (
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      size="large"
                      type="submit"
                      disabled={saving}
                    >
                      Invest
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      size="large"
                      type="button"
                      disabled={
                        saving ||
                        (commitment && commitment.status !== 'Unauthorized')
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        if (!editMode) {
                          alert('Feature not yet available');
                        }
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => history.push('/invest/view')}
                    disabled={saving}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Grid>
      </Box>
    </Container>
  );
};

export default CommitmentItem;
