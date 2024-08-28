import React from 'react'
import { TYPE } from 'theme'
import { PayoutHeaderCard } from './styleds'

export const Info = () => {
  return (
    <PayoutHeaderCard marginTop="16px" marginBottom="32px">
      <TYPE.body style={{ fontWeight: '600' }}>What is a claim payout event?</TYPE.body>
      <TYPE.description8>Users need to manually claim payout</TYPE.description8>
    </PayoutHeaderCard>
  )
}
