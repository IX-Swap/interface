import React from 'react'
import { WithdrawDSFormValues } from 'app/pages/accounts/types'
import { withdrawDSFormValidationSchema } from 'app/pages/accounts/validation'
import { useDSRouter } from 'app/pages/accounts/pages/digitalSecurities/router'
import { useAllBalances } from 'hooks/balance/useAllBalances'
import { useWithdrawDS } from 'app/pages/accounts/pages/banks/hooks/useWithdrawDS'
import { Form } from 'components/form/Form'

export const WithdrawForm: React.FC = props => {
  const { children } = props
  const {
    params: { balanceId }
  } = useDSRouter()
  const { data } = useAllBalances()
  const balance = data.map[balanceId]
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
