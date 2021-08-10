import React from 'react'
import { Form } from 'components/form/Form'
import { CommitmentInvestOTPDialog } from 'app/pages/accounts/components/Commitments/CommitmentInvestOTPDialog'

export interface CommitmentInvestForm {
  submit: (args: { otp: string }) => void
  close: () => void
  open: boolean
}

export const CommitmentInvestForm = ({
  submit,
  close,
  open
}: CommitmentInvestForm) => {
  const handleSubmit = async (args: { otp: string }) => {
    await submit(args)
  }
  return (
    <Form defaultValues={{ otp: '' }} onSubmit={handleSubmit}>
      <CommitmentInvestOTPDialog open={open} close={close} />
    </Form>
  )
}
