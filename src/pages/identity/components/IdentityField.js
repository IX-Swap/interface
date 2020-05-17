// @flow
import React from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useFormContext } from 'react-hook-form';
import { useIdentityState } from '../modules';

const useStyles = makeStyles(() => ({
  fieldLabel: {
    fontWeight: 'bold',
  },
  textField: {
    width: '100%',
    padding: '1em 0',
  },
}));

type IdentityFieldProps = {
  label: string,
  value: string,
  size?: number,
  name: string,
};

const IdentityField = ({
  label,
  value,
  size = 4,
  name,
}: IdentityFieldProps) => {
  const classes = useStyles();
  const { register } = useFormContext();
  const { editMode } = useIdentityState();

  if (!value && editMode) {
    return (
      <Grid item xs={size}>
        <TextField
          name={name}
          inputRef={register}
          placeholder={label}
          className={classes.textField}
        />
      </Grid>
    );
  }

  return (
    <Grid item xs={size}>
      <Typography className={classes.fieldLabel}>{label}</Typography>
      <Typography>{value || '-'}</Typography>
    </Grid>
  );
};

export default IdentityField;
