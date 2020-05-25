// @flow
import React from 'react';
import { Typography, Container, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';
import { useTwoFactorState } from '../modules';

const useStyles = makeStyles(() => ({
  image: {
    height: '150px',
    width: '150px',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    marginRight: '1em',
  },
  label: {
    color: grey[500],
    fontSize: '.95em',
  },
  key: {
    color: grey[700],
    paddingTop: '1em',
  },
}));

const StepTwoScan = () => {
  const classes = useStyles();
  const {
    data: { image, key },
  } = useTwoFactorState();

  return (
    <Container>
      <Typography align="center">
        Scan this QR Code in the Google Authenticator App
      </Typography>

      <Grid container justify="center">
        <Box width="60%" pt={3}>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <div
                className={classes.image}
                style={{ backgroundImage: `url('${image}')` }}
              />
            </Grid>
            <Grid item>
              <Typography className={classes.label}>
                If you are unable to scan this QR code, <br />
                please enter this code manually in the app.
              </Typography>

              <Typography variant="h5" className={classes.key}>
                {key}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
};

export default StepTwoScan;
