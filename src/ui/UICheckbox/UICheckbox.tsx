import { Checkbox } from '@mui/material'
import React from 'react'
import { CheckboxProps } from '@mui/material/Checkbox/Checkbox'
import { ReactComponent as EnabledSuccessIcon } from 'assets/icons/checkbox/success_icon.svg'
import { ReactComponent as DisabledLightSuccessIcon } from 'assets/icons/checkbox/light_disabled_success_icon.svg'
import { ReactComponent as DisabledDarkSuccessIcon } from 'assets/icons/checkbox/dark_disavled_success_icon.svg'
import { useTheme } from '@mui/material/styles'

export const UICheckbox = (props: CheckboxProps) => {
  const theme = useTheme()

  const getCheckedIcon = () => {
    const styles = { width: 20, height: 20 }

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

  return (
    <Checkbox {...props} disableTouchRipple checkedIcon={getCheckedIcon()} />
  )
}
