import React, { PropsWithChildren } from 'react'
import { Form, FormProps } from 'v2/components/form/Form'
import { commitmentIssuanceValidationSchema } from 'v2/app/pages/invest/validation'
import { CommitmentIssuanceFormValues } from 'v2/types/commitment'
import { convertDateToISO } from 'v2/helpers/dates'
import { useCommitmentIssuance } from 'v2/app/pages/authorizer/hooks/useCommitmentIssuance'

export const CommitmentIssuanceForm = (
  props: PropsWithChildren<FormProps<CommitmentIssuanceFormValues>>
) => {
  const { children, ...rest } = props
  const [updateIssuance] = useCommitmentIssuance()
  const handleSubmit = async (args: CommitmentIssuanceFormValues) => {
    await updateIssuance({
      releaseDate: convertDateToISO(args.releaseDate),
      withdrawalAddress: args.withdrawalAddress
    })
  }

  return (
    <Form
      {...rest}
      onSubmit={handleSubmit}
      validationSchema={commitmentIssuanceValidationSchema}
    >
      {children}
    </Form>
  )
}
