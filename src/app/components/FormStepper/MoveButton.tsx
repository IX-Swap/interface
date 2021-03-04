import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { MutationResultPair } from 'react-query'

export interface MoveButtonProps extends ButtonProps {
  mutation: MutationResultPair<any, any, any, any>
  transformData: (data: any) => any
  nextStepIndex?: number
}

export const MoveButton = (props: MoveButtonProps) => {
  const {
    mutation,
    children,
    onClick,
    transformData,
    nextStepIndex,
    variant = 'outlined',
    ...rest
  } = props
  const [save, { isLoading }] = mutation
  const { watch, trigger } = useFormContext()
  const values = watch()

  const handleSave = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const isValid = await trigger()
    const payload = transformData(values)

    if (nextStepIndex !== undefined) {
      payload.step = nextStepIndex
    }

    if (isValid) {
      await save(payload)
      onClick?.(event)
    }
  }

  return (
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
  )
}
