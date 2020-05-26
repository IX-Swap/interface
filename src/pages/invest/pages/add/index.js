// @flow
import React from 'react';
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
import { formatNumber } from 'helpers/formatNumbers';

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

const BalanceHeader = ({ label, value }: { label: string, value: number }) => {
  const classes = useStyles();

  return (
    <Grid item xs={3} container justify="center" direction="column">
      <Typography className={classes.label}>{label}:</Typography>
      <Typography className={classes.value}>{`${formatNumber(
        value
      )} SGD`}</Typography>
    </Grid>
  );
};

const AddCommitment = () => (
  <Container>
    <Box component={Paper} p={4}>
      <Grid container>
        <Grid item xs={6}>
          <DsoTitle issuerName="ASadasdasdaDA" tokenSymbol="ADF" />
        </Grid>

        <BalanceHeader label="Account Balance" value={50000} />
        <BalanceHeader label="Estimated Value" value={50000} />
      </Grid>
      <Grid container alignItems="center" direction="column">
        <Box width="400px" p={4} mt={4}>
          <Box variant="containedPrimary" component={Button} fullWidth mb={2}>
            Download Subscription Document
          </Box>
          <Box variant="contained" component={Button} fullWidth mb={4}>
            Upload Signed Subscription Document
          </Box>

          <TextField
            fullWidth
            label="Invesment Amount"
            style={{ marginBottom: '1em' }}
          />
          <TextField
            fullWidth
            label="Unit Price"
            style={{ marginBottom: '1em' }}
          />
          <TextField
            fullWidth
            label="Number of Digital Securities"
            style={{ marginBottom: '1em' }}
          />
          <TextField
            fullWidth
            label="Destination Wallet Address"
            style={{ marginBottom: '1em' }}
          />
        </Box>
        <Box width="400px">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
              >
                Invest
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" size="large">
                Back
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  </Container>
);

export default AddCommitment;
