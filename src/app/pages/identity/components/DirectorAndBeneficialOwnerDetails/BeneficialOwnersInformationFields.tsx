import { Grid } from '@mui/material'
import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { percentageNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'
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
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <TypedField
          key={fieldId}
          component={TextInput}
          control={control}
          variant='outlined'
          name={[rootName, index, 'fullName']}
          label='Full Name'
          placeholder='Full Name'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          control={control}
          component={NumericInput}
          name={[rootName, index, 'percentageShareholding']}
          label='Percentage Shareholding'
          numberFormat={percentageNumberFormat}
          valueExtractor={numericValueExtractor}
          helperText='in percent'
          variant='outlined'
          fullWidth
          placeholder='Percentage Shareholding'
        />
      </Grid>
    </Grid>
  )
}
