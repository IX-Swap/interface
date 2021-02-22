import React from 'react'
import { Grid } from '@material-ui/core'
import { ButtonTransparent } from 'app/components/ButtonTransparent'
import { DocumentFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DocumentsFields'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { BeneficialOwnersInformationFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/BeneficialOwnersInformationFields'
import { DirectorsFieldsProps } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsFields'

export const BeneficialOwnerFields = ({
  rootName,
  index,
  fieldId,
  append,
  remove,
  isLast,
  total,
  max
}: DirectorsFieldsProps) => {
  const handleAppend = () => {
    append({})
  }

  const handleRemove = () => {
    remove(index)
  }

  return (
    <Grid container direction='column' spacing={3}>
      {index > 0 ? (
        <Grid item>
          <FormSectionHeader
            title={`(${index + 1}) Beneficial Owners Information`}
            variant='subsection'
          />
        </Grid>
      ) : null}
      <Grid item>
        <BeneficialOwnersInformationFields
          rootName={rootName}
          index={index}
          fieldId={fieldId}
        />
      </Grid>
      <Grid item>
        <DocumentFields rootName={rootName} index={index} fieldId={fieldId} />
      </Grid>
      <Grid item>
        {isLast && total < max ? (
          <Grid item container justify='flex-end'>
            <ButtonTransparent onClick={handleAppend}>
              Add more
            </ButtonTransparent>
          </Grid>
        ) : (
          <Grid item container justify='flex-end'>
            <ButtonTransparent onClick={handleRemove}>Delete</ButtonTransparent>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}
