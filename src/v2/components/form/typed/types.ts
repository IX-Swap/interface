import {
  DeepPath,
  DeepPathValue,
  FieldValuesFromControl,
  UnpackNestedValue
} from '@hookform/strictly-typed/dist/types'
import { Control } from 'react-hook-form'

export interface TypedFormFieldProps<
  FormType extends UnpackNestedValue<FieldValuesFromControl<Control>>,
  Path extends DeepPath<FormType, Path>
> {
  name: Path
  defaultValue?: DeepPathValue<FormType, Path>
}
