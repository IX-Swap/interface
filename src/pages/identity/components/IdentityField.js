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
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import moment from 'moment';
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
  value?: string | boolean,
  size?: number,
  name: string,
  type?: 'text' | 'select' | 'date' | 'check',
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
  let lValue = value;

  if (type === 'date') {
    lValue = moment(value).format('yyyy-MM-DD');
  }

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

      case 'check':
        inputComponent = (
          <FormControlLabel
            label={label}
            control={
              <Controller
                as={Checkbox}
                name={name}
                type="checkbox"
                control={control}
                defaultValue={value || false}
              />
            }
          />
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
            defaultValue={lValue || ''}
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

  const getValueDisplay = (mType, mValue) => {
    let val = mValue || '-';
    if (mType === 'check') {
      val = mValue ? 'Yes' : 'No';
    }

    return val;
  };

  return (
    <Grid item xs={size}>
      <Typography className={classes.fieldLabel}>{label}</Typography>
      <Typography>{getValueDisplay(type, value)}</Typography>
    </Grid>
  );
};

export default IdentityField;
