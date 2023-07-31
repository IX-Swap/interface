import React from 'react'
import { generatePath } from 'react-router'
import { useHistory, useLocation } from 'react-router-dom'
import { MutateFunction, useMutation } from 'react-query'
import { useFormContext } from 'react-hook-form'
import { Button } from '@mui/material'
import { isEmpty } from 'lodash'
import { getIdFromObj } from 'helpers/strings'

export interface SaveDraftButtonProps {
  formId: string
  disabled?: boolean
  mutation: MutateFunction<any, any, any, any>
  transformData: any
  redirectFunction: (isCreate: boolean, dsoId: string) => string
}

export const SaveDraftButton = ({
  formId,
  disabled = false,
  mutation,
  transformData,
  redirectFunction
}: SaveDraftButtonProps) => {
  const history = useHistory()
  const { pathname } = useLocation<{ pathname: string }>()
  const { watch, errors, trigger } = useFormContext()
  const values = watch()
  console.log('values', values)
  const payload = transformData(values)
  console.log('transform', payload)

  const handleSave = async () => {
    await trigger()
    await trigger('documents')

    if (isEmpty(errors)) {
      return await mutation(payload).then((data: any) => {
        if (data !== undefined) {
          const redirect: string = redirectFunction(
            pathname.includes('/create'),
            data.data._id
          )
          history.replace(
            generatePath(`${redirect}`, {
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
  }

  const [saveForm] = useMutation(handleSave)

  return (
    <Button
      variant='outlined'
      fullWidth
      disabled={disabled}
      form={formId}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        void saveForm()
      }}
    >
      Save Draft
    </Button>
  )
}
