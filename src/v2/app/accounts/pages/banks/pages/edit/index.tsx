import React from 'react'
import { useStore } from 'v2/app/accounts/pages/banks/store'
import BankCreateForm from 'v2/app/accounts/pages/banks/components/bank-create-form'

const BankEdit = () => {
  const store = useStore()
  store.setTitle('Edit Bank Account Details')

  return <BankCreateForm bank={store.activeBank} />
}

export default BankEdit
