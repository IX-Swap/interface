// @flow
import React from 'react';
import type { Node } from 'react';
import {
  Typography,
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useFormContext, Controller } from 'react-hook-form';
import { useIdentityState } from '../modules';

const useStyles = makeStyles(() => ({
  fieldLabel: {
    fontWeight: 'bold',
  },
  textField: {
    width: '100%',
    padding: '1em 0',
  },
  selectField: {
    width: '100%',
  },
}));

type IdentityFieldProps = {
  label: string,
  value: string,
  size?: number,
  name: string,
  type?: 'text' | 'select' | 'date',
  children?: Node,
};

const IdentityField = ({
  label,
  value,
  size = 4,
  name,
  type,
  children,
}: IdentityFieldProps) => {
  const classes = useStyles();
  const { control, register } = useFormContext();
  const { editMode } = useIdentityState();

  if (!value && editMode) {
    let inputComponent;

    switch (type) {
      case 'select':
        inputComponent = (
          <FormControl
            name={name}
            ref={register}
            className={classes.selectField}
          >
            <InputLabel id={`select-${name}`}>{label}</InputLabel>
            <Controller
              as={Select}
              name={name}
              id={`select-${name}`}
              control={control}
              onChange={([e]) => e.target.value}
              className={classes.selectField}
              value={value}
            >
              {children}
            </Controller>
          </FormControl>
        );
        break;

      case 'text':
      case 'date':
      default:
        inputComponent = (
          <TextField
            type={type}
            name={name}
            inputRef={register}
            placeholder={label}
            className={classes.textField}
          />
        );
        break;
    }

    return (
      <Grid item xs={size}>
        {inputComponent}
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
