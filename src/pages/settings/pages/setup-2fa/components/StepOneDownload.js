// @flow
import React from 'react';
import { Container, Typography, Grid } from '@material-ui/core';

const StepOneDownload = () => (
  <Container>
    <Typography align="center">
      Download and Install Google Authenticator App
    </Typography>

    <Grid container justify="center">
      <Grid item>App Store Logo</Grid>
      <Grid item>Google Play Logo</Grid>
    </Grid>
  </Container>
);

export default StepOneDownload;
