import React, { ComponentType, createElement } from 'react'
import { useParams } from 'react-router-dom'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { useIndividualAccreditation } from '../hooks/useIndividualAccreditation'
import { IndividualAccreditationView } from '../components/IndividualAccreditationView/IndividualAccreditationView'

export interface IndividualAccreditationContainerProps {
  component?: ComponentType<{
    data: any
    type?: CorporateType
  }>
  loadingComponent?: ComponentType
  errorComponent?: ComponentType
  fallbackComponent?: ComponentType
  type?: CorporateType
}

export const IndividualAccreditationContainer = ({
  component,
  loadingComponent,
  errorComponent,
  fallbackComponent,
  type
}: IndividualAccreditationContainerProps) => {
  const { individualId } = useParams<{
    userId: string
    individualId: string
  }>()
  const { data, isLoading, isError } = useIndividualAccreditation(individualId)

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

  return <IndividualAccreditationView data={data} />
}
