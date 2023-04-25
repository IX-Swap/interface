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
    return createElement(component, { data, type })
  }

  return <IndividualAccreditationView data={data} />
}

// import React, { ComponentType, createElement, FC } from 'react'
// import { IndividualIdentityView } from 'app/pages/identity/components/IndividualIdentityView/IndividualIdentityView'
// import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
// import { useParams } from 'react-router-dom'
// import { IndividualIdentity } from '../types/forms'
// import { IndividualAccreditationView } from '../components/IndividualAccreditationView/IndividualAccreditationView'

// export interface IndividualAccreditationContainerProps {
//   component?: ComponentType<{ data: IndividualIdentity }>
//   loadingComponent?: ComponentType
//   errorComponent?: ComponentType
//   fallbackComponent?: ComponentType
// }

// export const IndividualAccreditationContainer: FC<
// IndividualAccreditationContainerProps
// > = ({ component, loadingComponent, errorComponent, fallbackComponent }) => {
//   const { userId } = useParams<{ identityId: string; userId: string }>()
//   const { data, isLoading, isError } = useIndividualIdentity(userId)

//   if (isLoading) {
//     return loadingComponent === undefined
//       ? null
//       : createElement(loadingComponent)
//   }

//   if (isError) {
//     return errorComponent === undefined ? null : createElement(errorComponent)
//   }

//   if (data === undefined) {
//     return fallbackComponent === undefined
//       ? null
//       : createElement(fallbackComponent)
//   }

//   if (component !== undefined) {
//     return createElement(component, { data })
//   }

//   return <IndividualAccreditationView data={data} />
// }
