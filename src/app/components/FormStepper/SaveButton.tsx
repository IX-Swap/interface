import React from 'react'
import { MutationResultPair, useMutation } from 'react-query'
import { Button, ButtonProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'
export interface SaveButtonProps extends ButtonProps {
  step: number
  transformData: any
  mutation: MutationResultPair<any, any, any, any>
  successCallback?: () => void
}

export const SaveButton = (props: SaveButtonProps) => {
  const {
    step,
    mutation,
    transformData,
    children,
    successCallback,
    variant = 'outlined',
    color = 'primary',
    ...rest
  } = props
  const { watch } = useFormContext()
  const values = watch()
  const [save] = mutation

  const handleSave = async () => {
    const payload = transformData(values)

    if (step > 0) {
      payload.step = step
    }

    return await save(payload, {
      onSuccess: () => {
        successCallback?.()
      }
    })
  }

  const [handleClick, { isLoading }] = useMutation(handleSave)

  return (
    <Button
      {...rest}
      variant={variant}
      color={color}
      onClick={async () => void handleClick()}
      disabled={isLoading}
    >
      {children}
    </Button>
  )
}
