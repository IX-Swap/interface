import React from 'react'
import { MutationResultPair, useMutation } from 'react-query'
import { Button } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { IndividualIdentityFormValues } from 'app/pages/identity/components/types'

export interface SaveButtonProps {
  transformData: any
  mutation: MutationResultPair<any, any, any, any>
}

export const SaveButton = (props: SaveButtonProps) => {
  const { mutation, transformData } = props
  const { watch } = useFormContext<IndividualIdentityFormValues>()
  const values = watch()
  const [save] = mutation

  const handleSave = async () => {
    return await save(transformData(values))
  }

  const [handleClick, { isLoading }] = useMutation(handleSave)

  return (
    <Button
      variant='outlined'
      color='primary'
      onClick={async () => void handleClick()}
      disabled={isLoading}
    >
      Save & Finish Later
    </Button>
  )
}
