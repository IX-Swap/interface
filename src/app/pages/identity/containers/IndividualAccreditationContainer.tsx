import React, { ComponentType, createElement } from 'react'
import { useParams } from 'react-router-dom'
import { useIndividualAccreditation } from '../hooks/useIndividualAccreditation'
import { IndividualAccreditationView } from '../components/IndividualAccreditationView/IndividualAccreditationView'

export interface IndividualAccreditationContainerProps {
  component?: ComponentType<{
    data: any
  }>
  loadingComponent?: ComponentType
  errorComponent?: ComponentType
  fallbackComponent?: ComponentType
}

export const IndividualAccreditationContainer = ({
  component,
  loadingComponent,
  errorComponent,
  fallbackComponent
}: IndividualAccreditationContainerProps) => {
  const { identityId } = useParams<{
    userId: string
    identityId: string
  }>()
  const { data, isLoading, isError } = useIndividualAccreditation(identityId)

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

  return <IndividualAccreditationView data={data} />
}
