import React, { Fragment } from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { MutationResultPair } from 'react-query'

export interface MoveButtonProps extends Omit<ButtonProps, 'onClick'> {
  mutation: MutationResultPair<any, any, any, any>
  getRequestPayload: (data: any) => any
  shouldUpdateStep: boolean
  nextStep: number
  isBack?: boolean
  onClick: (step: number) => any
}

export const MoveButton = (props: MoveButtonProps) => {
  const {
    mutation,
    children,
    onClick,
    getRequestPayload,
    variant = 'outlined',
    shouldUpdateStep,
    nextStep,
    isBack = false
  } = props
  const [save, { isLoading }] = mutation
  const {
    watch,
    trigger,
    formState: { dirtyFields }
  } = useFormContext()
  const values = watch()

  const handleSave = async () => {
    let isValid = true

    if (!isBack) {
      isValid = await trigger()
    }

    if (!isValid) {
      return
    }

    const isDirty = Object.values(dirtyFields).length > 0
    const updateStepAndData = async () => {
      if (typeof getRequestPayload === 'function') {
        const payload = getRequestPayload(values)
        payload.step = nextStep
        await save(payload)
      }
      onClick(nextStep)
    }

    if (shouldUpdateStep) {
      await updateStepAndData()
    } else if (isDirty && isValid) {
      await updateStepAndData()
    } else {
      onClick(nextStep)
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
