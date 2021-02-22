import { Grid, TextField } from '@material-ui/core'
import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { percentageNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface BeneficialOwnersInformationFieldsProps {
  rootName: string
  index: number
  fieldId: string
}

export const BeneficialOwnersInformationFields = ({
  rootName,
  index,
  fieldId
}: BeneficialOwnersInformationFieldsProps) => {
  const { control } = useFormContext()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <TypedField
          key={fieldId}
          component={TextField}
          control={control}
          variant='outlined'
          name={[rootName, index, 'fullName']}
          label='Full Name'
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TypedField
          control={control}
          component={NumericInput}
          name='percentageShareholding'
          label='Percentage Shareholding'
          numberFormat={percentageNumberFormat}
          valueExtractor={numericValueExtractor}
          helperText='in percent'
          variant='outlined'
        />
      </Grid>
    </Grid>
  )
}
