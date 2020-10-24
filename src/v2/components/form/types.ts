import {
  DeepPath,
  DeepPathValue,
  FieldValuesFromControl,
  UnpackNestedValue
} from '@hookform/strictly-typed/dist/types'
import { Control } from 'react-hook-form'
import {
  FormControlLabelProps,
  FormControlProps,
  InputProps
} from '@material-ui/core'
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
  onFocus: (...event: any[]) => void
  onBlur: () => void
  value: DeepPathValue<FormType, Path>
  variant?: 'filled' | 'outlined' | 'standard'
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
  variant?: 'filled' | 'outlined' | 'standard'
}

export interface TypedFieldRenderComponentProps<TValue = any> {
  name: string
  error: boolean
  label: string
  value: TValue
  onChange: (...event: any[]) => void
  onFocus: () => void
  onBlur: () => void
  controllerProps: Control
}
