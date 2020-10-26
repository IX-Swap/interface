import { Control } from 'react-hook-form'

export interface TypedFieldRenderComponentProps<TValue = any> {
  name: string
  error: boolean
  label: string
  value: TValue
  onChange: (...event: any[]) => void
  onFocus: () => void
  onBlur: () => void
  control: Control
}
