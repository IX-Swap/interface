// @flow
import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  fieldLabel: {
    fontWeight: 'bold',
  },
}));

type IdentityFieldProps = {
  label: string,
  value: string,
  size?: number,
};

const IdentityField = ({ label, value, size = 4 }: IdentityFieldProps) => {
  const classes = useStyles();

  return (
    <Grid item xs={size}>
      <Typography className={classes.fieldLabel}>{label}</Typography>
      <Typography>{value}</Typography>
    </Grid>
  );
};

export default IdentityField;
