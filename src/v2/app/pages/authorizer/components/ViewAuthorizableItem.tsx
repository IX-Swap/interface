import React from 'react'
import { AuthorizerView } from './AuthorizerView'
import { DataroomFeature } from 'v2/types/authorizer'
import { useAuthorizerData } from 'v2/app/pages/authorizer/hooks/useAuthorizerData'
import { authorizerItemMap } from 'v2/app/pages/authorizer/authorizerItemMap'

export const ViewAuthorizableItem = () => {
  const { data: item, category, isLoading } = useAuthorizerData()
  const component = authorizerItemMap[
    category as keyof typeof authorizerItemMap
  ].component as React.ComponentType<any>

  if (isLoading) {
    return null
  }

  return (
    <AuthorizerView
      title='View Item'
      data={item}
      feature={DataroomFeature[category as keyof typeof DataroomFeature]}
    >
      {React.createElement(component, { data: item })}
    </AuthorizerView>
  )
}
