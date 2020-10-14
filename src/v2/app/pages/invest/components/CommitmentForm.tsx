import React, { PropsWithChildren } from 'react'
import { CommitmentFormValues } from 'v2/types/commitment'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { FormProps } from 'v2/components/form/Form'
import { useMakeCommitment } from 'v2/app/pages/invest/hooks/useMakeCommitment'
import { commitmentFormValidationSchema } from 'v2/app/pages/invest/validation'

export const useCommitmentForm = createTypedForm<CommitmentFormValues>()

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
  const { Form } = useCommitmentForm()
  const [makeInvestment] = useMakeCommitment()
  const handleSubmit = async ({
    totalAmount,
    pricePerUnit,
    ...values
  }: CommitmentFormValues) => {
    await makeInvestment({
      ...values,
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
