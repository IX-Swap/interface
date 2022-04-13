import React, { createElement, ElementType, useState } from 'react'
import { useTypedController } from '@hookform/strictly-typed'
import {
  DeepPath,
  DeepPathValue,
  UnpackNestedValue,
  FieldValuesFromControl
} from '@hookform/strictly-typed/dist/types'
import { Control } from 'react-hook-form'
import { OverrideProps } from '@mui/material/OverridableComponent'
import { getErrorFromControl, pathToString, hasValue } from 'helpers/forms'
import { FormControl, InputLabel, FormHelperText } from '@mui/material'
import { ErrorMessage } from '@hookform/error-message'

export interface TypedFieldProps<
  TFieldValues extends Record<string, any>,
  TFieldName extends DeepPath<TFieldValues, TFieldName>,
  TControl extends Control
> {
  name: TFieldName
  label?: string | JSX.Element
  control: TControl
  rootName?: string
  defaultValue?: DeepPathValue<TFieldValues, TFieldName>
  valueExtractor?: (...args: any[]) => any
  customRenderer?: boolean
  helperText?: string
  isErrorMessageEnabled?: boolean
  onChange?: (
    value: DeepPathValue<TFieldValues, TFieldName>,
    path: string,
    control: TControl
  ) => void
}

type FieldsToOverride =
  | 'name'
  | 'onChange'
  | 'value'
  | 'onBlur'
  | 'onFocus'
  | 'error'
  | 'defaultValue'
  | 'renderInput'

export const TypedField = <
  TFieldValues extends UnpackNestedValue<FieldValuesFromControl<TControl>>,
  TFieldName extends DeepPath<TFieldValues, TFieldName>,
  TControl extends Control,
  C extends ElementType
>(
  props: {
    component: C
  } & Omit<OverrideProps<React.ComponentProps<C>, C>, FieldsToOverride> &
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
    isErrorMessageEnabled = true,
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
      control.setValue(path, value, {
        shouldValidate: true,
        shouldDirty: true
      })
    }
  }
  const hasError = getErrorFromControl(path, control) !== undefined
  const hasHelperText = helperText !== undefined
  const [isFocused, setIsFocused] = useState(false)
  const hasStartAdornment = props.startAdornment !== undefined

  return (
    <TypedController
      name={path as any}
      defaultValue={defaultValue}
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
            helperText,
            value: controllerProps.value,
            id: path,
            name: path,
            error: hasError,
            path: path,
            onChange: handleChange,
            onFocus: () => setIsFocused(true),
            onBlur: () => {
              setIsFocused(false)
              controllerProps.onBlur()
            }
          })
        }
        // temporarily fix to prevent input label
        const displayName = String((component as any).displayName)

        const isTextField =
          (component as any)?.render?.name === 'TextField' ||
          displayName.startsWith('TextField')

        return (
          <FormControl fullWidth variant={rest?.variant}>
            {!isTextField && label !== undefined && (
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
            )}

            {createElement(component, {
              ...rest,
              ...controllerProps,
              ...elementProps,
              id: path,
              label,
              onChange: handleChange
            })}

            {!hasError && hasHelperText && (
              <FormHelperText>{helperText}</FormHelperText>
            )}

            {hasError && isErrorMessageEnabled && (
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
