import React from 'react'
import { Grid, FormControlLabel, Radio } from '@material-ui/core'
import { FieldsArray } from 'components/form/FieldsArray'
import { useFormContext } from 'react-hook-form'
import { TaxResidencyField } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyField'
import { useTaxResidencies } from 'app/pages/identity/components/TaxDeclarationForm/hooks/useTaxResidencies'
import { MAX_TAX_RESIDENCIES } from 'app/pages/identity/utils'

export const InternationalFields = () => {
  const { control } = useFormContext()
  const { singaporeOnly } = useTaxResidencies()

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <FormControlLabel
          label='NO, I’m currently tax resident in the following list of countries/ jurisdictions (including Singapore, if applicable):'
          value='no'
          control={<Radio checked={!singaporeOnly} />}
        />
      </Grid>
      <Grid item>
        <FieldsArray name='taxResidencies' control={control}>
          {({ fields, append, remove }) => (
            <Grid container direction='column' spacing={3}>
              {fields.map((field, i) => (
                <Grid item key={i}>
                  <TaxResidencyField
                    key={i}
                    field={field}
                    append={append}
                    remove={remove}
                    index={i}
                    isLast={fields.length - 1 === i}
                    max={MAX_TAX_RESIDENCIES}
                    total={fields.length}
                    disabled={singaporeOnly}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </FieldsArray>
      </Grid>
    </Grid>
  )
}
