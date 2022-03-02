import React, { ComponentType, createElement } from 'react'
import { useCorporate } from 'app/pages/identity/hooks/useCorporate'
import { CorporateIdentityView } from 'app/pages/identity/components/CorporateIdentityView/CorporateIdentityView'
import { CorporateIssuerView } from 'app/pages/identity/components/CorporateIssuerView/CorporateIssuerView'
import { useParams } from 'react-router-dom'
import { CorporateIdentity } from '../types/forms'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'

export interface CorporateIdentityContainerProps {
  component?: ComponentType<{ data: CorporateIdentity; type?: CorporateType }>
  loadingComponent?: ComponentType
  errorComponent?: ComponentType
  fallbackComponent?: ComponentType
  type?: CorporateType
}

export const CorporateIdentityContainer = ({
  component,
  loadingComponent,
  errorComponent,
  fallbackComponent,
  type
}: CorporateIdentityContainerProps) => {
  const { userId, identityId } = useParams<{
    userId: string
    identityId: string
  }>()
  const { data, isLoading, isError } = useCorporate({ userId, identityId })

  if (isLoading) {
    return loadingComponent === undefined
      ? null
      : createElement(loadingComponent)
  }

  if (isError) {
    return errorComponent === undefined ? null : createElement(errorComponent)
  }

  if (data === undefined) {
    return fallbackComponent === undefined
      ? null
      : createElement(fallbackComponent)
  }

  if (component !== undefined) {
    return createElement(component, { data, type })
  }

  const isIssuer = data.type === 'issuer'

  return isIssuer ? (
    <CorporateIssuerView data={data} />
  ) : (
    <CorporateIdentityView data={data} />
  )
}
