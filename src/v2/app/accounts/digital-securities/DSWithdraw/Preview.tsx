import React from 'react'
import { Summary } from 'v2/app/accounts/digital-securities/DSWithdraw/Summary'
import { OTP } from '../../banks/components/OTP'
import { SubmitButton } from 'v2/components/form/SubmitButton'

export const Preview: React.FC = () => {
  return (
    <>
      <Summary />
      <OTP />
      <SubmitButton>Confirm Withdraw</SubmitButton>
    </>
  )
}
