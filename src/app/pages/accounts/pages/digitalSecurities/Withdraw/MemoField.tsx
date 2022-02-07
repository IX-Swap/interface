import { TextField } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const MemoField = () => {
  const { control } = useFormContext()
  return (
    <TypedField
      control={control}
      component={TextField}
      label='Memo'
      name='memo'
      variant='outlined'
    />
  )
}
