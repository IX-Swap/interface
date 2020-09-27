import {
  DeepPath,
  DeepPathValue,
  FieldValuesFromControl,
  UnpackNestedValue
} from '@hookform/strictly-typed/dist/types'
import { Control } from 'react-hook-form'
import { FormControlProps, InputProps } from '@material-ui/core'
import React from 'react'

export interface ControllerRenderProps {
  name: string
  label: string
  value: any
  onChange: (...args: any[]) => any
  onBlur: (...args: any[]) => any
}

export interface TypedFieldChildProps<
  FormType extends UnpackNestedValue<FieldValuesFromControl<Control>>,
  Path extends DeepPath<FormType, Path>
> {
  label: string
  name: string
  onChange: (...event: any[]) => void
  onBlur: () => void
  value: DeepPathValue<FormType, Path>
}

export interface TypedFieldPropsWithChildren<
  FormType extends UnpackNestedValue<FieldValuesFromControl<Control>>,
  Path extends DeepPath<FormType, Path>
> {
  children:
    | ((props: TypedFieldChildProps<FormType, Path>) => React.ReactElement)
    | JSX.Element
}

export interface TypedFieldProps<
  FormType extends UnpackNestedValue<Record<string, any>>,
  Path extends DeepPath<FormType, Path>
> {
  name: Path
  defaultValue?: DeepPathValue<FormType, Path>
  label: string
  root?: string
  helperText?: string
  formControlProps?: Omit<FormControlProps, 'name'>
  inputProps?: Omit<InputProps, 'name'>
  valueExtractor?: (...args: any[]) => any
  valueProvider?: (...args: any[]) => any
}
