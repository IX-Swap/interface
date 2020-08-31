import { Control, useFormContext, FieldError } from 'react-hook-form'
import { useTypedController } from '@hookform/strictly-typed'
import { FormControl, InputLabel, SelectProps } from '@material-ui/core'
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
import { CountriesSelect } from 'v2/components/form/CountriesSelect'

export const createTypedCountrySelect = <
  FormType extends Record<string, any>
>() => <Path extends DeepPath<FormType, Path>>(
  props: TypedFormFieldProps<FormType, Path> & Omit<SelectProps, 'name'>
) => <CountrySelect {...props} />

export const CountrySelect = <
  FormType extends UnpackNestedValue<FieldValuesFromControl<Control>>,
  Path extends DeepPath<FormType, Path>
>(
  props: TypedFormFieldProps<FormType, Path> & Omit<SelectProps, 'name'>
): JSX.Element => {
  const { control, errors, formState, setValue, trigger } = useFormContext<
    FormType
  >()
  // @ts-expect-error
  const TypedController = useTypedController<FormType>({ control })
  const path = pathToString(props.name)
  const error = get(errors, path) as FieldError
  const hasError = get(formState.touched, path) === true && Boolean(error)
  const handleChange = (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ): void => {
    setValue(path, e.target.value as any)
    // eslint-disable-next-line no-void
    void trigger()
  }

  return (
    <TypedController
      name={props.name}
      defaultValue={props.defaultValue}
      render={p => (
        <FormControl fullWidth>
          <InputLabel error={hasError}>Country</InputLabel>
          <CountriesSelect {...p} error={hasError} onChange={handleChange} />
          {hasError && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
