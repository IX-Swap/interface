import { Grid } from '@material-ui/core'
import { ButtonTransparent } from 'app/components/ButtonTransparent'
import { DocumentFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DocumentsFields'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'

import React from 'react'

export interface FieldsProps {
  rootName: string
  index: number
  fieldId: string
  append: (value: any) => void
  remove: (index?: number | number[] | undefined) => void
  isLast: boolean
  total: number
  max: number
  sectionTitle: string
  informationFields: React.ReactElement
}

export const Fields = ({
  rootName,
  index,
  fieldId,
  append,
  remove,
  isLast,
  total,
  max,
  sectionTitle,
  informationFields
}: FieldsProps) => {
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
            title={`(${index + 1}) ${sectionTitle}`}
            variant='subsection'
          />
        </Grid>
      ) : null}
      <Grid item>{informationFields}</Grid>
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
