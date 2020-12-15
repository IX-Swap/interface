import React, { PropsWithChildren } from 'react'
import { Form, FormProps } from 'components/form/Form'
import { commitmentIssuanceValidationSchema } from 'app/pages/invest/validation'
import { CommitmentIssuanceFormValues } from 'types/commitment'
import { convertDateToISO } from 'helpers/dates'
import { useCommitmentIssuance } from 'app/pages/authorizer/hooks/useCommitmentIssuance'

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
