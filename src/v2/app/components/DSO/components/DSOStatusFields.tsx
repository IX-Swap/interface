import React from 'react'
import { moneyNumberFormat } from 'v2/app/components/DSO/utils'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'

export interface DSOStatusFieldsProps {
  isEditing: boolean
  isNew: boolean
  dsoOwnerId: string
}

export const DSOStatusFields = (props: DSOStatusFieldsProps) => {
  const { isEditing, isNew } = props
  const { EditableField } = useDSOForm()

  return (
    <>
      {!isNew && (
        <EditableField
          fieldType='CorporateSelect'
          isEditing={isEditing}
          label='Corporate'
          name='corporate'
          valueExtractor={value => value}
        />
      )}

      {!isNew && (
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          label='Status'
          name='status'
          inputProps={{
            disabled: true
          }}
        />
      )}

      <EditableField
        fieldType='TextField'
        isEditing={isEditing}
        label='Capital Structure'
        name='capitalStructure'
      />

      <EditableField
        fieldType='NumericField'
        isEditing={isEditing}
        label='Unit Price'
        name='pricePerUnit'
        numberFormat={moneyNumberFormat}
      />

      <EditableField
        fieldType='NumericField'
        isEditing={isEditing}
        label='Total Fundraising Amount'
        name='totalFundraisingAmount'
        numberFormat={moneyNumberFormat}
      />

      <EditableField
        fieldType='NumericField'
        isEditing={isEditing}
        label='Minimum Investment'
        name='minimumInvestment'
        numberFormat={moneyNumberFormat}
      />
    </>
  )
}
