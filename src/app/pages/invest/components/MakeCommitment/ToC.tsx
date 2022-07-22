import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { booleanValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface ToCProps {
  isCampaign?: boolean
}

export const ToC = ({ isCampaign = false }: ToCProps) => {
  const { control } = useFormContext()

  return (
    <>
      {isCampaign && (
        <TypedField
          customRenderer
          valueExtractor={booleanValueExtractor}
          component={Checkbox}
          control={control}
          label='I have read, fully understand the contents and agree to be bound by the Terms of Investment Agreement.'
          name='tnc'
          style={{ marginRight: 0 }}
        />
      )}
    </>
  )
}
