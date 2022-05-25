import { AuthRoute } from 'auth/router/config'
import { useSearchQuery } from 'hooks/useSearchQuery'
import React from 'react'
import { Redirect } from 'react-router-dom'

export const Callback = () => {
  const query = useSearchQuery()
  return (
    <Redirect
      to={`${AuthRoute.signup}?${query.toString()}&identityType=individual`}
    />
  )
}
