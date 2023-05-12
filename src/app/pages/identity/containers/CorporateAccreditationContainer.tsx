import React, { ComponentType, createElement } from 'react'
import { useCorporateAccreditation } from 'app/pages/identity/hooks/useCorporateAccreditation'
import { CorporateAccreditationView } from 'app/pages/identity/components/CorporateAccreditationView/CorporateAccreditationView'
import { useParams } from 'react-router-dom'
// import { CorporateAccreditation } from '../types/forms'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'

export interface CorporateAccreditationContainerProps {
  component?: ComponentType<{
    // data: CorporateAccreditation
    data: any
    type?: CorporateType
  }>
  loadingComponent?: ComponentType
  errorComponent?: ComponentType
  fallbackComponent?: ComponentType
  type?: CorporateType
}

export const CorporateAccreditationContainer = ({
  component,
  loadingComponent,
  errorComponent,
  fallbackComponent,
  type
}: CorporateAccreditationContainerProps) => {
  const { identityId } = useParams<{
    userId: string
    identityId: string
  }>()
  const { data, isLoading, isError } = useCorporateAccreditation(identityId)

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

  return <CorporateAccreditationView data={data} />
}
