import { Box, Button, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MutationResultPair } from 'react-query'
import { ButtonProps } from '@mui/material/Button'
import { FormStepperStep } from 'app/components/FormStepper/FormStepper'
import { isEmpty } from 'lodash'
import { useFormContext } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
export interface ConditionProps {
  completed: boolean
  active: boolean
  error: boolean
}
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
  mainConditions: any
  rawData: any
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
    stepValues,
    rawData
  } = props

  const location = useLocation()
  const [save, { isLoading }] = mutation
  const [disabled, setDisabled] = useState(true)
  const { trigger, errors, watch } = useFormContext()
  const [validating, setValidating] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const c0 = localStorage.getItem('conditions_0')
  const c1 = localStorage.getItem('conditions_1')
  const c2 = localStorage.getItem('conditions_2')
  const isEdit = location.pathname.includes('/edit')
  const shouldEnableSubmit = (): boolean => {
    if (c0 !== null && c1 !== null && c2 !== null) {
      const cond0: ConditionProps = JSON.parse(c0)
      const cond1: ConditionProps = JSON.parse(c1)
      const cond2: ConditionProps = JSON.parse(c2)
      const first = cond0.completed && !cond0.error
      const second = cond1.completed && !cond1.error
      const third = cond2.completed && !cond2.error

      return first && second && third
    }

    return false
  }
  const isSubmitted = rawData?.status === 'Submitted'
  const isApproved = rawData?.status === 'Approved'
  //   const isDrafts= rawData?.status === "Draft"
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
    const disable =
      !shouldEnableSubmit() ||
      isApproved ||
      isLoading ||
      isSubmitted ||
      validating ||
      !isEmpty(errors)

    setDisabled(disable)
  }, [data, errors]) // eslint-disable-line

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
        disabled && !isEdit ? (
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
          onClick={async () => {
            if (!disabled || isEdit) {
              return await handleSave()
            }
          }}
          disabled={activeStep !== 2 || disabled && !isEdit } // draft mode dso button enable
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
