import React from 'react'
import { CorporateInfo } from './CorporateInfo'
import { IndividualInfo } from './IndividualInfo'
import { CorporateIdentity, IndividualIdentity } from 'types/identity'

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
