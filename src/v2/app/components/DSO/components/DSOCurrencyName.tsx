import React from 'react'
import { LabelledValue } from 'v2/components/LabelledValue'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { useAssetsData } from 'v2/hooks/asset/useAssetsData'

export const DSOCurrencyName = () => {
  const { FormValue } = useTypedForm()
  const { data, isLoading } = useAssetsData('Currency')

  return (
    <FormValue name='currency'>
      {currencyId => (
        <LabelledValue
          label='Currency'
          value={isLoading ? '...' : data.map[currencyId].symbol}
        />
      )}
    </FormValue>
  )
}
