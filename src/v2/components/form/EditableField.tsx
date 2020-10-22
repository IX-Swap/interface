import React, { createElement, ElementType, useRef } from 'react'
import { useTypedController } from '@hookform/strictly-typed'
import {
  DeepPath,
  DeepPathValue,
  UnpackNestedValue,
  FieldValuesFromControl
} from '@hookform/strictly-typed/dist/types'
import { Control } from 'react-hook-form'
import { LabelledValue } from 'v2/components/LabelledValue'
import { OverrideProps } from '@material-ui/core/OverridableComponent'
import { pathToString } from 'v2/components/form/utils'
import { FormValue } from 'v2/components/form/FormValue'

export interface FormInputProps<
  TFieldValues extends Record<string, any>,
  TFieldName extends DeepPath<TFieldValues, TFieldName>,
  TControl extends Control
> {
  name: TFieldName
  label: string
  control: TControl
  defaultValue?: DeepPathValue<TFieldValues, TFieldName>
  component: ElementType
}

interface OverridableComponent {
  <
    TFieldValues extends UnpackNestedValue<FieldValuesFromControl<TControl>>,
    TFieldName extends DeepPath<TFieldValues, TFieldName>,
    TControl extends Control,
    C extends React.ElementType
  >(
    props: FormInputProps<TFieldValues, TFieldName, TControl> & {
      component: C
      valueExtractor?: (...args: any[]) => any
    } & OverrideProps<React.ComponentProps<C>, C>,
    context?: any
  ): JSX.Element
}

export const EditableField: OverridableComponent = props => {
  const {
    name,
    label,
    defaultValue,
    control,
    isEditing,
    component,
    valueExtractor,
    ...rest
  } = props
  const TypedController = useTypedController({ control })
  const path = pathToString(name)
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ...restArgs: any[]
  ): void => {
    const value =
      valueExtractor !== undefined
        ? valueExtractor(event, ...restArgs)
        : event.target.value
    control.setValue(path, value, { shouldValidate: true, shouldDirty: true })
    // eslint-disable-next-line no-void
    void control.trigger()
  }

  return (
    <TypedController
      name={name}
      defaultValue={defaultValue}
      render={controllerProps =>
        createElement(component, {
          ...controllerProps,
          ...rest,
          onChange: handleChange,
          label
        })
      }
    />
  )
}
