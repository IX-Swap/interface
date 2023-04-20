import React, { useState } from 'react'
import { useStyles } from 'app/pages/identity/components/IndividualPreview/IndividualPreview.styles'
import { Box, Grid, Tabs, Tab } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import { IdentityRoute } from 'app/pages/identity/router/config'
// import { Status } from 'ui/Status/Status'
// import { ViewButton } from 'app/pages/identity/components/ViewButton/ViewButton'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { DataPreview } from 'app/pages/identity/components/DataPreview/DataPreview'
import { IndividualIdentityView } from '../IndividualIdentityView/IndividualIdentityView'
import { StatusBox } from 'app/pages/identity/components/StatusBox/StatusBox'
import { TwoFANotice } from 'app/components/FormStepper/TwoFANotice'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { IdentityCTA } from '../IdentityCTA/IdentityCTA'
import { AccreditationCTA } from '../AccreditationCTA/AccreditationCTA'
// import { adjustIdentityOccupation } from 'app/pages/identity/utils/shared'
import { isEmptyString } from 'helpers/strings'

export interface IndividualPreviewProps {
  data?: IndividualIdentity
}

export const IndividualPreview = ({ data }: IndividualPreviewProps) => {
  const classes = useStyles()
  const [selectedIdx, setSelectedIdx] = useState(0)

  if (data === undefined) {
    return null
  }

  const individualName =
    !isEmptyString(data?.firstName) && !isEmptyString(data?.lastName)
      ? data.firstName + ' ' + data.lastName
      : data?.user?.name ?? '-'
  const name = `[${data.status}] ${individualName}`
  //   const status = data.status.toLowerCase()

  //   const individualIdentityFields = [
  //     {
  //       key: 'Full Name',
  //       value: individualName
  //     },
  //     {
  //       key: 'Occupation',
  //       value: adjustIdentityOccupation(data.occupation)
  //     },
  //     {
  //       key: 'Email',
  //       value: data.email
  //     },
  //     {
  //       key: 'Contact Number',
  //       value: data.contactNumber
  //     }
  //   ]

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item className={classes.tabs}>
          {/* <Status label={data.status} type={status} /> */}
          <Tabs
            value={selectedIdx}
            onChange={(_, index) => setSelectedIdx(index)}
            indicatorColor='primary'
            textColor='primary'
          >
            <Tab label='Identity' />
            <Tab label='Accreditation' />
          </Tabs>
        </Grid>
        <Grid item className={classes.profile}>
          <Box>
            <DataPreview
              avatar={data.photo}
              userId={data.user._id}
              // fields={individualIdentityFields}
              name={data.user.name}
              isIndividual={true}
              status={data.status}
            />
          </Box>
        </Grid>
        <Grid item className={classes.buttonBox}>
          <EditButton
            link={IdentityRoute.editIndividual}
            params={{
              label: name,
              identityId: data._id,
              userId: data.user._id
            }}
            customLabel
            showIcon
            sx={{
              padding: '10px 30px !important',
              width: '300px !important'
            }}
          >
            Edit {selectedIdx === 0 ? 'Personal' : 'Accreditation'} Information
          </EditButton>
          {/* <Box mx={1} component='span' />
        <ViewButton
          link={IdentityRoute.viewIndividual}
          params={{
            label: name,
            identityId: data._id,
            userId: data.user._id
          }}
        /> */}
        </Grid>
      </Grid>

      <Grid container className={classes.wrapper}>
        <Grid item className={classes.content}>
          <TabPanel pt={0} value={selectedIdx} index={0}>
            <>
              {data.status !== 'Draft' && (
                <StatusBox
                  status={data.status === 'Submitted' ? 'Pending' : data.status}
                  identityType='corporate'
                  applicationType='kyc'
                />
              )}
              {data.status === 'Rejected' && (
                <IdentityCTA
                  link={IdentityRoute.editIndividual}
                  params={{
                    label: name,
                    identityId: data._id,
                    userId: data.user._id
                  }}
                />
              )}

              <IndividualIdentityView data={data} hideHeader />
            </>
          </TabPanel>

          <TabPanel pt={0} value={selectedIdx} index={1}>
            {data.status !== 'Approved' ? (
              <StatusBox
                status={'Locked'}
                identityType='corporate'
                applicationType='accreditation'
              />
            ) : (
              <>
                <AccreditationCTA
                  link={IdentityRoute.editIndividual}
                  params={{
                    label: name,
                    identityId: data._id,
                    userId: data.user._id
                  }}
                />
                {/** TODO: Accreditaion details */}
              </>
            )}
          </TabPanel>
        </Grid>
        <Grid container item className={classes.rightBlock}>
          <Box position='sticky' top={90}>
            <Grid item xs={12}>
              <TwoFANotice />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
