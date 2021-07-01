import React from 'react'
import { InputProps } from '@material-ui/core'
import MuiPhoneNumber from 'material-ui-phone-number'

export const PhoneInput = (props: InputProps): JSX.Element => {
  return (
    <MuiPhoneNumber
      {...props}
      data-cy='user-phone'
      defaultCountry={'us'}
      variant='outlined'
      disableAreaCodes
      onChange={(...args: any[]) => {
        props.onChange?.(args[0])
      }}
    />
  )
}
