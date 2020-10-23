import React from 'react'
import { moneyNumberFormat } from 'v2/app/components/DSO/utils'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
import { Grid } from '@material-ui/core'
import { DSOCorporateName } from 'v2/app/components/DSO/components/DSOCorporateName'
import { DSOAmountRenderer } from 'v2/app/components/DSO/components/DSOAmountRenderer'

export interface DSOStatusFieldsProps {
  isEditing: boolean
  isNew: boolean
  dsoOwnerId: string
}

export const DSOStatusFields = (props: DSOStatusFieldsProps) => {
  const { isEditing, isNew } = props
  const { EditableField } = useDSOForm()

  return (
    <Grid container direction='column' spacing={2}>
      {!isNew && (
        <Grid item>
          <EditableField
            fieldType='CorporateSelect'
            isEditing={isEditing}
            label='Corporate'
            name='corporate'
            valueExtractor={plainValueExtractor}
            viewRenderer={<DSOCorporateName />}
          />
        </Grid>
      )}

      {!isNew && (
        <Grid item>
          <EditableField
            fieldType='TextField'
            isEditing={isEditing}
            label='Status'
            name='status'
            inputProps={{
              disabled: true
            }}
          />
        </Grid>
      )}

      <Grid item>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          label='Capital Structure'
          name='capitalStructure'
        />
      </Grid>

      <Grid item>
        <EditableField
          fieldType='NumericField'
          isEditing={isEditing}
          label='Unit Price'
          name='pricePerUnit'
          numberFormat={moneyNumberFormat}
          viewRenderer={
            <DSOAmountRenderer
              name='pricePerUnit'
              label='Unit Price'
              path='currency.symbol'
            />
          }
        />
      </Grid>

      <Grid item>
        <EditableField
          fieldType='NumericField'
          isEditing={isEditing}
          label='Total Fundraising Amount'
          name='totalFundraisingAmount'
          numberFormat={moneyNumberFormat}
          viewRenderer={
            <DSOAmountRenderer
              name='totalFundraisingAmount'
              label='Total Fundraising Amount'
              path='currency.symbol'
            />
          }
        />
      </Grid>

      <Grid item>
        <EditableField
          fieldType='NumericField'
          isEditing={isEditing}
          label='Minimum Investment'
          name='minimumInvestment'
          numberFormat={moneyNumberFormat}
          viewRenderer={
            <DSOAmountRenderer
              name='minimumInvestment'
              label='Minimum Investment'
              path='tokenSymbol'
            />
          }
        />
      </Grid>
    </Grid>
  )
}
