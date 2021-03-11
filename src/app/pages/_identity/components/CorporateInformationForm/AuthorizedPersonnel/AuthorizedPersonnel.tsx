import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { PersonnelInformation } from 'app/pages/_identity/components/CorporateInformationForm/AuthorizedPersonnel/PersonnelInformation'
import { AuthorizationDocuments } from 'app/pages/_identity/components/CorporateInformationForm/AuthorizedPersonnel/AuthorizationDocuments'
import { FormSectionHeader } from 'app/pages/_identity/components/FormSectionHeader'

export interface AuthorizedPersonnelProps {
  fieldId: string
  rootName: string
  index: number
  append: (value: any) => void
  remove: (index?: number | number[] | undefined) => void
  isLast: boolean
  total: number
  max: number
}

export const AuthorizedPersonnel = (props: AuthorizedPersonnelProps) => {
  const handleAppend = () => {
    props.append({
      fullName: '',
      designation: '',
      email: '',
      contactNumber: '',
      documents: []
    })
  }

  const handleRemove = () => {
    props.remove(props.index)
  }

  return (
    <Grid container direction='column' spacing={6}>
      {props.index > 0 ? (
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
      {props.isLast && props.total < props.max && (
        <Grid item container justify='flex-end'>
          <Button variant='outlined' color='primary' onClick={handleAppend}>
            Add more
          </Button>
        </Grid>
      )}

      <Grid item container justify='flex-end'>
        <Button variant='outlined' color='primary' onClick={handleRemove}>
          Delete
        </Button>
      </Grid>
    </Grid>
  )
}
