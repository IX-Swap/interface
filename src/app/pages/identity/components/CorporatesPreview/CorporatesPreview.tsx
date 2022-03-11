import React from 'react'
import { Box, Card, CardContent, CardActions } from '@mui/material'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { ViewButton } from 'app/pages/identity/components/ViewButton/ViewButton'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { PreviewHeader } from 'app/pages/identity/components/IndividualPreview/PreviewHeader'
import { DataPreview } from 'app/pages/identity/components/IndividualPreview/DataPreview'

export interface CorporatesPreviewProps {
  data?: CorporateIdentity
}

export const CorporatesPreview = ({ data }: CorporatesPreviewProps) => {
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
    <Card elevation={0}>
      <CardContent>
        <Box pt={2} pb={2}>
          <PreviewHeader title={details.title} status={data.status} />
          <DataPreview
            avatar={data.logo}
            userId={data.user._id}
            fields={corporateIdentityFields}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Box display='flex' justifyContent='flex-end' width='100%'>
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
      </CardActions>
    </Card>
  )
}
