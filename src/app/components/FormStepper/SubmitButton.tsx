import { Button } from '@mui/material'
import React from 'react'
import { MutationResultPair } from 'react-query'
import { ButtonProps } from '@mui/material/Button'

export interface SubmitButtonProps extends ButtonProps {
  mutation: MutationResultPair<any, any, any, any>
  data: any
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const { mutation, data } = props
  const [save, { isLoading }] = mutation
  const isSubmitted = data.status === 'Submitted'
  const isApproved = data.status === 'Approved'

  const handleSave = async () => {
    return await save(data._id)
  }

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={async () => void handleSave()}
      disabled={isApproved || isLoading || isSubmitted}
      disableElevation
    >
      {isApproved ? 'Approved' : isSubmitted ? 'Submitted' : 'Submit'}
    </Button>
  )
}
