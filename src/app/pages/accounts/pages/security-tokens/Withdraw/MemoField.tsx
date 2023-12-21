import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'

export const MemoField = () => {
  const { control } = useFormContext()
  return (
    <TypedField
      control={control}
      component={TextInput}
      label='Memo'
      name='memo'
      variant='outlined'
    />
  )
}
