import {
  DeepPath,
  DeepPathArray,
  DeepPathValue,
  FieldValuesFromControl,
  UnpackNestedValue
} from '@hookform/strictly-typed/dist/types'
import { Control, useFieldArray, UseFieldArrayMethods } from 'react-hook-form'
import { pathToString } from 'helpers/forms'
import { Maybe } from 'types/util'

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
      DeepPathValue<TFieldValues, DeepPathArray<TFieldValues, ['0']>>
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
    // @ts-expect-error
    DeepPathValue<TFieldValues, DeepPathArray<TFieldValues, ['0']>>
  >({
    control,
    name: pathToString(name)
  })

  return children(fieldArray)
}
