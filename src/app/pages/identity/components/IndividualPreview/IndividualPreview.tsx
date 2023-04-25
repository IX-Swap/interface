import React, { useState } from 'react'
import { useStyles } from 'app/pages/identity/components/IndividualPreview/IndividualPreview.styles'
import { Box, Grid, Tabs, Tab, Paper } from '@mui/material'
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

  const onKycTab = selectedIdx === 0
  //   const kycSubmitted = data.status === 'Submitted'
  const kycSubmitted = false
  const kycApproved = data.status === 'Approved'
  const hasAccreditation = typeof data.accreditationStatus !== 'undefined'
  //   const accreditationSubmitted = data.accreditationStatus === 'Submitted'
  const accreditationSubmitted = false
  const accreditationApproved = data.accreditationStatus === 'Approved'

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
              kycStatus={data.status}
              accreditationStatus={data.accreditationStatus}
              roles={data.user.roles}
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
              width: '300px !important',
              visibility: 'hidden'
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
                  status={data.status}
                  identityType='individual'
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

              <IndividualIdentityView data={data} hideAvatar />
            </>
          </TabPanel>

          <TabPanel pt={0} value={selectedIdx} index={1}>
            {!kycApproved ? (
              <StatusBox
                status={'Locked'}
                identityType='individual'
                applicationType='accreditation'
              />
            ) : !hasAccreditation ? (
              <AccreditationCTA
                link={IdentityRoute.createIndividual}
                params={{
                  identityId: data._id,
                  userId: data.user._id
                }}
              />
            ) : (
              <>
                {data.accreditationStatus !== 'Draft' && (
                  <StatusBox
                    status={data.accreditationStatus ?? 'Pending'}
                    identityType='corporate'
                    applicationType='accreditation'
                  />
                )}
                {data.accreditationStatus === 'Rejected' && (
                  <AccreditationCTA
                    link={IdentityRoute.editIndividual}
                    params={{
                      identityId: data._id,
                      userId: data.user._id
                    }}
                    retry
                  />
                )}

                {/* TODO: Individual Accreditation Details */}
              </>
            )}
          </TabPanel>
        </Grid>
        <Grid container item className={classes.rightBlock}>
          <Box position='sticky' top={90}>
            {((onKycTab && !kycApproved && !kycSubmitted) ||
              (!onKycTab &&
                kycApproved &&
                hasAccreditation &&
                !accreditationApproved &&
                !accreditationSubmitted)) && (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, borderRadius: 2, mb: 2 }}>
                  <EditButton
                    fullWidth
                    variant={'contained'}
                    link={
                      onKycTab
                        ? IdentityRoute.editIndividual
                        : IdentityRoute.editIndividual
                    }
                    params={{
                      identityId: data._id,
                      userId: data.user._id
                    }}
                    customLabel
                    sx={{
                      paddingLeft: '10px !important',
                      paddingRight: '10px !important',
                      width: '100% !important'
                    }}
                  >
                    Edit {onKycTab ? 'Personal' : 'Accreditation'} Information
                  </EditButton>
                </Paper>
              </Grid>
            )}

            <Grid item xs={12}>
              <TwoFANotice />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
