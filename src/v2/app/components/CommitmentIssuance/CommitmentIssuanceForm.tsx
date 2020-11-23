import React, { PropsWithChildren } from 'react'
import { Form, FormProps } from 'v2/components/form/Form'
import { commitmentIssuanceValidationSchema } from 'v2/app/pages/invest/validation'
import { CommitmentIssuanceFormValues } from 'v2/types/commitment'
import { convertDateToISO } from 'v2/helpers/dates'

export const CommitmentIssuanceForm = (
  props: PropsWithChildren<FormProps<CommitmentIssuanceFormValues>>
) => {
  const { children, ...rest } = props
  const handleSubmit = async (args: CommitmentIssuanceFormValues) => {
    console.log(convertDateToISO(args.releaseDate))
    console.log(args.withdrawalAddress)
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
