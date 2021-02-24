import { Button } from '@material-ui/core'
import { IndividualIdentityFormValues } from 'app/pages/identity/components/types'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MutationResultPair, useMutation } from 'react-query'

export interface SubmitButtonProps {
  mutation: MutationResultPair<any, any, any, any>
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const { mutation } = props
  const [save, { isLoading }] = mutation
  const { watch } = useFormContext<IndividualIdentityFormValues>()
  const values = watch()

  const handleSave = async () => {
    return save(values)
  }

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => handleSave()}
      disabled={isLoading}
    >
      Save & Finish Later
    </Button>
  )
}
