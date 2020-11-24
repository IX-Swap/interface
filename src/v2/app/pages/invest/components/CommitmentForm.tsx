import React, { PropsWithChildren } from 'react'
import { CommitmentFormValues } from 'v2/types/commitment'
import { FormProps, Form } from 'v2/components/form/Form'
import { useMakeCommitment } from 'v2/app/pages/invest/hooks/useMakeCommitment'
import { commitmentFormValidationSchema } from 'v2/app/pages/invest/validation'

export interface CommitmentFormProps {
  dso: string
  currency: string
}

export const CommitmentForm = (
  props: PropsWithChildren<
    CommitmentFormProps & FormProps<CommitmentFormValues>
  >
) => {
  const { dso, currency, children, ...rest } = props
  const [makeInvestment] = useMakeCommitment()
  const handleSubmit = async ({
    totalAmount,
    pricePerUnit,
    walletAddress,
    ...values
  }: CommitmentFormValues) => {
    await makeInvestment({
      ...values,
      walletAddress: walletAddress === '' ? undefined : walletAddress,
      signedSubscriptionDocument: values.signedSubscriptionDocument._id,
      dso,
      currency
    })
  }

  return (
    <Form
      {...rest}
      onSubmit={handleSubmit}
      validationSchema={commitmentFormValidationSchema}
    >
      {children}
    </Form>
  )
}
