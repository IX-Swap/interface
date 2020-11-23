import React, { createElement, ElementType, useState } from 'react'
import { useTypedController } from '@hookform/strictly-typed'
import {
  DeepPath,
  DeepPathValue,
  UnpackNestedValue,
  FieldValuesFromControl
} from '@hookform/strictly-typed/dist/types'
import { Control } from 'react-hook-form'
import { OverrideProps } from '@material-ui/core/OverridableComponent'
import { getErrorFromControl, pathToString, hasValue } from 'v2/helpers/forms'
import { FormControl, InputLabel, FormHelperText } from '@material-ui/core'
import { ErrorMessage } from '@hookform/error-message'

export interface TypedFieldProps<
  TFieldValues extends Record<string, any>,
  TFieldName extends DeepPath<TFieldValues, TFieldName>,
  TControl extends Control
> {
  name: TFieldName
  label: string
  control: TControl
  rootName?: string
  defaultValue?: DeepPathValue<TFieldValues, TFieldName>
  valueExtractor?: (...args: any[]) => any
  customRenderer?: boolean
  helperText?: string
  onChange?: (
    value: DeepPathValue<TFieldValues, TFieldName>,
    path: string,
    control: TControl
  ) => void
}

export const TypedField = <
  TFieldValues extends UnpackNestedValue<FieldValuesFromControl<TControl>>,
  TFieldName extends DeepPath<TFieldValues, TFieldName>,
  TControl extends Control,
  C extends ElementType
>(
  props: {
    component: C
  } & Omit<OverrideProps<React.ComponentProps<C>, C>, 'name'> &
    TypedFieldProps<TFieldValues, TFieldName, TControl>
) => {
  const {
    name,
    label,
    defaultValue,
    control,
    isEditing,
    component,
    valueExtractor,
    customRenderer = false,
    rootName,
    helperText,
    onChange,
    ...rest
  } = props
  const TypedController = useTypedController({ control })
  const path = pathToString(name, rootName)
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ...restArgs: any[]
  ): void => {
    const value =
      valueExtractor === undefined
        ? event.target.value
        : valueExtractor(event, ...restArgs)

    if (onChange !== undefined) {
      onChange(value, path, control)
    } else {
      control.setValue(path, value, { shouldValidate: true, shouldDirty: true })
    }
  }
  const hasError = getErrorFromControl(path, control) !== undefined
  const hasHelperText = helperText !== undefined
  const [isFocused, setIsFocused] = useState(false)
  const hasStartAdornment = props.startAdornment !== undefined

  return (
    <TypedController
      name={path}
      defaultValue={defaultValue as any}
      render={controllerProps => {
        const elementProps = {
          ...rest,
          error: hasError,
          onChange: handleChange,
          onFocus: () => setIsFocused(true),
          onBlur: () => {
            setIsFocused(false)
            controllerProps.onBlur()
          }
        }

        if (customRenderer) {
          return createElement(component, {
            ...rest,
            control,
            label,
            value: controllerProps.value as any,
            id: path,
            name: path,
            error: hasError,
            onChange: handleChange,
            onFocus: () => setIsFocused(true),
            onBlur: () => {
              setIsFocused(false)
              controllerProps.onBlur()
            }
          })
        }

        return (
          <FormControl fullWidth>
            <InputLabel
              htmlFor={path}
              variant={rest?.variant}
              error={hasError}
              shrink={
                hasStartAdornment ||
                isFocused ||
                hasValue(controllerProps.value) ||
                (props.displayEmpty === true && controllerProps.value === '')
              }
            >
              {label}
            </InputLabel>

            {createElement(component, {
              ...rest,
              ...controllerProps,
              ...elementProps,
              id: path,
              onChange: handleChange
            })}

            {!hasError && hasHelperText && (
              <FormHelperText>{helperText}</FormHelperText>
            )}

            {hasError && (
              <ErrorMessage
                errors={control.formStateRef.current.errors}
                name={path}
                render={({ message }) => (
                  <FormHelperText error>{message}</FormHelperText>
                )}
              />
            )}
          </FormControl>
        )
      }}
    />
  )
}
