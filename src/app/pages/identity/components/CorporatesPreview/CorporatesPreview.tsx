import React, { useState } from 'react'
import { useStyles } from 'app/pages/identity/components/IndividualPreview/IndividualPreview.styles'
import { Box, Grid, Paper, Tab, Tabs } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { DataPreview } from 'app/pages/identity/components/DataPreview/DataPreview'
import { StatusBox } from 'app/pages/identity/components/StatusBox/StatusBox'
import { TwoFANotice } from 'app/components/FormStepper/TwoFANotice'
import { IdentityCTA } from '../IdentityCTA/IdentityCTA'
import { AccreditationCTA } from '../AccreditationCTA/AccreditationCTA'
import {
  CorporateKYCSections,
  CorporateIdentityView
} from '../CorporateIdentityView/CorporateIdentityView'
import {
  CorporateAccreditationSections,
  CorporateAccreditationView
} from '../CorporateAccreditationView/CorporateAccreditationView'
import { EditApplication } from '../EditApplication/EditApplication'
import { ScrollSpy } from 'ui/ScrollGuide/ScrollSpy'
import { Divider } from 'ui/Divider'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { isEmptyString } from 'helpers/strings'
import { AuthorizerViewActions } from 'app/pages/authorizer/components/AuthorizerViewActions'
import { AppFeature } from 'types/app'

export interface CorporatesPreviewProps {
  data?: CorporateIdentity
  isForAuthorizer?: boolean
}

export const CorporatesPreview = ({
  data,
  isForAuthorizer = false
}: CorporatesPreviewProps) => {
  const classes = useStyles()
  const { getFilterValue } = useQueryFilter()
  const defaultTab = getFilterValue('tab') === 'accreditation' ? 1 : 0
  const [selectedIdx, setSelectedIdx] = useState(defaultTab)

  if (data === undefined) {
    return null
  }

  const onKycTab = selectedIdx === 0
  const isKycSubmitted = data.status === 'Submitted'
  const isKycApproved = data.status === 'Approved'
  const hasAccreditation = typeof data.accreditationStatus !== 'undefined'
  const isAccreditationSubmitted = data.accreditationStatus === 'Submitted'
  const isAccreditationApproved = data.accreditationStatus === 'Approved'
  const isAllowedToEdit =
    (onKycTab && !isKycApproved && !isKycSubmitted) ||
    (!onKycTab &&
      isKycApproved &&
      hasAccreditation &&
      !isAccreditationApproved &&
      !isAccreditationSubmitted)
  const hasContent =
    onKycTab || (!onKycTab && isKycApproved && hasAccreditation)

  const sections = Object.entries(
    onKycTab ? CorporateKYCSections : CorporateAccreditationSections
  )

  const feature = onKycTab
    ? AppFeature.Corporates
    : AppFeature.CorporatesAccreditation

  const getDetails = () => {
    let details = {
      editLink: !isForAuthorizer
        ? IdentityRoute.editCorporate
        : AuthorizerRoute.editCorporateIdentity,
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
              name={
                !isEmptyString(data.companyLegalName)
                  ? data.companyLegalName
                  : data.user.name
              }
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
        {!hasContent && isForAuthorizer ? (
          <Paper
            sx={{
              p: 4,
              borderRadius: 2,
              width: '100%'
            }}
          >
            This user has not started their Accreditation application, or their
            KYC application has not been approved yet.
          </Paper>
        ) : (
          <>
            <Grid item className={classes.content}>
              <TabPanel pt={0} value={selectedIdx} index={0}>
                <>
                  {/* TODO: display message for empty tabs */}
                  {data.status !== 'Draft' && (
                    <StatusBox
                      isForAuthorizer={isForAuthorizer}
                      status={data.status}
                      identityType='corporate'
                      applicationType='kyc'
                    />
                  )}
                  {data.status === 'Rejected' && !isForAuthorizer && (
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

                  {isForAuthorizer && (
                    <>
                      <Box mt={5} />
                      <AuthorizerViewActions data={data} feature={feature} />
                    </>
                  )}
                </>
              </TabPanel>

              <TabPanel pt={0} value={selectedIdx} index={1}>
                {/* TODO: display message for empty tabs */}
                {isForAuthorizer && (!isKycApproved || !hasAccreditation) && (
                  <></>
                )}

                {!isKycApproved ? (
                  <StatusBox
                    isForAuthorizer={isForAuthorizer}
                    status={'Locked'}
                    identityType='corporate'
                    applicationType='accreditation'
                  />
                ) : !hasAccreditation && !isForAuthorizer ? (
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
                        isForAuthorizer={isForAuthorizer}
                        status={data.accreditationStatus ?? 'Pending'}
                        identityType='corporate'
                        applicationType='accreditation'
                        investorRole={data.applyingAs}
                      />
                    )}
                    {data.accreditationStatus === 'Rejected' &&
                      !isForAuthorizer && (
                        <AccreditationCTA
                          link={IdentityRoute.editCorporateAccreditation}
                          params={{
                            identityId: data._id,
                            userId: data.user._id
                          }}
                          retry
                        />
                      )}

                    {hasAccreditation && (
                      <>
                        <CorporateAccreditationView data={data} />

                        {isForAuthorizer && (
                          <>
                            <Box mt={5} />
                            <AuthorizerViewActions
                              data={data}
                              feature={feature}
                              statusFieldName={'accreditationStatus'}
                            />
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </TabPanel>
            </Grid>
            <Grid container item className={classes.rightBlock}>
              <Box position='sticky' top={90}>
                {hasContent && (
                  <Paper
                    sx={{
                      p: 4,
                      borderRadius: 2,
                      mb: 2
                    }}
                  >
                    <ScrollSpy sections={sections} />
                    {(isForAuthorizer || isAllowedToEdit) && (
                      <>
                        <Divider sx={{ margin: '25px 0' }} />
                        <EditApplication
                          applicationType={onKycTab ? 'kyc' : 'accreditation'}
                          identityType='corporate'
                          identityId={data._id}
                          userId={data.user._id}
                          link={
                            onKycTab
                              ? details.editLink
                              : !isForAuthorizer
                              ? IdentityRoute.editCorporateAccreditation
                              : AuthorizerRoute.editCorporateAccreditation
                          }
                          buttonOnly
                        />
                      </>
                    )}
                  </Paper>
                )}

                {!isForAuthorizer && (
                  <Box sx={{ display: 'flex', justifyContent: 'stretch' }}>
                    <TwoFANotice />
                  </Box>
                )}
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </>
  )
}
