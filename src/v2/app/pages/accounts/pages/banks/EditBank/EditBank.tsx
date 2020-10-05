import React from 'react'
import { BankForm } from 'v2/app/pages/accounts/pages/banks/components/BankForm'
import { useUpdateBank } from 'v2/app/pages/accounts/pages/banks/hooks/useUpdateBank'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { BankArgs } from '../service/types'

export const EditBank: React.FC = () => {
  const {
    params: { bankId }
  } = useBanksRouter()
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
