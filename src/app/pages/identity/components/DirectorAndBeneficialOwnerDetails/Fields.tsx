import React from 'react'
import { Grid, Button, IconButton, useMediaQuery } from '@mui/material'
import { DocumentFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DocumentsFields'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { Icon } from 'ui/Icons/Icon'
import { useTheme } from '@mui/material/styles'
import { Divider } from 'ui/Divider'

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
  removeButtonLabel?: string
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
  addButtonLabel = 'Add more',
  removeButtonLabel = 'Remove'
}: FieldsProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

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
        {total > 1 && !matches ? (
          <Grid>
            <IconButton
              onClick={handleRemove}
              size='large'
              data-testid='delete-button'
              sx={{
                borderRadius: 2
              }}
            >
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
      {total > 1 && matches ? (
        <Grid item xs={12}>
          <Button
            fullWidth
            variant='contained'
            startIcon={<Icon name='trash' />}
            onClick={handleRemove}
            disableElevation
            sx={{
              backgroundColor: '#F7F9FA',
              borderColor: '#F7F9FA',
              color: theme.palette.input.placeholder,
              svg: {
                fill: theme.palette.input.placeholder
              }
            }}
          >
            {removeButtonLabel}
          </Button>
        </Grid>
      ) : null}

      {isLast && total < max ? (
        <Grid item xs={12}>
          <Grid container justifyContent='flex-end' spacing={6}>
            <>
              {matches ? (
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              ) : null}
              <Grid item xs={matches ? 12 : undefined}>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={handleAppend}
                  startIcon={<Icon name='plus' />}
                  fullWidth={matches}
                >
                  {addButtonLabel}
                </Button>
              </Grid>
            </>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  )
}
