import React from 'react'
import { useCommitmentValidator } from 'app/pages/invest/hooks/useCommitmentValidator'
import { Button } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { useMakeCommitment } from 'app/pages/invest/hooks/useMakeCommitment'
import { CommitmentFormValues } from 'types/commitment'

export interface CommitmentFormSubmitButtonProps {
  assetId: string
  minInvestment: number | null
  dsoId: string
  currency: string
}

export const CommitmentFormSubmitButton = ({
  assetId,
  minInvestment,
  dsoId,
  currency
}: CommitmentFormSubmitButtonProps) => {
  const { isValid } = useCommitmentValidator({ assetId, minInvestment })
  const {
    invest: [makeInvestment]
  } = useMakeCommitment()
  const { handleSubmit } = useFormContext()

  const submit = handleSubmit(async (data: CommitmentFormValues) => {
    console.log({ data })
    await makeInvestment({
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
      color='primary'
      variant='contained'
      fullWidth
      disabled={!isValid}
      disableElevation
      type='button'
      onClick={handleClick}
    >
      Invest
    </Button>
  )
}
