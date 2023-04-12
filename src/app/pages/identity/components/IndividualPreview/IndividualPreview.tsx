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
import { privateClassNames } from 'helpers/classnames'
import { FieldContainer } from '../FieldContainer/FieldContainer'
import { FormSectionHeader } from '../FormSectionHeader'
import { AddressView } from '../IndividualIdentityView/AddressView/AddressView'
import { FormSectionHeaderReview } from '../FormSectionHeaderReview'
import { IndividualInfoView } from '../IndividualIdentityView/IndividualInfoView/IndividualInfoView'
import { IndividualInfoPreview } from './IndividualInfoPreview'
import { IdentityStatusSection } from './IdentityStatusSection'

export interface IndividualPreviewProps {
  data?: IndividualIdentity
}

export const IndividualPreview = ({ data }: IndividualPreviewProps) => {
  const classes = useStyles()

  if (data === undefined) {
    return null
  }

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <div
          style={{
            backgroundColor: '#FFF5CD',
            border: 'solid 1px #FFC900',
            height: '289px',
            marginTop: '60px',
            paddingLeft: '16px'
          }}
        >
          <Grid item container direction={'column'} spacing={5}>
            <Grid item></Grid>
          </Grid>
        </div>
      </Grid>

      <Grid item>
        <FieldContainer>
          <Grid item container direction={'column'} spacing={5}>
            <Grid item>
              <FormSectionHeader title='Personal Information' />
            </Grid>
            <Grid item>
              <IndividualInfoPreview data={data} />
            </Grid>
          </Grid>
        </FieldContainer>
      </Grid>

      <Grid item className={privateClassNames()}>
        <FieldContainer>
          <Grid item container direction={'column'} spacing={5}>
            <Grid item>
              <FormSectionHeader title='Address' />
            </Grid>
            <Grid item>
              <AddressView data={data.address} />
            </Grid>
          </Grid>
        </FieldContainer>
      </Grid>
    </Grid>
    // <Grid container className={classes.container}>
    //   <Grid item className={classes.approveButton}>
    //     <Status label={data.status} type={status} />
    //   </Grid>
    //   <Grid item>
    //     <Box>
    //       <DataPreview
    //         avatar={data.photo}
    //         userId={data.user._id}
    //         fields={individualIdentityFields}
    //         name={data.user.name}
    //         isIndividual={true}
    //         status={data.status}
    //       />
    //     </Box>
    //   </Grid>
    //   <Grid item className={classes.index}>
    //     <Box className={classes.buttonBox}>
    //       <EditButton
    //         link={IdentityRoute.editIndividual}
    //         params={{
    //           label: name,
    //           identityId: data._id,
    //           userId: data.user._id
    //         }}
    //       />
    //       <Box mx={1} component='span' />
    //       <ViewButton
    //         link={IdentityRoute.viewIndividual}
    //         params={{
    //           label: name,
    //           identityId: data._id,
    //           userId: data.user._id
    //         }}
    //       />
    //     </Box>
    //   </Grid>
    // </Grid>
  )
}
