import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { RadioGroup } from 'components/form/RadioGroup'
import { useFormContext } from 'react-hook-form'
import { SingaporeOnlyFields } from 'app/pages/_identity/components/TaxDeclarationForm/TaxResidencyFields/SingaporeOnlyFields'
import { InternationalFields } from 'app/pages/_identity/components/TaxDeclarationForm/TaxResidencyFields/InternationalFields'

export const TaxResidencyFields = () => {
  const { control } = useFormContext()
  const { taxResidencies, singaporeOnly } = control.getValues()

  useEffect(() => {
    if (taxResidencies === undefined) {
      control.setValue('taxResidencies', [{}])
    }
  }, [singaporeOnly, taxResidencies])

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
        <Grid container direction='column' spacing={6}>
          <Grid item style={{ paddingBottom: 0 }}>
            <SingaporeOnlyFields />
          </Grid>
          <Grid item style={{ paddingTop: 0 }}>
            <InternationalFields />
          </Grid>
        </Grid>
      </TypedField>
    </>
  )
}
