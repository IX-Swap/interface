import { Grid } from '@mui/material'
import { BeneficialOwnersInformationFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/BeneficialOwnersInformationFields'
import { DirectorsInformationFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsInformationFields'
import { Fields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/Fields'
import { FieldsArray } from 'components/form/FieldsArray'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'

export interface DirectorsAndBeneficialOwnerFieldsProps {
  name: string
}

export const DirectorsAndBeneficialOwnerFields = ({
  name
}: DirectorsAndBeneficialOwnerFieldsProps) => {
  const { control } = useFormContext()

  useEffect(() => {
    const formValues = control.getValues()

    if (formValues[name] === undefined) {
      control.setValue(name, [{}])
    }
  }, []) // eslint-disable-line

  return (
    <FieldsArray name={name} control={control}>
      {({ fields, append, remove }) => (
        <Grid container data-testid={name} direction='column' spacing={3}>
          {fields.map((field, index) => (
            <Grid item key={field.id}>
              <FieldContainer>
                <Fields
                  rootName={name}
                  fieldId={field.id}
                  index={index}
                  append={append}
                  remove={remove}
                  isLast={fields.length - 1 === index}
                  total={fields.length}
                  max={5}
                  addButtonLabel={
                    name === 'directors'
                      ? 'Add Executive Authority'
                      : 'Add Beneficial Owner'
                  }
                  removeButtonLabel={
                    name === 'directors'
                      ? 'Remove Executive'
                      : 'Remove Beneficial'
                  }
                  sectionTitle={
                    name === 'directors'
                      ? 'Directors/Partners/People with Executive Authority'
                      : 'Beneficial Owners Information'
                  }
                  informationFields={
                    name === 'directors' ? (
                      <DirectorsInformationFields
                        rootName={name}
                        index={index}
                        fieldId={field.id}
                      />
                    ) : (
                      <BeneficialOwnersInformationFields
                        rootName={name}
                        index={index}
                        fieldId={field.id}
                      />
                    )
                  }
                />
              </FieldContainer>
            </Grid>
          ))}
        </Grid>
      )}
    </FieldsArray>
  )
}
