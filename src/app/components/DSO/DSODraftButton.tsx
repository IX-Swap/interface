import { Box, Button } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MutateFunction, useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'

export interface SaveDraftButtonProps {
  formId: string
  isLastStep?: boolean
  disabled?: boolean
  mutation: MutateFunction<any, any, any, any>
  transformData: any
  redirectFunction: (dsoId: string) => string
  search: string
}

export const SaveDraftButton = ({
  formId,
  disabled = false,
  mutation,
  transformData,
  redirectFunction,
  search
}: SaveDraftButtonProps) => {
  const { watch } = useFormContext()
  const values = watch()
  const history = useHistory()
  const payload = transformData(values)

  const handleSave = async () => {
    // eslint-disable-next-line
    await mutation(payload).then((data: any) => {
      if (data !== undefined) {
        history.go(0)
      }
    })
  }
  const [saveForm] = useMutation(handleSave)

  return (
    <Box width='100%'>
      <Button
        disabled={disabled}
        fullWidth
        variant='outlined'
        onClick={() => {
          void saveForm()
        }}
        form={formId}
      >
        Save Draft
      </Button>
    </Box>
  )
}
