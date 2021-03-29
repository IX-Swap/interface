import React, { ComponentType, createElement } from 'react'
import { useCorporate } from 'app/pages/_identity/hooks/useCorporate'
import { CorporateIdentityView } from 'app/pages/_identity/components/CorporateIdentityView/CorporateIdentityView'
import { CorporateIssuerView } from 'app/pages/_identity/components/CorporateIssuerView/CorporateIssuerView'
import { useParams } from 'react-router'
import { CorporateIdentity } from 'types/identity'

export interface CorporateIdentityContainerProps {
  component?: ComponentType<{ data: CorporateIdentity }>
  loadingComponent?: ComponentType
  errorComponent?: ComponentType
  fallbackComponent?: ComponentType
}

export const CorporateIdentityContainer = ({
  component,
  loadingComponent,
  errorComponent,
  fallbackComponent
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
    return createElement(component, { data })
  }

  const isIssuer = data.type === 'issuer'

  return isIssuer ? (
    <CorporateIssuerView data={data} />
  ) : (
    <CorporateIdentityView data={data} />
  )
}
