import { RadioGroup as MUIRadioGroup, RadioGroupProps } from '@mui/material'
import React from 'react'
import { TypedFieldRenderComponentProps } from 'components/form/types'

export interface RadioProps extends RadioGroupProps {
  children: React.ReactNode
}

export const RadioGroup = (
  props: RadioProps & TypedFieldRenderComponentProps<string>
) => {
  const { children, ...rest } = props

  return <MUIRadioGroup {...rest}>{children}</MUIRadioGroup>
}
