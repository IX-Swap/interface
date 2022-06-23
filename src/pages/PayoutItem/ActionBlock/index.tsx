import React, { FC } from 'react'
import { Box } from 'rebass'

import { useCurrency } from 'hooks/Tokens'
import { PayoutEvent } from 'state/token-manager/types'

import { ManagerView } from './ManagerView'
import { UserView } from './UserView'

interface Props {
  payout: PayoutEvent
  isMyPayout: boolean
}

export const PayoutActionBlock: FC<Props> = ({ payout, isMyPayout }) => {
  const payoutToken = useCurrency(payout.payoutToken ?? undefined)
  return (
    <Box marginTop="16px">
      {isMyPayout ? (
        <ManagerView payout={payout} payoutToken={payoutToken} />
      ) : (
        <UserView payout={payout} payoutToken={payoutToken} />
      )}
    </Box>
  )
}
