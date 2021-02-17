import {
  RadioGroup as MUIRadioGroup,
  FormControlLabelProps
} from '@material-ui/core'
import React from 'react'
import { TypedFieldRenderComponentProps } from 'components/form/types'

export interface RadioProps extends Omit<FormControlLabelProps, 'control'> {
  children: React.ReactNode
}

export const RadioGroup = (
  props: RadioProps & TypedFieldRenderComponentProps<string>
) => {
  const { name, value, children, onChange } = props

  return (
    <MUIRadioGroup name={name} onChange={onChange} value={value}>
      {children}
    </MUIRadioGroup>
  )
}
