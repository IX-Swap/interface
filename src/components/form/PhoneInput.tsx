import React from 'react'
import MuiPhoneNumber, {
  MaterialUiPhoneNumberProps
} from 'material-ui-phone-number'

export const PhoneInput = (props: MaterialUiPhoneNumberProps): JSX.Element => {
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
