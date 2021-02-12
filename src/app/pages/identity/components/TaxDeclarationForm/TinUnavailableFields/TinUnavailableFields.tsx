import { Grid } from '@material-ui/core'
import { useTaxResidencies } from 'app/pages/identity/components/TaxDeclarationForm/hooks/useTaxResidencies'
import { ReasonFields } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/ReasonFields'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { reverseBooleanValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const TinUnavailableFields = () => {
  const { control } = useFormContext()
  const { singaporeOnly, taxAvailable } = useTaxResidencies()

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        {/* @ts-ignore */}
        <TypedField
          customRenderer
          component={Checkbox}
          reverse
          defaultValue={true}
          defaultChecked={false}
          valueExtractor={reverseBooleanValueExtractor}
          control={control}
          name='taxIdAvailable'
          label='if TIN is not available please indicate reason:'
          disabled={singaporeOnly}
        />
      </Grid>
      <Grid item>
        <ReasonFields disabled={singaporeOnly || taxAvailable} />
      </Grid>
    </Grid>
  )
}
