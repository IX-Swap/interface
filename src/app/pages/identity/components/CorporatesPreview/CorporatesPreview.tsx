import React from 'react'
import { useStyles } from 'app/pages/identity/components/IndividualPreview/IndividualPreview.styles'
import { Box, Grid } from '@mui/material'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { Status } from 'ui/Status/Status'
// import { ViewButton } from 'app/pages/identity/components/ViewButton/ViewButton'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { DataPreview } from 'app/pages/identity/components/DataPreview/DataPreview'
import { CorporateIdentityView } from '../CorporateIdentityView/CorporateIdentityView'
import { StatusBox } from 'app/pages/identity/components/StatusBox/StatusBox'
import { TwoFANotice } from 'app/components/FormStepper/TwoFANotice'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { ReactComponent as EditIcon } from 'assets/icons/kyc-accreditation/edit.svg'

export interface CorporatesPreviewProps {
  data?: CorporateIdentity
}

export const CorporatesPreview = ({ data }: CorporatesPreviewProps) => {
  const classes = useStyles()
  if (data === undefined) {
    return null
  }

  console.log(data)

  const corporateIdentityFields = [
    {
      key: 'Company Name',
      value: data.companyLegalName
    },
    {
      key: 'Company Registration Number',
      value: data.registrationNumber
    },
    {
      key: 'Email Address',
      value: data.representatives?.[0].email
    },
    {
      key: 'Contact Number',
      value: data.representatives?.[0].contactNumber
    }
  ]

  const status = data.status.toLowerCase()

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
        <Grid item className={classes.approveButton}>
          <Status label={data.status} type={status} />
        </Grid>
        <Grid item sx={{ border: '1px solid black', flexGrow: 1 }}>
          <Box>
            <DataPreview
              avatar={data.logo}
              userId={data.user._id}
              fields={corporateIdentityFields}
              name={data.user.name}
              isIndividual={false}
              status={data.status}
              identityType={data.type}
            />
          </Box>
        </Grid>
        <Grid item className={classes.index}>
          <Box className={classes.buttonBox}>
            <EditButton
              link={details.editLink}
              params={{
                identityId: data._id,
                userId: data.user._id,
                label: data.companyLegalName
              }}
              customLabel
              sx={{
                padding: '10px 50px !important',
                width: 'auto !important'
              }}
            >
              <EditIcon style={{ fill: '#fff', marginRight: '10px' }} />
              Edit Personal Information
            </EditButton>
            {/* <Box mx={1} component='span' /> */}
            {/* <ViewButton
            link={details.viewLink}
            params={{
              identityId: data._id,
              userId: data.user._id,
              label: data.companyLegalName
            }}
          /> */}
          </Box>
        </Grid>
      </Grid>

      <Grid container className={classes.wrapper}>
        <Grid item className={classes.content}>
          {data.status !== 'Draft' && (
            <StatusBox
              status={data.status === 'Submitted' ? 'Pending' : data.status}
              identityType='corporate'
              applicationType='kyc'
            />
          )}
          <CorporateIdentityView data={data} hideHeader />
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
