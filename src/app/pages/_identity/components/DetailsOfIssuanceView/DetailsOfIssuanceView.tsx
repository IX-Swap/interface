import { Grid } from '@material-ui/core'
import { IssuerDetailsView } from 'app/pages/_identity/components/DetailsOfIssuanceView/IssuerDetailsView'
import { IdentityDocumentsView } from 'app/pages/_identity/components/IdentityDocumentsView/IdentityDocumentsView'
import { useDetailsOfIssuance } from 'app/pages/_identity/hooks/useDetailsOfIssuance'
import React from 'react'

export const DetailsOfIssuanceView = () => {
  const { data, isLoading } = useDetailsOfIssuance()

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container direction='column' spacing={8}>
      <Grid item>
        <IssuerDetailsView data={data} />
      </Grid>
      <Grid item>
        <IdentityDocumentsView data={data.documents} />
      </Grid>
    </Grid>
  )
}
