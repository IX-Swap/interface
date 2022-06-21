import React, { Fragment, useEffect } from 'react'
import { Grid } from '@mui/material'
import { FieldsArray } from 'components/form/FieldsArray'
import { useFormContext } from 'react-hook-form'
import { TaxResidencyField } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyField/TaxResidencyField'
import { TaxResidency } from 'app/pages/identity/types/forms'
import { MAX_TAX_RESIDENCIES } from 'app/pages/identity/const/declarations'

export interface TaxResidencyFieldArrayProps {
  identityType?: 'individual' | 'corporate'
}

export const TaxResidencyFieldArray = ({
  identityType = 'corporate'
}: TaxResidencyFieldArrayProps) => {
  const { control } = useFormContext()

  useEffect(() => {
    const { taxResidencies } = control.getValues()
    if (taxResidencies === undefined || taxResidencies.length < 1) {
      control.setValue('taxResidencies', [{}])
    }
    // eslint-disable-next-line
  }, [])

  return (
    <FieldsArray name='taxResidencies' control={control}>
      {({ fields, append, remove }) => (
        <Grid container direction='column'>
          {fields.map((field, i) => (
            <Fragment>
              <Grid item key={i}>
                <TaxResidencyField
                  key={field.id}
                  field={field}
                  append={append}
                  remove={remove}
                  index={i}
                  isLast={fields.length - 1 === i}
                  max={MAX_TAX_RESIDENCIES}
                  total={fields.length}
                  defaultValue={field as TaxResidency}
                  identityType={identityType}
                />
              </Grid>
            </Fragment>
          ))}
        </Grid>
      )}
    </FieldsArray>
  )
}
