import React, { FC } from 'react'
import { Box } from 'rebass'

import { useCurrency } from 'hooks/Tokens'
import { PayoutEvent } from 'state/token-manager/types'

import { ManagerView } from './ManagerView'
import { UserView } from './UserView'
import { useAccount } from 'state/user/hooks'

interface Props {
  payout: PayoutEvent
  isMyPayout: boolean
  myAmount: number
  onUpdate?: () => void
}

export const PayoutActionBlock: FC<Props> = ({ payout, isMyPayout, myAmount, onUpdate }) => {
  const payoutToken = useCurrency(payout.payoutToken ?? undefined)

  useAccount()
  
  return (
    <Box marginTop="16px">
      {isMyPayout ? (
        <ManagerView payout={payout} payoutToken={payoutToken} onUpdate={onUpdate} />
      ) : (
        <UserView payout={payout} payoutToken={payoutToken} myAmount={myAmount}  />
      )}
    </Box>
  )
}
