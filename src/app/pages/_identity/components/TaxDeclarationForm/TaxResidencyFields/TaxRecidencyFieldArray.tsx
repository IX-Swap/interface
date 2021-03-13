import React, { Fragment, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { FieldsArray } from 'components/form/FieldsArray'
import { useFormContext } from 'react-hook-form'
import { TaxResidencyField } from 'app/pages/_identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyField'
import { MAX_TAX_RESIDENCIES } from 'app/pages/identity/utils'
import { TaxResidency } from 'types/identity'
import { VSpacer } from 'components/VSpacer'

export const TaxResidencyFieldArray = () => {
  const { control } = useFormContext()

  useEffect(() => {
    const { taxResidencies } = control.getValues()

    if (taxResidencies === undefined) {
      control.setValue('taxResidencies', [{}])
    }
  }, [])

  return (
    <FieldsArray name='taxResidencies' control={control}>
      {({ fields, append, remove }) => (
        <Grid container direction='column' spacing={3}>
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
                />
                {fields.length > 1 && <VSpacer size={'small'} />}
              </Grid>
            </Fragment>
          ))}
        </Grid>
      )}
    </FieldsArray>
  )
}
