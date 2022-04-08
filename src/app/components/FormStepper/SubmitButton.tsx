import { Button } from '@mui/material'
import React from 'react'
import { MutationResultPair } from 'react-query'
import { ButtonProps } from '@mui/material/Button'
import { FormStepperStep } from 'app/components/FormStepper/FormStepper'

export interface SubmitButtonProps extends ButtonProps {
  mutation: MutationResultPair<any, any, any, any>
  data: any
  step: FormStepperStep
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const { mutation, data, step } = props

  const [save, { isLoading }] = mutation
  const isSubmitted = data?.status === 'Submitted'
  const isApproved = data?.status === 'Approved'

  const isValid: boolean =
    step.validationSchema?.isValidSync(step.getFormValues(data)) ?? true

  const handleSave = async () => {
    return await save(data._id)
  }

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={async () => void handleSave()}
      disabled={isApproved || isLoading || isSubmitted || !isValid}
      disableElevation
    >
      {isApproved ? 'Approved' : isSubmitted ? 'Submitted' : 'Submit'}
    </Button>
  )
}
