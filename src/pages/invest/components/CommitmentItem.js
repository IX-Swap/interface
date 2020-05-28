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
  toggleEditMode,
} from '../modules/actions';
import { useInvestState, useInvestDispatch } from '../modules';

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
  const { editMode } = useInvestState();
  const dispatch = useInvestDispatch();

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async (data) => {
    setSaving(true);
    const { walletAddress, numberOfUnits, otp } = data;
    const { currency, _id, minimumInvestment } = dso;
    // Temp
    const signedSubscriptionDocument = '000000000000000000000001';

    if (numberOfUnits < minimumInvestment) {
      snackbarService.showSnackbar(
        'Number of units is below minimum investment',
        'error'
      );

      return;
    }

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

      const units = watch('numberOfUnits');
      if (units) setEstimatedValue(units * dso.pricePerUnit);
    }
  }, [dso, watch, asset]);

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
                >
                  Download Subscription Document
                </Button>
              </Box>
              <Box
                variant="contained"
                component={Button}
                fullWidth
                mb={4}
                disabled={saving}
              >
                Upload Signed Subscription Document
              </Box>

              {editMode ? (
                <TextField
                  error={!!errors.numberOfUnits}
                  name="numberOfUnits"
                  inputRef={register({ required: true })}
                  fullWidth
                  type="number"
                  label="Number of Units"
                  style={{ marginBottom: '1em' }}
                  disabled={saving}
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
