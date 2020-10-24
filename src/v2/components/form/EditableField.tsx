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
import { pathToString } from 'v2/components/form/utils'
import { FormControl, InputLabel, FormHelperText } from '@material-ui/core'
import { hasValue } from 'v2/components/form/createTypedField'
import { ErrorMessage } from '@hookform/error-message'
import { TypedFieldRenderComponentProps } from 'v2/components/form/types'

export interface EditableFieldProps<
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
  customRenderer?: (
    props: TypedFieldRenderComponentProps<
      DeepPathValue<TFieldValues, TFieldName>
    >
  ) => JSX.Element
}

export const EditableField = <
  TFieldValues extends UnpackNestedValue<FieldValuesFromControl<TControl>>,
  TFieldName extends DeepPath<TFieldValues, TFieldName>,
  TControl extends Control,
  C extends ElementType
>(
  props: {
    component?: C
  } & Omit<OverrideProps<React.ComponentProps<C>, C>, 'name'> &
    EditableFieldProps<TFieldValues, TFieldName, TControl>
) => {
  const {
    name,
    label,
    defaultValue,
    control,
    isEditing,
    component,
    valueExtractor,
    customRenderer,
    rootName,
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
    control.setValue(path, value, { shouldValidate: true, shouldDirty: true })
    void control.trigger()
  }
  const hasError = control.formStateRef.current.errors[path] !== undefined
  const [isFocused, setIsFocused] = useState(false)

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

        if (customRenderer !== undefined) {
          return customRenderer({
            controllerProps: control,
            value: controllerProps.value as any,
            label,
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
              shrink={isFocused || hasValue(controllerProps.value)}
              error={hasError}
            >
              {label}
            </InputLabel>

            {createElement(component as C, {
              ...rest,
              ...elementProps,
              ...controllerProps,
              onChange: handleChange
            })}

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
