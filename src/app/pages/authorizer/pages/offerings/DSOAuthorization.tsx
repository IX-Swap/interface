import React from 'react'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { AppFeature } from 'types/app'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useParams } from 'react-router-dom'
import { DSOView } from 'app/components/DSO/DSOView'

export const DSOAuthorization = () => {
  const { userId, dsoId } = useParams<{ userId: string; dsoId: string }>()
  const { data, isLoading } = useDSOById(dsoId, userId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <AuthorizerView
      title={data.tokenName}
      data={data}
      feature={AppFeature.Offerings}
    >
      <DSOView data={data} />
    </AuthorizerView>
  )
}
