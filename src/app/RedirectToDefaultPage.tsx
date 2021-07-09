import React from 'react'
import { Redirect } from 'react-router-dom'
import { AppRoute } from 'app/router/config'
import { useIsAccredited } from 'helpers/acl'

export const RedirectToDefaultPage = () => {
  const isAccredited = useIsAccredited()

  if (isAccredited) {
    return (
      <>
        <Redirect to={AppRoute.home} />
      </>
    )
  }
  return <Redirect to={AppRoute.identity} />
}
