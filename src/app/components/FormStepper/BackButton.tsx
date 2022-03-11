import React, { Fragment } from 'react'
import { Button, ButtonProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { MutationResultPair } from 'react-query'

export interface BackButtonProps extends Omit<ButtonProps, 'onClick'> {
  mutation: MutationResultPair<any, any, any, any>
  getRequestPayload: (data: any) => any
  shouldSaveStep: boolean
  isLastStep: boolean
  nextStep: number
  setActiveStep: (step: number) => any
}

export const BackButton = (props: BackButtonProps) => {
  const {
    mutation,
    children,
    getRequestPayload,
    variant = 'outlined',
    shouldSaveStep,
    isLastStep,
    setActiveStep,
    nextStep
  } = props
  const [save, { isLoading }] = mutation
  const {
    watch,
    formState: { dirtyFields }
  } = useFormContext()
  const values = watch()

  const handleSave = async () => {
    if (isLastStep) {
      setActiveStep(nextStep)
      return
    }

    const isDirty = Object.values(dirtyFields).length > 0
    const payload = getRequestPayload(values)

    if (shouldSaveStep) {
      payload.step = nextStep
    }

    if (isDirty) {
      await save(payload).then(() => setActiveStep(nextStep))
    } else {
      setActiveStep(nextStep)
    }
  }

  return (
    <Fragment>
      <Button
        {...props}
        variant={variant}
        color='primary'
        onClick={handleSave}
        disabled={isLoading}
        disableElevation
      >
        {children}
      </Button>
    </Fragment>
  )
}
