import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { IndividualPreview } from 'app/pages/_identity/components/IndividualPreview/IndividualPreview'
import { CorporatesPreview } from 'app/pages/_identity/components/CorporatesPreview/CorporatesPreview'

export const IdentitiesList: React.FC = () => {
  return (
    <>
      <Grid container direction='column' alignItems='flex-start' spacing={2}>
        <IndividualPreview />
        <VSpacer size='medium' />
        <CorporatesPreview type='investor' />
        <CorporatesPreview type='issuer' />
      </Grid>
    </>
  )
}
