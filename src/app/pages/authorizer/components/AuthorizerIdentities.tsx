import React from 'react'
import { CorporateInfo } from './CorporateInfo'
import { IndividualInfo } from './IndividualInfo'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'

export interface AuthorizerIdentitiesProps {
  corporates?: CorporateIdentity[]
  individual?: IndividualIdentity
}

export const AuthorizerIdentities = (props: AuthorizerIdentitiesProps) => {
  const { corporates = [], individual } = props

  return (
    <>
      {corporates.map((c, index) => (
        <CorporateInfo data={c} key={index} />
      ))}
      {individual !== undefined && <IndividualInfo data={individual} />}
    </>
  )
}
