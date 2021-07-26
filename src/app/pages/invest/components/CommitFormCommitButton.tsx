import React from 'react'
import { useCommitmentValidator } from 'app/pages/invest/hooks/useCommitmentValidator'
import { useFormContext } from 'react-hook-form'
import { Button } from '@material-ui/core'
import { CommitmentFormValues } from 'types/commitment'
import { useMakeCommitment } from 'app/pages/invest/hooks/useMakeCommitment'

export interface CommitmentFormCommitButtonProps {
  assetId: string
  minInvestment: number | null
  dsoId: string
  currency: string
}

export const CommitmentFormCommitButton = ({
  assetId,
  minInvestment,
  dsoId,
  currency
}: CommitmentFormCommitButtonProps) => {
  const { isValid } = useCommitmentValidator({ assetId, minInvestment })
  const { handleSubmit } = useFormContext()
  const {
    commit: [makeCommitment]
  } = useMakeCommitment()

  const submit = handleSubmit(async (data: CommitmentFormValues) => {
    await makeCommitment({
      ...data,
      withdrawalAddress:
        data.withdrawalAddress === '' ? undefined : data.withdrawalAddress,
      signedSubscriptionDocument: data.signedSubscriptionDocument?._id,
      dso: dsoId,
      currency
    })
  })

  const handleClick = () => {
    void submit()
  }

  return (
    <Button
      onClick={handleClick}
      data-type='commit'
      color='primary'
      variant='outlined'
      fullWidth
      disabled={!isValid}
      type='button'
    >
      Commit
    </Button>
  )
}
