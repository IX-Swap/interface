import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { PersonnelInformation } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/PersonnelInformation'
import { AuthorizationDocuments } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/AuthorizationDocuments'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { Personnel } from 'app/pages/identity/types/forms'

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
    <Grid container direction='column' spacing={6}>
      {index > 0 ? (
        <Grid item>
          <FormSectionHeader
            title={`(${props.index + 1}) Company Authorized Personnel`}
            subtitle=''
            variant='subsection'
          />
        </Grid>
      ) : null}
      <Grid item>
        <PersonnelInformation {...props} />
      </Grid>
      <Grid item>
        <AuthorizationDocuments {...props} />
      </Grid>
      <Grid item container justifyContent='flex-end' spacing={2}>
        {total > 1 ? (
          <Grid item>
            <Button variant='outlined' color='primary' onClick={handleRemove}>
              Delete
            </Button>
          </Grid>
        ) : null}

        {isLast && total < max ? (
          <Grid item>
            <Button variant='outlined' color='primary' onClick={handleAppend}>
              Add more
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  )
}
