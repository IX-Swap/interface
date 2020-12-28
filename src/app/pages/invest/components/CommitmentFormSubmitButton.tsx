import React from 'react'
import { Submit } from 'components/form/Submit'
import { useCommitmentValidator } from 'app/pages/invest/hooks/useCommitmentValidator'

export interface CommitmentFormSubmitButtonProps {
  assetId: string
  minInvestment: number | null
}

export const CommitmentFormSubmitButton = (
  props: CommitmentFormSubmitButtonProps
) => {
  const { isValid } = useCommitmentValidator(props)

  return (
    <Submit color='primary' variant='contained' fullWidth disabled={!isValid}>
      Invest
    </Submit>
  )
}
