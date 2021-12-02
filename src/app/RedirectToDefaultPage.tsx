import React from 'react'
import { Redirect } from 'react-router-dom'
import { AppRoute } from 'app/router/config'

export const RedirectToDefaultPage = () => {
  return <Redirect to={AppRoute.identity} />
}
