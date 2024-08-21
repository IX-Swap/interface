import { PayoutHeaderCard } from 'pages/CreatePayoutEvent/styleds'
import React from 'react'
import { TYPE } from 'theme'

export const Info = () => {
  return (
    <PayoutHeaderCard marginTop="16px" marginBottom="32px">
      <TYPE.body style={{ fontWeight: '600' }}>What is an airdrop payout event?</TYPE.body>
      <TYPE.description8>Send tokens directly to users</TYPE.description8>
    </PayoutHeaderCard>
  )
}
