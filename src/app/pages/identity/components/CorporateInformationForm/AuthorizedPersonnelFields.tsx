import { FieldsArray } from 'components/form/FieldsArray'
import { AuthorizedPersonnel } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/AuthorizedPersonnel'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid } from '@mui/material'
import { Personnel } from 'app/pages/identity/types/forms'

export const AuthorizedPersonnelFields = () => {
  const { control } = useFormContext()

  useEffect(() => {
    const { representatives } = control.getValues()

    if (representatives === undefined) {
      control.setValue('representatives', [{}])
    }
  }, []) // eslint-disable-line

  return (
    <FieldsArray name='representatives' control={control}>
      {({ fields, append, remove }) => (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {fields.map((field, index) => (
              <AuthorizedPersonnel
                fieldId={field.id}
                key={field.id}
                rootName='representatives'
                index={index}
                append={append}
                remove={remove}
                isLast={index === fields.length - 1}
                total={fields.length}
                max={5}
                defaultValue={field as Personnel}
              />
            ))}
          </Grid>
        </Grid>
      )}
    </FieldsArray>
  )
}
