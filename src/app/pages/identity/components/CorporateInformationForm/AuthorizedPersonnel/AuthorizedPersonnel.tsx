import React from 'react'
import { Grid, Button, IconButton } from '@mui/material'
import { PersonnelInformation } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/PersonnelInformation'
import { AuthorizationDocuments } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/AuthorizationDocuments'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { Personnel } from 'app/pages/identity/types/forms'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { Icon } from 'ui/Icons/Icon'

export interface AuthorizedPersonnelProps {
  fieldId: string
  rootName: string
  index: number
  append: (value: any) => void
  remove: (index?: number | number[] | undefined) => void
  isLast: boolean
  total: number
  max: number
  defaultValue: Personnel
}

export const AuthorizedPersonnel = (props: AuthorizedPersonnelProps) => {
  const { append, remove, index, isLast, total, max } = props
  const handleAppend = () => {
    append({
      fullName: '',
      designation: '',
      email: '',
      contactNumber: '',
      documents: []
    })
  }

  const handleRemove = () => {
    remove(index)
  }

  return (
    <FieldContainer>
      <Grid container spacing={6}>
        <Grid
          item
          container
          xs={12}
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item>
            <FormSectionHeader
              title={`${
                total > 1 ? `(${props.index + 1}) ` : ''
              }Company Authorized Personnel`}
            />
          </Grid>
          {total > 1 ? (
            <Grid item>
              <IconButton onClick={handleRemove} size='large'>
                <Icon name='trash' />
              </IconButton>
            </Grid>
          ) : null}
        </Grid>

        <Grid item xs={12}>
          <PersonnelInformation {...props} />
        </Grid>
        <Grid item xs={12}>
          <AuthorizationDocuments {...props} />
        </Grid>
        <Grid item xs={12} container justifyContent='flex-end' spacing={2}>
          {isLast && total < max ? (
            <Grid item>
              <Button
                variant='outlined'
                color='primary'
                onClick={handleAppend}
                startIcon={<Icon name='plus' />}
              >
                Company Authorized Personnel
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
