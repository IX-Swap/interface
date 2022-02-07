import React from 'react'
import { MutationResultPair, useMutation } from 'react-query'
import { Button, ButtonProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'
export interface SaveButtonProps extends ButtonProps {
  step: number
  transformData: any
  mutation: MutationResultPair<any, any, any, any>
}

export const SaveButton = (props: SaveButtonProps) => {
  const { step, mutation, transformData, children, ...rest } = props
  const { watch } = useFormContext()
  const values = watch()
  const [save] = mutation

  const handleSave = async () => {
    const payload = transformData(values)

    if (step > 0) {
      payload.step = step
    }

    return await save(payload)
  }

  const [handleClick, { isLoading }] = useMutation(handleSave)

  return (
    <Button
      {...rest}
      variant='outlined'
      color='primary'
      onClick={async () => void handleClick()}
      disabled={isLoading}
    >
      {children}
    </Button>
  )
}
