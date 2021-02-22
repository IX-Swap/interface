import { Grid } from '@material-ui/core'
import { ButtonTransparent } from 'app/components/ButtonTransparent'
import { DocumentFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DocumentsFields'
import { DirectorsInformationFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsInformationFields'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'

import React from 'react'

export interface DirectorsFieldsProps {
  rootName: string
  index: number
  fieldId: string
  append: (value: any) => void
  remove: (index?: number | number[] | undefined) => void
  isLast: boolean
  total: number
  max: number
}

export const DirectorsFields = ({
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
            title={`(${
              index + 1
            }) Directors/Partners/People with Executive Authority`}
            variant='subsection'
          />
        </Grid>
      ) : null}
      <Grid item>
        <DirectorsInformationFields
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
