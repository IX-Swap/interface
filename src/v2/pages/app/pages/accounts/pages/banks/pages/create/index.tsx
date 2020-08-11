import React from 'react'
import { useStore } from '../../store'
import BankCreateForm from '../../components/bank-create-form'

const BankCreate = () => {
  const store = useStore()
  store.setTitle('Add a Bank Account')

  return <BankCreateForm />
}

export default BankCreate
