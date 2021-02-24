import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { MutationResultPair } from 'react-query'

export interface MoveButtonProps extends ButtonProps {
  mutation: MutationResultPair<any, any, any, any>
}

export const MoveButton = (props: MoveButtonProps) => {
  const { mutation, children, onClick } = props
  const [save, { isLoading }] = mutation
  const { watch } = useFormContext()
  const values = watch()

  const handleSave = async () => {
    return save(values).then(onClick)
  }

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => handleSave()}
      disabled={isLoading}
    >
      {children}
    </Button>
  )
}
