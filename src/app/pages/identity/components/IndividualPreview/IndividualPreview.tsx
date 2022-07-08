import React from 'react'
import { useStyles } from 'app/pages/identity/components/IndividualPreview/IndividualPreview.styles'
import { Box, Grid } from '@mui/material'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { Status } from 'ui/Status/Status'
import { ViewButton } from 'app/pages/identity/components/ViewButton/ViewButton'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { DataPreview } from 'app/pages/identity/components/DataPreview/DataPreview'
import { adjustIdentityOccupation } from 'app/pages/identity/utils/shared'
import { isEmptyString } from 'helpers/strings'

export interface IndividualPreviewProps {
  data?: IndividualIdentity
}

export const IndividualPreview = ({ data }: IndividualPreviewProps) => {
  const classes = useStyles()

  if (data === undefined) {
    return null
  }
  const individualName =
    !isEmptyString(data?.firstName) && !isEmptyString(data?.lastName)
      ? data.firstName + ' ' + data.lastName
      : data?.user?.name ?? '-'
  const name = `[${data.status}] ${individualName}`
  const status = data.status.toLowerCase()

  const individualIdentityFields = [
    {
      key: 'Full Name',
      value: individualName
    },
    {
      key: 'Occupation',
      value: adjustIdentityOccupation(data.occupation)
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

  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.approveButton}>
        <Status label={data.status} type={status} />
      </Grid>
      <Grid item>
        <Box>
          <DataPreview
            avatar={data.photo}
            userId={data.user._id}
            fields={individualIdentityFields}
            name={data.user.name}
            isIndividual={true}
            status={data.status}
          />
        </Box>
      </Grid>
      <Grid item className={classes.index}>
        <Box className={classes.buttonBox}>
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
      </Grid>
    </Grid>
  )
}
