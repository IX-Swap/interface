import { AuthorizerLandingPage } from 'app/components/LandingPage/AuthorizerLandingPage'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { InternalRouteProps } from 'types/util'

describe('AuthorizerLandingPage', () => {
  const links: InternalRouteProps[] = [
    {
      path: 'path/',
      label: 'Path'
    }
  ]

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AuthorizerLandingPage title='Authorizer' links={links} />)
  })
})
