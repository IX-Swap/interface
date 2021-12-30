import { AuthorizerLandingPage } from 'app/components/LandingPage/AuthorizerLandingPage'
import React from 'react'
import { render } from 'test-utils'
import { InternalRouteProps } from 'types/util'

describe('AuthorizerLandingPage', () => {
  const links: InternalRouteProps[] = [
    {
      path: 'path/',
      label: 'Path'
    }
  ]

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AuthorizerLandingPage title='Authorizer' links={links} />)
  })
})
