import React from 'react'
import { useTypedForm } from 'v2/components/form/useTypedForm'

export const CommitmentFormSubmitButton = () => {
  const { Submit } = useTypedForm()

  return (
    <Submit color='primary' variant='contained' fullWidth>
      Invest
    </Submit>
  )
}
