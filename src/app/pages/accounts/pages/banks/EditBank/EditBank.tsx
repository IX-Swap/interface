import React from 'react'
import { BankForm } from 'app/pages/accounts/pages/banks/components/BankForm'
import { useUpdateBank } from 'app/pages/accounts/pages/banks/hooks/useUpdateBank'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { BankArgs } from 'app/pages/accounts/types'
import { useParams } from 'react-router-dom'

export const EditBank: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>()
  console.log(bankId)
  const { data, status } = useBanksData()
  const [updateBank] = useUpdateBank()

  const handleSubmit = async (values: BankArgs): Promise<void> => {
    await updateBank({ ...values, bankId })
  }

  if (status === 'loading') {
    return null
  }

  return (
    <BankForm
      submitButtonLabel='Save'
      bank={data.map[bankId]}
      onSubmit={handleSubmit}
    />
  )
}
