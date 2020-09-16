import React from 'react'
import { useParams } from 'react-router-dom'
import { BankPreview } from 'v2/app/components/BankPreview/BankPreview'
import { Box } from '@material-ui/core'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'

const ViewBank: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>()
  const { data, status } = useBanksData()

  if (status === 'loading') {
    return null
  }

  return (
    <Box p={4}>
      <BankPreview bank={data.map[bankId]} />
    </Box>
  )
}

export default ViewBank
