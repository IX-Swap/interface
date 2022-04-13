import React from 'react'
import { useCommitmentValidator } from 'app/pages/invest/hooks/useCommitmentValidator'
import { useFormContext } from 'react-hook-form'
import { Button } from '@mui/material'
import { CommitmentFormValues } from 'types/commitment'
import { useMakeCommitment } from 'app/pages/invest/hooks/useMakeCommitment'

export interface CommitmentFormCommitButtonProps {
  assetId: string
  minInvestment: number | null
  currency: string
  dsoId?: string
  disabled: boolean
}

export const CommitmentFormCommitButton = ({
  assetId,
  minInvestment,
  dsoId,
  currency,
  disabled
}: CommitmentFormCommitButtonProps) => {
  const { isValid } = useCommitmentValidator({ assetId, minInvestment })
  const { handleSubmit } = useFormContext()
  const {
    commit: [makeCommitment]
  } = useMakeCommitment()

  const submit = handleSubmit(async (data: CommitmentFormValues) => {
    await makeCommitment({
      numberOfUnits: data.numberOfUnits,
      otp: data.otp,
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
      disabled={!isValid || disabled}
      type='button'
    >
      Commit
    </Button>
  )
}
