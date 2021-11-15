import { Grid } from '@material-ui/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { FundSourceSlider } from 'app/pages/identity/components/FinancialInformationForm/FundSourceSlider'
import { FundSource } from 'app/pages/identity/types/forms'

export interface FundSourceItemProps {
  field: Partial<FundSource>
  index: number
  fundSourceSum?: number
}

export const FundSourceItem = ({
  field,
  index,
  fundSourceSum
}: FundSourceItemProps) => {
  const { control } = useFormContext()

  return (
    <Grid item key={field.name}>
      <Grid container>
        <Grid item xs={5}>
          <TypedField
            customRenderer
            valueExtractor={booleanValueExtractor}
            component={Checkbox}
            name={['sourceOfFund', index, 'checked']}
            label={field.name ?? ''}
            defaultValue={field.checked}
            control={control}
          />
        </Grid>
        <Grid item xs={7}>
          <FundSourceSlider
            field={field}
            index={index}
            fundSourceSum={fundSourceSum}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
