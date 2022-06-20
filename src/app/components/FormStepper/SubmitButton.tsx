import { Box, Button, Tooltip, Typography } from '@mui/material'
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
  const { mutation, data, step, fullWidth } = props

  const [save, { isLoading }] = mutation
  const isSubmitted = data?.status === 'Submitted'
  const isApproved = data?.status === 'Approved'

  const isValid: boolean =
    step.validationSchema?.isValidSync(step.getFormValues(data)) ?? false

  const handleSave = async () => {
    return await save(data._id)
  }

  return (
    <Tooltip
      title={
        !isValid ? (
          <Typography color='error'>
            Please fill in all the required steps
          </Typography>
        ) : (
          ''
        )
      }
      placement='top'
      arrow
    >
      <Box>
        <Button
          variant='contained'
          color='primary'
          onClick={async () => void handleSave()}
          disabled={isApproved || isLoading || isSubmitted || !isValid}
          disableElevation
          fullWidth={fullWidth}
          size='large'
        >
          {isApproved
            ? 'Approved'
            : isSubmitted
            ? 'Submitted'
            : 'Submit Identity'}
        </Button>
      </Box>
    </Tooltip>
  )
}
