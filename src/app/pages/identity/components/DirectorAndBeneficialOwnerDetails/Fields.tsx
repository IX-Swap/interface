import React from 'react'
import { Grid, Button, IconButton } from '@mui/material'
import { DocumentFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DocumentsFields'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { Icon } from 'ui/Icons/Icon'

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
  addButtonLabel?: string
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
  addButtonLabel = 'Add more'
}: FieldsProps) => {
  const handleAppend = () => {
    append({})
  }

  const handleRemove = () => {
    remove(index)
  }

  return (
    <Grid container spacing={6}>
      <Grid
        item
        xs={12}
        container
        justifyContent='space-between'
        alignItems='center'
      >
        <Grid item>
          <FormSectionHeader
            title={`${total > 1 ? `(${index + 1}) ` : ''}${sectionTitle}`}
          />
        </Grid>
        {total > 1 ? (
          <Grid>
            <IconButton onClick={handleRemove} size='large'>
              <Icon name='trash' />
            </IconButton>
          </Grid>
        ) : null}
      </Grid>
      <Grid item xs={12}>
        {informationFields}
      </Grid>
      <Grid item>
        <DocumentFields rootName={rootName} index={index} fieldId={fieldId} />
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent='flex-end' spacing={2}>
          {isLast && total < max ? (
            <Grid item>
              <Button
                variant='outlined'
                color='primary'
                onClick={handleAppend}
                startIcon={<Icon name='plus' />}
              >
                {addButtonLabel}
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  )
}
