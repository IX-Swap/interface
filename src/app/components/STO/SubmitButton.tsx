import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MutationResultPair } from 'react-query'
import { useFormContext } from 'react-hook-form'
import { Button, Tooltip, Typography } from '@mui/material'
import { ButtonProps } from '@mui/material/Button'
import { isEmpty, isFunction } from 'lodash'

export interface SubmitButtonProps extends ButtonProps {
  mutation: MutationResultPair<any, any, any, any>
  data: any
  submitText?: string
  customSchema?: any
  rawData: any
  getFormValues: any
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const {
    mutation,
    data,
    fullWidth,
    size = 'large',
    submitText = 'Identity',
    customSchema = undefined,
    getFormValues,
    rawData
  } = props

  const location = useLocation()
  const [save, { isLoading: isSubmitting }] = mutation
  const [disabled, setDisabled] = useState(true)
  const { trigger, errors } = useFormContext()
  const [isValidating, setIsValidating] = useState(false)
  const [, setIsValid] = useState(false)
  const isEdit = location.pathname.includes('/edit')

  const isDraft = rawData?.status === 'Draft'
  const isSubmitted = rawData?.status === 'Submitted'
  const isApproved = rawData?.status === 'Approved'
  console.log('rawData', rawData)
  const getButtonText = () => {
    if (isApproved) return 'Approved'
    if (isSubmitted) return 'Submitted'

    return `Submit ${submitText}`
  }

  useEffect(() => {
    const disable =
      isValidating ||
      !(isDraft && isEmpty(errors)) ||
      isSubmitting ||
      isSubmitted ||
      isApproved

    setDisabled(disable)
  }, [data, errors]) // eslint-disable-line

  useEffect(() => {
    void checkValidation()
  }, [data]) // eslint-disable-line

  const checkValidation = async () => {
    const schema = !isEmpty(customSchema)
      ? isFunction(customSchema)
        ? customSchema(data)
        : customSchema
      : null

    setIsValidating(true)

    try {
      const isFormDataValid = await schema?.isValid(getFormValues(data))

      setIsValid(isFormDataValid)
    } catch (error) {
      console.log(error)
    } finally {
      setIsValidating(false)
    }
  }

  const handleSave = async () => {
    await trigger()
    if (isEmpty(errors)) {
      return await save(data)
    }
  }

  return (
    <Tooltip
      title={
        disabled && !isEdit ? (
          <Typography color='error'>
            Please fill in all the required steps
          </Typography>
        ) : (
          ''
        )
      }
      placement='top'
      arrow
    >
      <Button
        variant='contained'
        color='primary'
        onClick={async () => {
          if (!disabled || isEdit) {
            return await handleSave()
          }
        }}
        disabled={disabled && !isEdit} // draft mode dso button enable
        disableElevation
        fullWidth={fullWidth}
        size={size}
        style={{ minWidth: 'max-content' }}
      >
        {getButtonText()}
      </Button>
    </Tooltip>
  )
}
