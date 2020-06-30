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
import { flatten } from 'flat'

const useStyles = makeStyles(() => ({
  fieldLabel: {
    fontWeight: 'bold'
  },
  textField: {
    minWidth: '100px'
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
  margin?: string
};

const EditableField = ({
  label,
  value = '',
  size = 4,
  name,
  type = 'text',
  margin,
  children,
  previewMode,
  required = false,
  editMode = false,
  ...others
}: Omit<FormControlProps, 'size'> & EditableFieldProps) => {
  const classes = useStyles()
  const form = useForm()
  let { control, register, errors } = useFormContext() || { control: null, register: null }

  let flatErrors = flatten(errors) as {[key: string]: any}

  if (!control || !register) {
    control = form.control
    register = form.register
    errors = {}
    flatErrors = {}
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
          <FormControl
            className={classes.selectField}
            {...others}
            margin={margin}
            error={!!(errors[name] || flatErrors[`${name}.type`])}
          >
            <InputLabel id={`select-${name}`}>{label}</InputLabel>
            <Controller
              as={Select}
              name={name}
              id={`select-${name}`}
              rules={{ required }}
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
            error={!!(errors[name] || flatErrors[`${name}.type`])}
            margin={margin}
            style={others.style}
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
