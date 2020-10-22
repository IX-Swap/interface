import React, { ElementType } from 'react'
import {
  DeepPath,
  DeepPathArray,
  DeepPathArrayValue,
  DeepPathValue,
  FieldValuesFromControl,
  UnpackNestedValue
} from '@hookform/strictly-typed/dist/types'
import {
  Control,
  useFieldArray,
  UseFieldArrayMethods,
  useFormContext,
  useWatch
} from 'react-hook-form'
import { pathToString } from 'v2/components/form/utils'
import { Maybe } from 'v2/types/util'

export interface FieldsArrayProps<
  TFieldValues extends Record<string, any>,
  TFieldName extends DeepPath<TFieldValues, TFieldName>,
  TControl extends Control
> {
  name: TFieldName
  control: TControl
  defaultValue?: DeepPathValue<TFieldValues, TFieldName>
  children: (
    args: UseFieldArrayMethods<
      DeepPathValue<TFieldValues, DeepPathArray<TFieldValues, ['1']>>
    >
  ) => Maybe<JSX.Element>
}

export const FieldsArray = <
  TFieldValues extends UnpackNestedValue<FieldValuesFromControl<TControl>>,
  TFieldName extends DeepPath<TFieldValues, TFieldName>,
  TControl extends Control
>(
  props: FieldsArrayProps<TFieldValues, TFieldName, TControl>
) => {
  const { control, name, children } = props
  const fieldArray = useFieldArray<
    DeepPathValue<TFieldValues, DeepPathArray<TFieldValues, ['1']>>
  >({
    control,
    name: pathToString(name)
  })

  return children(fieldArray)
}
