import { Control, FieldError, useFormContext } from 'react-hook-form'
import { InputLabel, FormControl, FormHelperText } from '@material-ui/core'
import React from 'react'
import { useTypedController } from '@hookform/strictly-typed'
import {
  DeepPath,
  FieldValuesFromControl,
  UnpackNestedValue
} from '@hookform/strictly-typed/dist/types'
import {
  TypedFieldProps,
  TypedFieldWithChildren
} from 'v2/components/form/typed/types'
import { pathToString } from 'v2/components/form/typed/utils'
import get from 'lodash/get'

export const createTypedField = <FormType extends Record<string, any>>() => {
  return <Path extends DeepPath<FormType, Path>>({
    children,
    ...props
  }: TypedFieldProps<FormType, Path> &
    TypedFieldWithChildren<FormType, Path>) => (
    <TypedField {...props}>{children}</TypedField>
  )
}

export const TypedField = <
  FormType extends UnpackNestedValue<FieldValuesFromControl<Control>>,
  Path extends DeepPath<FormType, Path>
>(
  props: TypedFieldProps<FormType, Path> &
    TypedFieldWithChildren<FormType, Path>
): JSX.Element => {
  const {
    name,
    defaultValue = '',
    helperText,
    children,
    valueProvider,
    valueExtractor,
    formControlProps = { fullWidth: true },
    inputProps = {}
  } = props
  const { control, errors, setValue, trigger, formState } = useFormContext<
    FormType
  >()
  // @ts-expect-error
  const TypedController = useTypedController<FormType>({ control })
  const path = pathToString(name)
  const error = get(errors, path) as FieldError
  const hasError = get(formState.touched, path) === true && Boolean(error)
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ...restArgs: any[]
  ): void => {
    const value =
      valueExtractor !== undefined
        ? valueExtractor(event, ...restArgs)
        : event.target.value
    setValue(path, value, { shouldValidate: true, shouldDirty: true })
    // eslint-disable-next-line no-void
    void trigger()
  }
  const destructValue = (value: any): any => {
    return valueProvider !== undefined ? valueProvider(value) : value
  }

  return (
    <TypedController
      name={name}
      defaultValue={defaultValue as any}
      render={controllerProps => (
        <FormControl {...formControlProps}>
          {typeof children !== 'function' && (
            <InputLabel error={hasError} htmlFor={path}>
              {props.label}
            </InputLabel>
          )}
          {typeof children === 'function'
            ? children({
              ...{ ...inputProps, id: path },
              ...controllerProps,
              value: destructValue(controllerProps.value),
              label: props.label,
              onChange: handleChange
            })
            : React.cloneElement(children, {
              ...{ ...inputProps, id: path },
              ...controllerProps,
              value: destructValue(controllerProps.value),
              error: hasError,
              onChange: handleChange
            })}
          <FormHelperText error={hasError}>
            {hasError ? error.message : helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  )
}
