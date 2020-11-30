import React from 'react'
import { Maybe } from 'types/util'
import { useFormContext } from 'react-hook-form'
import { LabelledValue } from 'components/LabelledValue'

export const FormValue = (props: {
  name: string
  label: string
}): Maybe<JSX.Element> => {
  const { name, label } = props
  const { watch } = useFormContext()
  const value = watch(name)

  return <LabelledValue label={label} value={value} />
}
