import { Grid, Button } from '@material-ui/core'
import { DocumentFields } from 'app/pages/_identity/components/DirectorAndBeneficialOwnerDetails/DocumentsFields'
import { FormSectionHeader } from 'app/pages/_identity/components/FormSectionHeader'
import { VSpacer } from 'components/VSpacer'

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
    <>
      <FormSectionHeader
        title={`${index > 0 ? `(${index + 1}) ` : ''}${sectionTitle}`}
        variant={index > 0 ? 'subsection' : 'section'}
      />
      <Grid container direction='column' spacing={3}>
        <Grid item>{informationFields}</Grid>
        <Grid item>
          <DocumentFields rootName={rootName} index={index} fieldId={fieldId} />
        </Grid>
        <Grid item>
          <Grid container justify='flex-end'>
            {isLast && total < max ? (
              <Grid item>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={handleAppend}
                >
                  Add more
                </Button>
                <VSpacer size='medium' />
              </Grid>
            ) : (
              <Grid item>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={handleRemove}
                >
                  Delete
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
