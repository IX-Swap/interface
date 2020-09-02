import React from 'react'
import { BankForm } from 'v2/app/pages/accounts/pages/banks/components/BankForm'
import { useCreateBank } from 'v2/app/pages/accounts/pages/banks/hooks/useCreateBank'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'

export const CreateBank: React.FC = () => {
  const { push } = useBanksRouter()
  const { mutate: createBank } = useCreateBank({
    onSuccess: () => push('list')
  })

  return <BankForm submitButtonLabel='Add Bank Account' onSubmit={createBank} />
}
