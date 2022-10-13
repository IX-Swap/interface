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
import {
  getErrorFromControl,
  pathToString,
  hasValue,
  showInputLabel
} from 'helpers/forms'
import { FormControl, InputLabel, FormHelperText } from '@mui/material'
import { ErrorMessage } from '@hookform/error-message'
import { useTheme } from '@mui/material/styles'

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
  isOptional?: boolean
  optionalText?: string
  helperText?: string
  isErrorMessageEnabled?: boolean
  onChange?: (
    value: DeepPathValue<TFieldValues, TFieldName>,
    path: string,
    control: TControl
  ) => void
  displayEmpty?: boolean
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
    isOptional = false,
    optionalText = '',
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
  const theme = useTheme()
  const greyText = theme.palette.mode === 'dark' ? 500 : 600

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
            label: isOptional ? (
              <div>
                {label}
                <span
                  style={{
                    color: theme.palette.grey[greyText],
                    marginLeft: '0.5rem'
                  }}
                >
                  {optionalText !== '' ? optionalText : '(Optional)'}
                </span>
              </div>
            ) : (
              label
            ),
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
        // TODO: When all inputs are replaced, use new input label
        return (
          <FormControl fullWidth variant={rest?.variant}>
            {showInputLabel(component) && label !== undefined && !isOptional && (
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
              placeholder: hasHelperText ? helperText : '',
              id: path,
              label: isOptional ? (
                <div>
                  {label}
                  <span
                    style={{
                      color: theme.palette.grey[greyText],
                      marginLeft: '0.5rem'
                    }}
                  >
                    {optionalText !== '' ? optionalText : '(Optional)'}
                  </span>
                </div>
              ) : (
                label
              ),
              onChange: handleChange
            })}

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
