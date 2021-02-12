import { Radio, RadioProps } from '@material-ui/core'
import React from 'react'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'

export interface SquareRadioProps extends RadioProps {}

export const SquareRadio = (props: SquareRadioProps) => {
  return (
    <Radio
      {...props}
      icon={<CheckBoxOutlineBlankIcon />}
      checkedIcon={<CheckBoxIcon />}
    />
  )
}
