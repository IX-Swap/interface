import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { Input } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { RequestPasswordResetArgs } from 'types/auth'

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
