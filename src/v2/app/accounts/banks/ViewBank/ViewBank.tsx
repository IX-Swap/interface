import React from 'react'
import { useParams } from 'react-router-dom'
import BankPreview from 'v2/app/components/bank-preview'
import { Box } from '@material-ui/core'
import { useBanks } from 'v2/app/accounts/banks/hooks/useBanks'

const ViewBank: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>()
  const { data, status } = useBanks()

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
