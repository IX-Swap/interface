import { Control, FieldError, useFormContext } from 'react-hook-form'
import { useTypedController } from '@hookform/strictly-typed'
import {
  FormControl,
  InputLabel,
  Select as MUISelect,
  SelectProps as MUISelectProps
} from '@material-ui/core'
import React from 'react'
import {
  DeepPath,
  FieldValuesFromControl,
  UnpackNestedValue
} from '@hookform/strictly-typed/dist/types'
import get from 'lodash/get'
import { TypedFormFieldProps } from 'v2/components/form/typed/types'
import { pathToString } from 'v2/components/form/typed/utils'
import FormHelperText from '@material-ui/core/FormHelperText'

export const useTypedSelect = <FormType extends Record<string, any>>() => <
  Path extends DeepPath<FormType, Path>
>(
  props: TypedFormFieldProps<FormType, Path> & Omit<MUISelectProps, 'name'>
) => <Select {...props} />

export const Select = <
  FormType extends UnpackNestedValue<FieldValuesFromControl<Control>>,
  Path extends DeepPath<FormType, Path>
>(
  props: TypedFormFieldProps<FormType, Path> & Omit<MUISelectProps, 'name'>
): JSX.Element => {
  const { control, errors, formState, setValue } = useFormContext<FormType>()
  // @ts-expect-error
  const TypedController = useTypedController<FormType>({ control })
  const path = pathToString(props.name)
  const error = get(errors, path) as FieldError
  const hasError = get(formState.touched, path) === true && Boolean(error)
  const handleChange = (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ): void => {
    setValue(path, e.target.value as any, { shouldValidate: true })
  }

  return (
    <TypedController
      name={props.name}
      defaultValue={props.defaultValue}
      render={controllerProps => (
        <FormControl fullWidth>
          <InputLabel error={hasError}>{props.label}</InputLabel>
          <MUISelect
            {...controllerProps}
            onChange={handleChange}
            error={hasError}
          >
            {props.children}
          </MUISelect>
          {hasError && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
