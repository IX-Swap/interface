import { Checkbox } from '@mui/material'
import React from 'react'
import { CheckboxProps } from '@mui/material/Checkbox/Checkbox'
import { ReactComponent as EnabledSuccessIcon } from 'assets/icons/checkbox/success_icon.svg'
import { ReactComponent as DisabledLightSuccessIcon } from 'assets/icons/checkbox/light_disabled_success_icon.svg'
import { ReactComponent as DisabledDarkSuccessIcon } from 'assets/icons/checkbox/dark_disabled_success_icon.svg'
import { useTheme } from '@mui/material/styles'

export interface UICheckboxProps extends CheckboxProps {
  width?: number
  height?: number
}

export const UICheckbox = ({
  width = 16,
  height = 16,
  ...props
}: UICheckboxProps) => {
  const theme = useTheme()
  const styles = { width, height }

  const getCheckedIcon = () => {
    if (
      theme.palette.mode === 'light' &&
      props.disabled !== undefined &&
      props.disabled
    ) {
      return <DisabledLightSuccessIcon style={styles} />
    }

    if (props.disabled !== undefined && props.disabled) {
      return <DisabledDarkSuccessIcon style={styles} />
    }

    return <EnabledSuccessIcon style={styles} />
  }

  return <Checkbox {...props} checkedIcon={getCheckedIcon()} />
}
