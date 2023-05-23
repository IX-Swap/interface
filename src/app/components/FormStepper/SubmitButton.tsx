import { Box, Button, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MutationResultPair } from 'react-query'
import { ButtonProps } from '@mui/material/Button'
import { FormStepperStep } from 'app/components/FormStepper/FormStepper'

export interface SubmitButtonProps extends ButtonProps {
  mutation: MutationResultPair<any, any, any, any>
  data: any
  step: FormStepperStep
  submitText?: string
  customSchema?: any
  statusFieldName?: string
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const {
    mutation,
    data,
    step,
    fullWidth,
    size = 'large',
    submitText = 'KYC',
    customSchema = undefined,
    statusFieldName = 'status'
  } = props

  const [save, { isLoading }] = mutation
  const isSubmitted = data?.[statusFieldName] === 'Submitted'
  const isApproved = data?.[statusFieldName] === 'Approved'

  const [validating, setValidating] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const getButtonText = () => {
    if (isApproved) {
      return 'Approved'
    }

    if (isSubmitted) {
      return 'Submitted'
    }

    return `Submit ${submitText}`
  }

  useEffect(() => {
    void checkValidation()
  }, [data]) // eslint-disable-line

  const checkValidation = async () => {
    let schema: any
    if (customSchema !== undefined) {
      schema =
        typeof customSchema === 'function' ? customSchema(data) : customSchema
    } else {
      schema =
        typeof step.validationSchema === 'function'
          ? step.validationSchema(data)
          : step.validationSchema
    }

    setValidating(true)
    try {
      const isFormDataValid = await schema?.isValid(step.getFormValues(data))

      setIsValid(isFormDataValid)
    } catch (error) {
      console.log()
    } finally {
      setValidating(false)
    }
  }

  const handleSave = async () => {
    return await save(data)
  }

  return (
    <Tooltip
      title={
        !isValid && !isApproved && !isSubmitted ? (
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
          onClick={async () => await handleSave()}
          disabled={
            isApproved || isLoading || isSubmitted || validating || !isValid
          }
          disableElevation
          fullWidth={fullWidth}
          size={size}
          style={{ minWidth: 'max-content' }}
        >
          {getButtonText()}
        </Button>
      </Box>
    </Tooltip>
  )
}
