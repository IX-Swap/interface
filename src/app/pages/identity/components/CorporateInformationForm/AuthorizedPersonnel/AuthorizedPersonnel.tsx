import React from 'react'
import { Grid } from '@material-ui/core'
import { PersonnelInformation } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/PersonnelInformation'
import { AuthorizationDocuments } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/AuthorizationDocuments'
import { ButtonTransparent } from 'app/components/ButtonTransparent'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'

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
      {props.isLast && props.total < props.max ? (
        <Grid item container justify='flex-end'>
          <ButtonTransparent onClick={handleAppend}>Add more</ButtonTransparent>
        </Grid>
      ) : (
        <Grid item container justify='flex-end'>
          <ButtonTransparent onClick={handleRemove}>Delete</ButtonTransparent>
        </Grid>
      )}
    </Grid>
  )
}
