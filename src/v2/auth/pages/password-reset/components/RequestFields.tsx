import React from 'react'
import { TypedField } from 'v2/components/form/TypedField'
import { Input } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { RequestPasswordResetArgs } from 'v2/types/auth'

export const RequestFields = () => {
  const { control } = useFormContext<RequestPasswordResetArgs>()

  return (
    <TypedField
      control={control}
      component={Input}
      name='email'
      label='Email Address'
    />
  )
}
