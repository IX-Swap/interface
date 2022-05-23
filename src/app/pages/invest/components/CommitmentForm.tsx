import React, { PropsWithChildren } from 'react'
import { CommitmentFormValues } from 'types/commitment'
import { FormProps, Form } from 'components/form/Form'
import { useMakeCommitment } from 'app/pages/invest/hooks/useMakeCommitment'
import {
  commitmentCampaignValidationSchema,
  commitmentNonCampaignValidationSchema
} from 'app/pages/invest/validation'

export interface CommitmentFormProps {
  dso: string
  currency: string
  isCampaign?: boolean
}

export const CommitmentForm = (
  props: PropsWithChildren<
    CommitmentFormProps & FormProps<CommitmentFormValues>
  >
) => {
  const { dso, currency, children, isCampaign = false, ...rest } = props
  const validationSchema = isCampaign
    ? commitmentCampaignValidationSchema
    : commitmentNonCampaignValidationSchema
  const {
    invest: [makeInvestment]
  } = useMakeCommitment()
  const handleSubmit = async ({
    totalAmount,
    pricePerUnit,
    withdrawalAddress,
    ...values
  }: CommitmentFormValues) => {
    await makeInvestment({
      ...values,
      withdrawalAddress:
        withdrawalAddress === '' ? undefined : withdrawalAddress,
      signedSubscriptionDocument: values.signedSubscriptionDocument?._id,
      dso,
      currency
    })
  }

  return (
    <Form {...rest} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {children}
    </Form>
  )
}
