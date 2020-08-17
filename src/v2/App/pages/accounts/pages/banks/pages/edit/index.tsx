import React from 'react'
import { useStore } from '../../store'
import BankCreateForm from '../../components/bank-create-form'

const BankEdit = () => {
  const store = useStore()
  store.setTitle('Edit Bank Account Details')

  return <BankCreateForm bank={store.activeBank} />
}

export default BankEdit
