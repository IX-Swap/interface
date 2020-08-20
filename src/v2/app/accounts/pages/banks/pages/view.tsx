import React from 'react'
import { useStore } from 'v2/app/accounts/pages/banks/store'
import { Redirect } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import BankPreview from 'v2/app/components/bank-preview'
import { Box } from '@material-ui/core'

const ViewBank = () => {
  const banksPageStore = useStore()
  banksPageStore.setTitle('View Bank Account')

  return useObserver(() => {
    if (!banksPageStore.activeBank) {
      return <Redirect to='./' />
    }

    return (
      <Box p={4}>
        <BankPreview bank={banksPageStore.activeBank} />
      </Box>
    )
  })
}

export default ViewBank
