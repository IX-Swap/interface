import React from 'react'
import { useStyles } from './IndividualPreview.styles'
import { Box, Card, CardContent, CardActions } from '@mui/material'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { ViewButton } from 'app/pages/identity/components/ViewButton/ViewButton'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { DataPreview } from 'app/pages/identity/components/IndividualPreview/DataPreview'

export interface IndividualPreviewProps {
  data?: IndividualIdentity
}

export const IndividualPreview = ({ data }: IndividualPreviewProps) => {
  const classes = useStyles()

  if (data === undefined) {
    return null
  }

  const individualIdentityFields = [
    {
      key: 'First Name',
      value: data.firstName
    },
    {
      key: 'Middle Name',
      value: data.middleName
    },
    {
      key: 'Last Name',
      value: data.lastName
    },
    {
      key: 'Date of Birth',
      value: data.dob
    },
    {
      key: 'Citizenship',
      value: data.nationality
    },
    {
      key: 'Email',
      value: data.email
    },
    {
      key: 'Contact Number',
      value: data.contactNumber
    }
  ]

  const name = `[${data.status}] ${data.firstName} ${data.lastName}`

  return (
    <Card elevation={0} className={classes.container}>
      <CardContent>
        <Box pt={2} pb={2}>
          <DataPreview
            avatar={data.photo}
            userId={data.user._id}
            fields={individualIdentityFields}
            name={data.user.name}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Box
          display='flex'
          justifyContent='flex-end'
          width='100%'
          className={classes.editButton}
        >
          <EditButton
            link={IdentityRoute.editIndividual}
            params={{
              label: name,
              identityId: data._id,
              userId: data.user._id
            }}
          />
          <Box mx={1} component='span' />
          <ViewButton
            link={IdentityRoute.viewIndividual}
            params={{
              label: name,
              identityId: data._id,
              userId: data.user._id
            }}
          />
        </Box>
      </CardActions>
    </Card>
  )
}
