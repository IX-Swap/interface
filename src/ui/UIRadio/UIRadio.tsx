import { Radio } from '@mui/material'
import React from 'react'
import { CheckboxProps } from '@mui/material/Checkbox/Checkbox'
import { ReactComponent as CheckedIcon } from 'assets/icons/radio/checked.svg'
import { ReactComponent as DisabledLightIcon } from 'assets/icons/radio/disabled_light.svg'
import { ReactComponent as DisabledDarkIcon } from 'assets/icons/radio/disabled_dark.svg'
import { useTheme } from '@mui/material/styles'

export interface UIRadioProps extends CheckboxProps {
  width?: number
  height?: number
}

export const UIRadio = ({
  width = 16,
  height = 16,
  ...props
}: UIRadioProps) => {
  const theme = useTheme()
  const styles = { width, height }

  const getCheckedIcon = () => {
    if (
      theme.palette.mode === 'light' &&
      props.disabled !== undefined &&
      props.disabled
    ) {
      return <DisabledLightIcon style={styles} />
    }

    if (props.disabled !== undefined && props.disabled) {
      return <DisabledDarkIcon style={styles} />
    }

    return <CheckedIcon style={styles} />
  }

  return <Radio {...props} checkedIcon={getCheckedIcon()} />
}
