import React from 'react'
import { FormControlLabel, RadioGroup, RadioGroupProps } from '@mui/material'
import { UIRadio } from 'components/UIRadio/UIRadio'

interface RadiosProps extends RadioGroupProps {
  items: Array<{ label: string; value: string | number }>
}

export const Radios = (props: RadiosProps) => {
  const { items, ...rest } = props
  return (
    <RadioGroup {...rest}>
      {items.map(item => (
        <FormControlLabel
          key={item.value}
          control={<UIRadio />}
          label={item.label}
          value={item.value}
        />
      ))}
    </RadioGroup>
  )
}
