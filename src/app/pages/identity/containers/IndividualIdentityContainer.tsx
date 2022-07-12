import React, { ComponentType, createElement, FC } from 'react'
import { IndividualIdentityView } from 'app/pages/identity/components/IndividualIdentityView/IndividualIdentityView'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { useParams } from 'react-router-dom'
import { IndividualIdentity } from '../types/forms'

export interface IndividualIdentityContainerProps {
  component?: ComponentType<{ data: IndividualIdentity }>
  loadingComponent?: ComponentType
  errorComponent?: ComponentType
  fallbackComponent?: ComponentType
}

export const IndividualIdentityContainer: FC<
  IndividualIdentityContainerProps
> = ({ component, loadingComponent, errorComponent, fallbackComponent }) => {
  const { userId } = useParams<{ identityId: string; userId: string }>()
  const { data, isLoading, isError } = useIndividualIdentity(userId)

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

  return <IndividualIdentityView data={data} />
}
