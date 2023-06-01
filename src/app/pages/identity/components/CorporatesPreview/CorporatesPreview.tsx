import React, { useState } from 'react'
import { useStyles } from 'app/pages/identity/components/IndividualPreview/IndividualPreview.styles'
import { Box, Grid, Paper, Tab, Tabs } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { DataPreview } from 'app/pages/identity/components/DataPreview/DataPreview'
import { CorporateIdentityView } from '../CorporateIdentityView/CorporateIdentityView'
import { StatusBox } from 'app/pages/identity/components/StatusBox/StatusBox'
import { TwoFANotice } from 'app/components/FormStepper/TwoFANotice'
import { IdentityCTA } from '../IdentityCTA/IdentityCTA'
import { AccreditationCTA } from '../AccreditationCTA/AccreditationCTA'
import { CorporateAccreditationView } from '../CorporateAccreditationView/CorporateAccreditationView'
import { EditApplication } from '../EditApplication/EditApplication'

export interface CorporatesPreviewProps {
  data?: CorporateIdentity
}

export const CorporatesPreview = ({ data }: CorporatesPreviewProps) => {
  const classes = useStyles()
  const [selectedIdx, setSelectedIdx] = useState(0)

  if (data === undefined) {
    return null
  }

  const onKycTab = selectedIdx === 0
  const isKycSubmitted = data.status === 'Submitted'
  const isKycApproved = data.status === 'Approved'
  const hasAccreditation = typeof data.accreditationStatus !== 'undefined'
  const isAccreditationSubmitted = data.accreditationStatus === 'Submitted'
  const isAccreditationApproved = data.accreditationStatus === 'Approved'

  const getDetails = () => {
    let details = {
      editLink: IdentityRoute.editCorporate,
      viewLink: IdentityRoute.viewCorporate,
      title: 'Corporate Investor'
    }
    switch (data.type) {
      case 'issuer':
        details = {
          editLink: IdentityRoute.editIssuer,
          viewLink: IdentityRoute.viewIssuer,
          title: 'Corporate Issuer'
        }
        break
      case 'Fund Manager':
        details = {
          editLink: IdentityRoute.editFundManager,
          viewLink: IdentityRoute.viewFundManager,
          title: 'Fund Manager'
        }
        break
      case 'Fund Administrator':
        details = {
          editLink: IdentityRoute.editFundAdmin,
          viewLink: IdentityRoute.viewFundAdmin,
          title: 'Fund Administrator'
        }
        break
      case 'Portfolio Manager':
        details = {
          editLink: IdentityRoute.editPortfolioManager,
          viewLink: IdentityRoute.viewPortfolioManager,
          title: 'Portfolio Manager'
        }
        break
      default:
        break
    }
    return details
  }
  const details = getDetails()

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
            <Tab label='KYC' />
            <Tab label='Accreditation' />
          </Tabs>
        </Grid>
        <Grid item className={classes.profile}>
          <Box>
            <DataPreview
              avatar={data.logo}
              userId={data.user._id}
              name={data.user.name}
              isIndividual={false}
              kycStatus={data.status}
              accreditationStatus={data.accreditationStatus}
              identityType={data.type}
              roles={data.user.roles}
            />
          </Box>
        </Grid>
        <Grid item className={classes.buttonBox}></Grid>
      </Grid>

      <Grid container className={classes.wrapper}>
        <Grid item className={classes.content}>
          <TabPanel pt={0} value={selectedIdx} index={0}>
            <>
              {data.status !== 'Draft' && (
                <StatusBox
                  status={data.status}
                  identityType='corporate'
                  applicationType='kyc'
                />
              )}
              {data.status === 'Rejected' && (
                <IdentityCTA
                  link={details.editLink}
                  params={{
                    identityId: data._id,
                    userId: data.user._id,
                    label: data.companyLegalName
                  }}
                />
              )}

              <CorporateIdentityView data={data} hideAvatar />
            </>
          </TabPanel>

          <TabPanel pt={0} value={selectedIdx} index={1}>
            {!isKycApproved ? (
              <StatusBox
                status={'Locked'}
                identityType='corporate'
                applicationType='accreditation'
              />
            ) : !hasAccreditation ? (
              <AccreditationCTA
                link={IdentityRoute.createCorporateAccreditation}
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
                    investorRole={data.applyingAs}
                  />
                )}
                {data.accreditationStatus === 'Rejected' && (
                  <AccreditationCTA
                    link={IdentityRoute.editCorporateAccreditation}
                    params={{
                      identityId: data._id,
                      userId: data.user._id
                    }}
                    retry
                  />
                )}

                <CorporateAccreditationView data={data} />
              </>
            )}
          </TabPanel>
        </Grid>
        <Grid container item className={classes.rightBlock}>
          <Box position='sticky' top={90}>
            {((onKycTab && !isKycApproved && !isKycSubmitted) ||
              (!onKycTab &&
                isKycApproved &&
                hasAccreditation &&
                !isAccreditationApproved &&
                !isAccreditationSubmitted)) && (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, borderRadius: 2, mb: 2 }}>
                  <EditApplication
                    applicationType={onKycTab ? 'kyc' : 'accreditation'}
                    identityType='corporate'
                    identityId={data._id}
                    userId={data.user._id}
                    link={
                      onKycTab
                        ? details.editLink
                        : IdentityRoute.editCorporateAccreditation
                    }
                  />
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
