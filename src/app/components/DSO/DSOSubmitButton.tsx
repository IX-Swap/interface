import { Box, Button, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MutationResultPair } from 'react-query'
import { ButtonProps } from '@mui/material/Button'
import { FormStepperStep } from 'app/components/FormStepper/FormStepper'
import { isEmpty } from 'lodash'
import { useFormContext } from 'react-hook-form'

export interface SubmitButtonProps extends ButtonProps {
  mutation: MutationResultPair<any, any, any, any>
  data: any
  step: FormStepperStep
  submitText?: string
  customSchema?: any
  completed: number[]
  activeStep: number
  removeComplete: any
  setStepValues: any
  stepValues: any
}

export const DSOSubmitButton = (props: SubmitButtonProps) => {
  const {
    mutation,
    data,
    step,
    fullWidth,
    size = 'large',
    submitText = 'Identity',
    customSchema = undefined,
    completed,
    activeStep,
    removeComplete,
    setStepValues,
    stepValues
  } = props

  const [save, { isLoading }] = mutation
  const isSubmitted = data?.status === 'Submitted'
  const isApproved = data?.status === 'Approved'
  const { trigger, errors, watch } = useFormContext()
  const [validating, setValidating] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const allCompleted =
    completed?.includes(0) && completed?.includes(1) && completed?.includes(2)
  const values = watch()
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
      console.log('error', error)
    } finally {
      setValidating(false)
    }
  }

  const handleSave = async () => {
    const newValues = [...stepValues]
    await trigger()
    newValues[activeStep] = { values, errors: { ...errors } }
    setStepValues(newValues)
    if (isEmpty(errors)) {
      // eslint-disable-next-line
      return await save(data)
    } else {
      if (completed.includes(activeStep)) {
        removeComplete(activeStep, completed)
      }
    }
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
            isApproved ||
            isLoading ||
            isSubmitted ||
            validating ||
            (completed !== undefined ? !allCompleted : !isValid)
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
