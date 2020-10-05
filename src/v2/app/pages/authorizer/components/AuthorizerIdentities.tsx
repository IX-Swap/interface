import React from 'react'
import { CorporateInfo } from './CorporateInfo'
import { VSpacer } from '../../../../components/VSpacer'
import { IndividualInfo } from './IndividualInfo'
import { Grid } from '@material-ui/core'
import {
  CorporateIdentity,
  IndividualIdentity
} from '../../../../types/identity'

export interface AuthorizerIdentitiesProps {
  corporates?: CorporateIdentity[]
  individual?: IndividualIdentity
}

export const AuthorizerIdentities = (props: AuthorizerIdentitiesProps) => {
  const { corporates = [], individual } = props

  return (
    <Grid item xs={3}>
      {corporates.map(c => (
        <CorporateInfo data={c} />
      ))}
      <VSpacer size='large' />
      {individual !== undefined && <IndividualInfo data={individual} />}
    </Grid>
  )
}
