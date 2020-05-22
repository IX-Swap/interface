// @flow
import React from 'react';
import { Container, Typography, Box, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useFormContext } from 'react-hook-form';
import { useTwoFactorState } from '../modules';
import { STATUS as TFA_STATUS } from '../modules/types';

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%',
  },
}));
const StepFourEnable = () => {
  const classes = useStyles();
  const { register } = useFormContext();
  const { status } = useTwoFactorState();

  return (
    <Container>
      <Typography align="center">Enable your Google Authenticator</Typography>
      <Grid container justify="center">
        <Box mt={4} width="30%">
          <TextField
            disabled={status === TFA_STATUS.SAVING}
            name="otp"
            inputRef={register({ required: true })}
            className={classes.textField}
            placeholder="Google Authentication Code"
          />
        </Box>
      </Grid>
    </Container>
  );
};

export default StepFourEnable;
