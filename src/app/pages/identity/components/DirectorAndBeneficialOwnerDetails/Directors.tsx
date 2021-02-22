import { Grid } from '@material-ui/core'
import { DirectorsInformationFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsInformationFields'
import { Fields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/Fields'
import { FieldsArray } from 'components/form/FieldsArray'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const name = 'directors'

export const Directors = () => {
  const { control } = useFormContext()
  return (
    <FieldsArray name={name} control={control}>
      {({ fields, append, remove }) => (
        <Grid container direction='column' spacing={3}>
          {fields.map((field, index) => (
            <Grid item key={field.id}>
              <Fields
                rootName={name}
                fieldId={field.id}
                index={index}
                append={append}
                remove={remove}
                isLast={fields.length - 1 === index}
                total={fields.length}
                max={5}
                sectionTitle='Directors/Partners/People with Executive Authority'
                informationFields={
                  <DirectorsInformationFields
                    rootName={name}
                    index={index}
                    fieldId={field.id}
                  />
                }
              />
            </Grid>
          ))}
        </Grid>
      )}
    </FieldsArray>
  )
}
