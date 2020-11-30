import React from 'react'
import { AuthorizerView } from './AuthorizerView'
import { DataroomFeature } from 'types/authorizer'
import { useAuthorizerData } from 'app/pages/authorizer/hooks/useAuthorizerData'
import { authorizerItemMap } from 'app/pages/authorizer/authorizerItemMap'

export const ViewAuthorizableItem = () => {
  const { data: item, category, isLoading } = useAuthorizerData()
  const { component: Component, title } = authorizerItemMap[category]

  if (isLoading) {
    return null
  }

  return (
    <AuthorizerView
      title={title}
      data={item}
      feature={DataroomFeature[category]}
    >
      <Component data={item} />
    </AuthorizerView>
  )
}
