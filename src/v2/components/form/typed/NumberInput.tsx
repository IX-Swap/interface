import { Control, FieldError, useFormContext } from 'react-hook-form'
import {
  InputLabel,
  Input,
  FormControl,
  FormHelperText,
  InputProps
} from '@material-ui/core'
import React from 'react'
import { useTypedController } from '@hookform/strictly-typed'
import {
  DeepPath,
  FieldValuesFromControl,
  UnpackNestedValue
} from '@hookform/strictly-typed/dist/types'
import { TypedFormFieldProps } from 'v2/components/form/typed/types'
import { pathToString } from 'v2/components/form/typed/utils'
import get from 'lodash/get'
import NumberFormat, {
  NumberFormatProps,
  NumberFormatValues
} from 'react-number-format'

export const createTypedNumberInput = <
  FormType extends Record<string, any>
>() => {
  return <Path extends DeepPath<FormType, Path>>(
    props: TypedFormFieldProps<FormType, Path> &
      Omit<InputProps, 'name'> &
      AdditionalProps
  ) => {
    return <NumberInput {...props} />
  }
}

export interface AdditionalProps {
  label: string
  helperText?: string
  numberFormat?: NumberFormatProps
}

export const NumberInput = <
  FormType extends UnpackNestedValue<FieldValuesFromControl<Control>>,
  Path extends DeepPath<FormType, Path>
>(
  props: TypedFormFieldProps<FormType, Path> &
    Omit<InputProps, 'name'> &
    AdditionalProps
): JSX.Element => {
  const {
    name,
    defaultValue,
    helperText,
    numberFormat,
    fullWidth = true,
    ...textFieldProps
  } = props
  const { control, errors, trigger, setValue, formState } = useFormContext<
    FormType
  >()
  // @ts-expect-error
  const TypedController = useTypedController<FormType>({ control })
  const path = pathToString(props.name)
  const error = get(errors, path) as FieldError
  const hasError = get(formState.touched, path) === true && Boolean(error)
  const handleChange = (values: NumberFormatValues): void => {
    setValue(path, values.floatValue as any)
    // eslint-disable-next-line no-void
    void trigger()
  }

  return (
    <TypedController
      name={props.name}
      defaultValue={props.defaultValue}
      render={controllerProps => (
        <FormControl fullWidth={fullWidth}>
          <InputLabel error={hasError}>{props.label}</InputLabel>
          <Input
            {...textFieldProps}
            {...controllerProps}
            inputComponent={InputComponent}
            inputProps={{
              ...numberFormat,
              onValueChange: handleChange
            }}
            error={hasError}
          />
          <FormHelperText error={hasError}>
            {hasError ? error.message : helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  )
}

const InputComponent: React.FC = (props: NumberFormatProps) => {
  const { onValueChange, onChange, ...rest } = props

  return <NumberFormat {...rest} onValueChange={onValueChange} />
}
