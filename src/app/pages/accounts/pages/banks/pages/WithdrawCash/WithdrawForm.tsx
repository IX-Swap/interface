import React from 'react'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { withdrawCashFormValidationSchema } from 'app/pages/accounts/validation'
import { useWithdrawCash } from 'app/pages/accounts/pages/banks/hooks/useWithdrawCash'
import { Form } from 'components/form/Form'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const WithdrawForm: React.FC = props => {
  const { children } = props
  const [withdrawCash] = useWithdrawCash()
  const { getFilterValue } = useQueryFilter()
  const virtualAccount = getFilterValue('account')
  const handleSubmit = async (values: WithdrawCashFormValues) => {
    return await withdrawCash({
      ...values,
      virtualAccount: virtualAccount ?? ''
    })
  }
  const { list, isLoading } = useVirtualAccount()

  if (list === undefined || list.length < 1 || isLoading) {
    return null
  }

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={{
        bankAccountId: null,
        amount: null,
        otp: null,
        paymentMethodName: null
      }}
      validationSchema={withdrawCashFormValidationSchema}
      shouldUnregister={false}
      mode='onSubmit'
      reValidateMode='onSubmit'
    >
      {children}
    </Form>
  )
}
