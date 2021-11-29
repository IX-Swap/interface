import React from 'react'
import { Redirect } from 'react-router-dom'
import { AppRoute } from 'app/router/config'
// import { useIsAccredited } from 'helpers/acl'

export const RedirectToDefaultPage = () => {
  // TODO Change it after complete all dashboard pages
  // const isAccredited = useIsAccredited()
  //
  // if (isAccredited) {
  //   return (
  //     <>
  //       <Redirect to={AppRoute.identity} />
  //     </>
  //   )
  // }
  return <Redirect to={AppRoute.identity} />
}
