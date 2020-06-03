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
  value?: string,
  size?: number,
  name: string,
  type?: 'text' | 'select' | 'date',
  children?: Node,
  required?: boolean,
  editMode: boolean,
};

const IdentityField = ({
  label,
  value,
  size = 4,
  name,
  type,
  children,
  required = false,
  editMode,
}: IdentityFieldProps) => {
  const classes = useStyles();
  const { control, register } = useFormContext();

  if (editMode) {
    let inputComponent;

    switch (type) {
      case 'select':
        inputComponent = (
          <FormControl
            name={name}
            ref={register({ required })}
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
              defaultValue={value || ''}
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
            inputRef={register({ required })}
            placeholder={label}
            className={classes.textField}
            defaultValue={value || ''}
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
