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

  const isIssuer = data.type === 'issuer'
  return (
    <Card elevation={0}>
      <CardContent>
        <Box pt={2} pb={2}>
          <PreviewHeader
            title={`Corporate ${isIssuer ? 'Issuer' : 'Investor'}`}
            status={data.status}
          />
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
            link={
              isIssuer ? IdentityRoute.editIssuer : IdentityRoute.editCorporate
            }
            params={{
              identityId: data._id,
              userId: data.user._id,
              label: data.companyLegalName
            }}
          />
          <Box mx={1} component='span' />
          <ViewButton
            link={
              isIssuer ? IdentityRoute.viewIssuer : IdentityRoute.viewCorporate
            }
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
