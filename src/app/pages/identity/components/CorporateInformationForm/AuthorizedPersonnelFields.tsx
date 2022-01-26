import { FieldsArray } from 'components/form/FieldsArray'
import { AuthorizedPersonnel } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/AuthorizedPersonnel'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { VSpacer } from 'components/VSpacer'
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
    <>
      <Grid container direction='column'>
        <Grid item>
          <FormSectionHeader title='Company Authorized Personnel' subtitle='' />
        </Grid>
        <Grid item>
          <FieldsArray name='representatives' control={control}>
            {({ fields, append, remove }) => (
              <Grid container direction='column' spacing={3}>
                <Grid item>
                  {fields.map((field, index) => (
                    <AuthorizedPersonnel
                      fieldId={field.id}
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
        </Grid>
      </Grid>
      <VSpacer size='medium' />
    </>
  )
}
