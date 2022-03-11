import React from 'react'
import { Grid, Button } from '@mui/material'
import { DocumentFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DocumentsFields'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { VSpacer } from 'components/VSpacer'
import { Personnel } from 'app/pages/identity/types/forms'

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
  defaultValue: Personnel
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
  informationFields,
  defaultValue
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
          <DocumentFields
            defaultValue={defaultValue}
            rootName={rootName}
            index={index}
            fieldId={fieldId}
          />
        </Grid>
        <Grid item>
          <Grid container justifyContent='flex-end' spacing={2}>
            {total > 1 ? (
              <Grid item>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={handleRemove}
                >
                  Delete
                </Button>
              </Grid>
            ) : null}

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
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
