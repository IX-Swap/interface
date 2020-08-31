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

export const createTypedTextInput = <
  FormType extends Record<string, any>
>() => {
  return <Path extends DeepPath<FormType, Path>>(
    props: TypedFormFieldProps<FormType, Path> &
      Omit<InputProps, 'name'> & { label: string; helperText?: string }
  ) => {
    return <TextInput {...props} />
  }
}

export const TextInput = <
  FormType extends UnpackNestedValue<FieldValuesFromControl<Control>>,
  Path extends DeepPath<FormType, Path>
>(
  props: TypedFormFieldProps<FormType, Path> &
    Omit<InputProps, 'name'> & { label: string; helperText?: string }
): JSX.Element => {
  const {
    name,
    defaultValue,
    helperText,
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
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setValue(path, e.target.value as any)
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
            onChange={handleChange}
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
