import React from 'react'
import { render, cleanup } from 'test-utils'
import { AuthRoot } from 'auth/AuthRoot'
import { AuthWrapper } from 'ui/AuthWrapper'
import { InfoPanel } from 'auth/components/InfoPanel'
import { AppLogo } from 'app/components/AppLogo/AppLogo'

jest.mock('ui/AuthWrapper', () => ({
  AuthWrapper: jest.fn(({ children }) => <>{children}</>)
}))

jest.mock('auth/components/InfoPanel', () => ({
  InfoPanel: jest.fn(() => null)
}))

jest.mock('app/components/AppLogo/AppLogo', () => ({
  AppLogo: jest.fn(() => null)
}))

describe('AuthRoot', () => {
  const renderRoutesFn = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AuthRoot />)
  })

  it('renders components without errors', () => {
    render(<AuthRoot />)

    expect(AuthWrapper).toHaveBeenCalled()
    expect(InfoPanel).toHaveBeenCalled()
    expect(AppLogo).toHaveBeenCalled()
    expect(renderRoutesFn).toHaveBeenCalled()
  })
})
