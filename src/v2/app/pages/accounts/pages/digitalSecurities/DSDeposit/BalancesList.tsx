import React from 'react'
import LabelValue from 'v1/components/LabelValue'
import { List, Box } from '@material-ui/core'
import { AssetBalance } from 'v2/types/balance'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digitalSecurities/router'

const balanceValues = [
  {
    label: 'Total Balance:',
    value: (ds: AssetBalance) => ds.balance
  },
  {
    label: 'On Hold Balance:',
    value: (ds: AssetBalance) => ds.onHold
  },
  {
    label: 'Available Balance:',
    value: (ds: AssetBalance) => ds.available
  }
]

export const BalancesList: React.FC = () => {
  const {
    params: { balanceId }
  } = useDSRouter()
  const { data } = useAllBalances()

  return (
    <Box py={2} style={{ width: '100%' }}>
      <List dense>
        {balanceValues.map((row, index) => (
          <LabelValue
            key={index}
            label={row.label}
            value={row.value(data.map[balanceId])}
          />
        ))}
      </List>
    </Box>
  )
}
