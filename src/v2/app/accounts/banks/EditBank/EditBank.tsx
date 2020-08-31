import React from 'react'
import { BankForm } from 'v2/app/accounts/banks/components/BankForm'
import { useUpdateBank } from 'v2/app/accounts/banks/hooks/useUpdateBank'
import { BankFormValues } from 'v2/app/accounts/types'
import { useParams } from 'react-router-dom'
import { useBanks } from 'v2/app/accounts/banks/hooks/useBanks'
import { useBanksRouter } from 'v2/app/accounts/banks/router'

export const EditBank: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>()
  const { push } = useBanksRouter()
  const { data, status } = useBanks()
  const { mutate: updateBank } = useUpdateBank({
    onSuccess: () => push('list')
  })
  const handleSubmit = async (values: BankFormValues): Promise<void> => {
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
