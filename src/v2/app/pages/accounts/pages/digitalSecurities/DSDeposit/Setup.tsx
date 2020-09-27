import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digitalSecurities/router'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'

export const DSDepositInput: React.FC = () => {
  const {
    params: { balanceId }
  } = useDSRouter()
  const { data } = useAllBalances()
  const balance = data.map[balanceId]

  return (
    <Box py={3} width={270}>
      <Typography>
        {balance.name} ({balance.symbol})
      </Typography>
    </Box>
  )
}
