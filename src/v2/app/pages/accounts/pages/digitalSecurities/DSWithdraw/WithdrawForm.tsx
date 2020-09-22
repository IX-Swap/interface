import React from 'react'
import { WithdrawDSFormValues } from 'v2/app/pages/accounts/types'
import { withdrawDSFormValidationSchema } from 'v2/app/pages/accounts/validation'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digitalSecurities/router'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'
import { useWithdrawDS } from 'v2/app/pages/accounts/pages/banks/hooks/useWithdrawDS'
import { createTypedForm } from 'v2/components/form/createTypedForm'

export const useDSWithdrawForm = createTypedForm<WithdrawDSFormValues>()

export const WithdrawForm: React.FC = props => {
  const { children } = props
  const { Form } = useDSWithdrawForm()
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
