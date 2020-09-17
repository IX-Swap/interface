import React from 'react'
import { BankPreview } from 'v2/app/components/BankPreview/BankPreview'
import { Box } from '@material-ui/core'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'

const ViewBank: React.FC = () => {
  const { params } = useBanksRouter()
  const { data, status } = useBanksData()

  if (status === 'loading') {
    return null
  }

  return (
    <Box p={4}>
      <BankPreview bank={data.map[params.bankId]} />
    </Box>
  )
}

export default ViewBank
