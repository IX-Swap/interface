import React from 'react'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { LabelledValue } from 'v2/components/LabelledValue'
import { renderPercentage } from 'v2/helpers/rendering'

export interface PercentageRendererProps {
  name: string
  label: string
}

export const PercentageRenderer = (props: PercentageRendererProps) => {
  const { name, label } = props
  const { FormValue } = useTypedForm()

  return (
    <FormValue name={name}>
      {(value: number) => (
        <LabelledValue label={label} value={renderPercentage(value)} />
      )}
    </FormValue>
  )
}
