import React from 'react'
import {
  Typography,
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormControlProps
} from '@material-ui/core'
import moment from 'moment'
import { makeStyles } from '@material-ui/styles'
import { useFormContext, Controller, useForm } from 'react-hook-form'

const useStyles = makeStyles(() => ({
  fieldLabel: {
    fontWeight: 'bold'
  },
  textField: {
    width: '100%'
  },
  selectField: {
    width: '100%',
    minWidth: '125px'
  }
}))

type ValidInputTypes = 'text' | 'select' | 'date' | 'check'

interface EditableFieldProps {
  label: string
  value?: string | boolean
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  name: string
  type?: ValidInputTypes
  children?: React.ReactNode
  required?: boolean
  editMode?: boolean
  raw?: string
  previewMode?: JSX.Element
};

const EditableField = ({
  label,
  value = '',
  size = 4,
  name,
  type = 'text',
  children,
  previewMode,
  required = false,
  editMode = false,
  ...others
}: Omit<FormControlProps, 'size'> & EditableFieldProps) => {
  const classes = useStyles()
  const form = useForm()
  let { control, register } = useFormContext() || { control: null, register: null }

  if (!control || !register) {
    control = form.control
    register = form.register
  }

  let lValue = value

  if (type === 'date') {
    lValue = moment(value?.toString()).format('yyyy-MM-DD')
  }

  if (editMode) {
    let inputComponent

    switch (type) {
      case 'select':
        inputComponent = (
          <FormControl className={classes.selectField} {...others}>
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
        )
        break

      case 'check':
        inputComponent = (
          <FormControlLabel
            label={label}
            control={
              <Controller
                as={Checkbox}
                name={name}
                control={control}
                defaultValue={value || false}
              />
            }
          />
        )
        break

      case 'text':
      case 'date':
      default:
        inputComponent = (
          <TextField
            label={label}
            type={type}
            name={name}
            inputRef={register({ required })}
            placeholder={label}
            className={classes.textField}
            defaultValue={lValue || ''}
          />
        )
        break
    }

    return (
      <Grid item xs={size}>
        {inputComponent}
      </Grid>
    )
  }

  const getValueDisplay = (mType: ValidInputTypes, mValue: string | boolean) => {
    let val = mValue || '-'
    if (mType === 'check') {
      val = mValue ? 'Yes' : 'No'
    }

    return val
  }

  return (
    <Grid item xs={size}>
      {previewMode && previewMode}
      {!previewMode && (
        <>
          <Typography className={classes.fieldLabel}>{label}</Typography>
          <Typography>{getValueDisplay(type, value)}</Typography>
        </>
      )}
    </Grid>
  )
}

export default EditableField
