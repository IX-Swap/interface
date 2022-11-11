import { Box, Button } from '@mui/material'
import { getIdFromObj } from 'helpers/strings'
import { isEmpty } from 'lodash'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MutateFunction, useMutation } from 'react-query'
import { generatePath } from 'react-router'
import { useHistory } from 'react-router-dom'
import { useDSOFormContext } from './DSOFormContext'
import { DSOStepperStep } from './DSOFormStepper'

export interface SaveDraftButtonProps {
  formId: string
  isLastStep?: boolean
  disabled?: boolean
  mutation: MutateFunction<any, any, any, any>
  transformData: any
  redirectFunction: (dsoId: string) => string
  search: string
  activeStep: number
  steps: DSOStepperStep[]
}

export const SaveDraftButton = ({
  formId,
  disabled = false,
  mutation,
  transformData,
  redirectFunction,
  search,
  activeStep
}: SaveDraftButtonProps) => {
  const { watch, errors, trigger } = useFormContext()
  const { stepValues, setStepValues } = useDSOFormContext()
  const values = watch()
  const history = useHistory()
  const payload = transformData(values)

  const handleSave = async () => {
    const newValues = [...stepValues]
    await trigger()
    await trigger('documents')
    newValues[activeStep] = { values, errors: { ...errors } }
    setStepValues(newValues)
    if (isEmpty(errors)) {
      // eslint-disable-next-line
      return await mutation(payload).then((data: any) => {
        if (data !== undefined) {
          const redirect: string = redirectFunction(data.data._id)
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
