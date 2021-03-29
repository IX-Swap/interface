import React from 'react'
import { useParams } from 'react-router-dom'
import { WithdrawDSFormValues } from 'app/pages/accounts/types'
import { withdrawDSFormValidationSchema } from 'app/pages/accounts/validation'
import { useAllBalances } from 'hooks/balance/useAllBalances'
import { useWithdrawDS } from 'app/pages/accounts/pages/banks/hooks/useWithdrawDS'
import { Form } from 'components/form/Form'

export const WithdrawForm: React.FC = props => {
  const { children } = props
  const { data } = useAllBalances()
  const params = useParams<{ balanceId: string }>()
  const balance = data.map[params.balanceId]
  const [withdrawDS] = useWithdrawDS()
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
