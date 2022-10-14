import { Box, Button } from '@mui/material'
import { getIdFromObj } from 'helpers/strings'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MutateFunction } from 'react-query'
import { generatePath, useHistory } from 'react-router-dom'

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
    return await mutation(payload).then((data: any) => {
      if (data !== undefined) {
        const redirect = redirectFunction(data.data._id)

        history.replace(
          generatePath(`${redirect}${search}`, {
            issuerId:
              typeof data.data.user === 'string'
                ? data.data.user
                : getIdFromObj(data.data.user),
            dsoId: data.data._id
          })
        )
      }
    })
  }

  return (
    <Box width='100%'>
      <Button
        disabled={disabled}
        fullWidth
        variant='outlined'
        onClick={() => {
          void handleSave()
        }}
        form={formId}
      >
        Save Draft
      </Button>
    </Box>
  )
}
