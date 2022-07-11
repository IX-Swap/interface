import React from 'react'
import MuiPhoneNumber, { MuiPhoneNumberProps } from 'material-ui-phone-number'

export const PhoneInput = (props: MuiPhoneNumberProps) => (
  <MuiPhoneNumber
    {...props}
    data-cy='user-phone'
    defaultCountry={'us'}
    variant='outlined'
    disableAreaCodes
    onChange={(...args: any[]) => {
      props.onChange?.(args[0])
    }}
    sx={{
      '.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.MuiPhoneNumber-flagButton > svg':
        {
          height: 30,
          width: 30
        }
    }}
  />
)
