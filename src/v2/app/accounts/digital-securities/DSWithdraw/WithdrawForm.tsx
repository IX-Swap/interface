import React from 'react'
import { WithdrawDSFormValues } from 'v2/app/accounts/types'
import { withdrawDSFormValidationSchema } from 'v2/app/accounts/validation'
import { useParams } from 'react-router-dom'
import { useAllBalances } from 'v2/context/balances/useAllBalances'
import { useWithdrawDS } from 'v2/app/accounts/banks/hooks/useWithdrawDS'
import { useDSRouter } from 'v2/app/accounts/digital-securities/router'
import { Form } from 'v2/components/form/Form'

export const WithdrawForm: React.FC = props => {
  const { children } = props
  const { push } = useDSRouter()
  const { balanceId } = useParams<{ balanceId: string }>()
  const { data } = useAllBalances()
  const balance = data.map[balanceId]
  const { mutate: withdrawDS } = useWithdrawDS({
    onSuccess: () => push('list')
  })
  const handleSubmit = async (values: WithdrawDSFormValues): Promise<void> => {
    await withdrawDS({ ...values, asset: balance.assetId })
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationSchema={withdrawDSFormValidationSchema}
    >
      {children}
    </Form>
  )
}
