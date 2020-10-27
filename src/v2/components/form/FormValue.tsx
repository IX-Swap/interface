import React from 'react'
import { Maybe } from 'v2/types/util'
import { useFormContext } from 'react-hook-form'
import { LabelledValue } from 'v2/components/LabelledValue'

export const FormValue = (props: {
  name: string
  label: string
}): Maybe<JSX.Element> => {
  const { name, label } = props
  const { watch } = useFormContext()
  const value = watch(name)

  return <LabelledValue label={label} value={value} />
}
