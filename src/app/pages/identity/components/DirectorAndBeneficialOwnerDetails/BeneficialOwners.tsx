import { Grid } from '@material-ui/core'
import { BeneficialOwnersInformationFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/BeneficialOwnersInformationFields'
import { Fields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/Fields'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { FieldsArray } from 'components/form/FieldsArray'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const name = 'beneficialOwners'

export const BeneficialOwners = () => {
  const { control } = useFormContext()
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <FormSectionHeader title='Beneficial Owners Information' />
      </Grid>
      <Grid item>
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
                    sectionTitle='Beneficial Owners Information'
                    informationFields={
                      <BeneficialOwnersInformationFields
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
      </Grid>
    </Grid>
  )
}
