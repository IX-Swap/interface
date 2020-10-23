import React from 'react'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { LabelledValue } from 'v2/components/LabelledValue'
import { useAppRouter } from 'v2/app/router'
import { useDSOById } from 'v2/app/pages/invest/hooks/useDSOById'
import get from 'lodash/get'
import { formatMoney } from 'v2/helpers/numbers'

export interface MoneyRendererProps {
  name: string
  label: string
  path: string
}

export const DSOAmountRenderer = (props: MoneyRendererProps) => {
  const { name, label, path } = props
  const { params } = useAppRouter()
  const { data, isLoading } = useDSOById(params.dsoId)
  const { FormValue } = useTypedForm()

  if (data === undefined) {
    return null
  }

  return (
    <FormValue name={name}>
      {(amount: string) => (
        <LabelledValue
          label={label}
          value={
            isLoading
              ? '...'
              : formatMoney(Number(amount), get(data, path, '...') as string)
          }
        />
      )}
    </FormValue>
  )
}
