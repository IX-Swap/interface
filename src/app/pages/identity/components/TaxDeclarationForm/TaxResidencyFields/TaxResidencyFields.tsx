import React from 'react'
import { Grid } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { RadioGroup } from 'components/form/RadioGroup'
import { useFormContext } from 'react-hook-form'
import { SingaporeOnlyFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/SingaporeOnlyFields'
import { InternationalFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/InternationalFields'

export const TaxResidencyFields = () => {
  const { control, watch } = useFormContext()

  return (
    <>
      {/* @ts-ignore */}
      <TypedField
        customRenderer
        component={RadioGroup}
        name='singaporeOnly'
        label=''
        control={control}
      >
        <Grid container direction='column' spacing={3}>
          <Grid item>
            <SingaporeOnlyFields />
          </Grid>
          <Grid item>
            <InternationalFields />
          </Grid>
        </Grid>
      </TypedField>
    </>
  )
}
