import React from 'react'
import { useStyles } from '../IndividualPreview/IndividualPreview.styles'
import { Box, Grid } from '@mui/material'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { Status } from 'ui/Status/Status'
import { ViewButton } from 'app/pages/identity/components/ViewButton/ViewButton'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { DataPreview } from 'app/pages/identity/components/IndividualPreview/DataPreview'

export interface CorporatesPreviewProps {
  data?: CorporateIdentity
}

export const CorporatesPreview = ({ data }: CorporatesPreviewProps) => {
  const classes = useStyles()
  if (data === undefined) {
    return null
  }

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
    <Grid
      container
      className={classes.container}
      style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}
    >
      <Grid item className={classes.approveButton}>
        <Status label={data.status} type={status} />
      </Grid>
      <Grid item>
        <Box pt={2} pb={2}>
          <DataPreview
            avatar={data.logo}
            userId={data.user._id}
            fields={corporateIdentityFields}
            name={data.user.name}
            occupation={data.type}
            isIndividual={false}
            status={data.status}
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
          />
          <Box mx={1} component='span' />
          <ViewButton
            link={details.viewLink}
            params={{
              identityId: data._id,
              userId: data.user._id,
              label: data.companyLegalName
            }}
          />
        </Box>
      </Grid>
    </Grid>
  )
}
