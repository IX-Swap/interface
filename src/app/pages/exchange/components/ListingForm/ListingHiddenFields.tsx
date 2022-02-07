import { Input } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const ListingHiddenFields = () => {
  const { control } = useFormContext()

  return (
    <>
      <TypedField
        component={Input}
        label=''
        name='asset'
        control={control}
        defaultValue={null}
        hidden
      />
      <TypedField
        component={Input}
        label=''
        name='dso'
        control={control}
        defaultValue={null}
        hidden
      />
    </>
  )
}
