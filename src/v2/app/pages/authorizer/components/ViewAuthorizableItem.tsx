import React from 'react'
import { AuthorizerView } from './AuthorizerView'
import { DataroomFeature } from 'v2/types/authorizer'
import { useAuthorizerData } from 'v2/app/pages/authorizer/hooks/useAuthorizerData'
import { authorizerItemMap } from 'v2/app/pages/authorizer/authorizerItemMap'

export const ViewAuthorizableItem = () => {
  const { data: item, category, isLoading } = useAuthorizerData()
  const Component: React.ComponentType<any> =
    authorizerItemMap[category].component

  if (isLoading) {
    return null
  }

  return (
    <AuthorizerView
      title='View Item'
      data={item}
      feature={DataroomFeature[category]}
    >
      <Component data={item} />
    </AuthorizerView>
  )
}
