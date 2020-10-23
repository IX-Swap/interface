import { Control, FieldError, useFormContext } from 'react-hook-form'
import { InputLabel, FormControl, FormHelperText } from '@material-ui/core'
import React, { cloneElement, useState } from 'react'
import { useTypedController } from '@hookform/strictly-typed'
import {
  DeepPath,
  FieldValuesFromControl,
  UnpackNestedValue
} from '@hookform/strictly-typed/dist/types'
import {
  TypedFieldProps,
  TypedFieldPropsWithChildren
} from 'v2/components/form/types'
import { pathToString } from 'v2/components/form/utils'
import get from 'lodash/get'

export const createTypedField = <FormType extends Record<string, any>>() => {
  return <Path extends DeepPath<FormType, Path>>({
    children,
    ...props
  }: TypedFieldProps<FormType, Path> &
    TypedFieldPropsWithChildren<FormType, Path>) => (
    <TypedField {...props}>{children}</TypedField>
  )
}

export const hasValue = (value: any) => {
  if (typeof value === 'string') {
    return value.trim() !== ''
  }

  return value !== undefined && value !== null
}

export const TypedField = <
  FormType extends UnpackNestedValue<FieldValuesFromControl<Control>>,
  Path extends DeepPath<FormType, Path>
>(
  props: TypedFieldProps<FormType, Path> &
    TypedFieldPropsWithChildren<FormType, Path>
) => {
  const {
    name,
    root,
    defaultValue,
    helperText,
    children,
    valueProvider,
    valueExtractor,
    formControlProps = { fullWidth: true },
    inputProps = {},
    variant = 'standard'
  } = props
  const { control, errors, setValue, trigger, formState } = useFormContext<
    FormType
  >()
  // @ts-expect-error
  const TypedController = useTypedController<FormType>({ control })
  const path = pathToString(name, root)
  const error = get(errors, path) as FieldError
  const hasError = formState.isSubmitted && Boolean(error)
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
  const [isFocused, setIsFocused] = useState(false)
  const elementProps = {
    ...{ ...inputProps, id: path },
    label: props.label,
    name: path,
    error: hasError,
    variant
  }

  return (
    <TypedController
      name={path}
      defaultValue={defaultValue}
      render={controllerProps => {
        return (
          <FormControl
            {...formControlProps}
            variant={variant}
            placeholder=''
            error={hasError}
          >
            {typeof children !== 'function' && (
              <InputLabel
                error={hasError}
                htmlFor={path}
                variant={variant}
                shrink={isFocused || hasValue(controllerProps.value)}
              >
                {props.label}
              </InputLabel>
            )}
            {typeof children === 'function'
              ? children({
                  ...elementProps,
                  ...controllerProps,
                  value: destructValue(controllerProps.value),
                  onChange: handleChange,
                  onFocus: () => setIsFocused(true),
                  onBlur: () => setIsFocused(false)
                })
              : cloneElement(children, {
                  ...elementProps,
                  ...controllerProps,
                  value: destructValue(controllerProps.value),
                  onChange: handleChange,
                  onFocus: () => setIsFocused(true),
                  onBlur: () => {
                    setIsFocused(false)
                    controllerProps.onBlur()
                  }
                })}
            {hasError || helperText !== undefined ? (
              <FormHelperText error={hasError}>
                {hasError ? error.message : helperText}
              </FormHelperText>
            ) : null}
          </FormControl>
        )
      }}
    />
  )
}
