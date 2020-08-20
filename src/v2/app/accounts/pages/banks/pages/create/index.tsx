import React from 'react'
import { useStore } from 'v2/app/accounts/pages/banks/store'
import BankCreateForm from 'v2/app/accounts/pages/banks/components/bank-create-form'

const BankCreate = () => {
  const store = useStore()
  store.setTitle('Add a Bank Account')

  return <BankCreateForm />
}

export default BankCreate
