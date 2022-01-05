import { Grid } from '@material-ui/core'
import { IssuerDetailsView } from 'app/pages/identity/components/DetailsOfIssuanceView/IssuerDetailsView'
import { IdentityDocumentsView } from 'app/pages/identity/components/IdentityDocumentsView/IdentityDocumentsView'
import { useDetailsOfIssuance } from 'app/pages/identity/hooks/useDetailsOfIssuance'
import React from 'react'
import { useParams } from 'react-router-dom'
import { AppFeature } from 'types/app'

import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'

export const IssuanceDetailsAuthorization = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data, isLoading } = useDetailsOfIssuance(userId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <AuthorizerView
      title={data.companyName}
      data={data}
      feature={AppFeature.IssuanceDetails}
    >
      <Grid container direction='column' spacing={8}>
        <Grid item>
          <IssuerDetailsView data={data} />
        </Grid>
        <Grid item>
          <IdentityDocumentsView data={data.documents} />
        </Grid>
      </Grid>
    </AuthorizerView>
  )
}
