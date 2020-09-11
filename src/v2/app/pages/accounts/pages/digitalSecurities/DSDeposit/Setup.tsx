import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'

export const DSDepositInput: React.FC = () => {
  const { balanceId } = useParams<{ balanceId: string }>()
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
