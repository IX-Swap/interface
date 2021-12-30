import React from 'react'
import { render, waitFor } from 'test-utils'
import { EntryPoint } from 'EntryPoint'
import { LoadingFullScreen } from 'auth/components/LoadingFullScreen'
import * as useAppInit from 'hooks/useAppInit'
import { SentryRoute } from 'components/SentryRoute'
import { history } from 'config/history'

jest.mock('auth/components/LoadingFullScreen', () => ({
  LoadingFullScreen: jest.fn(() => null)
}))

jest.mock('components/SentryRoute', () => ({
  SentryRoute: jest.fn(() => null)
}))

jest.mock('app/AppRoot', () => ({
  AppRoot: jest.fn(() => null)
}))

describe('EntryPoint', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders LoadingFullScreen if !isFinished', () => {
    const objResponse = {
      isFinished: false,
      isSuccess: true
    }

    jest
      .spyOn(useAppInit, 'useAppInit')
      .mockImplementation(() => objResponse as any)

    render(<EntryPoint />)

    expect(LoadingFullScreen).toHaveBeenCalled()
  })

  it('renders SentryRoute with correct props when route is /app', async () => {
    const objResponse = {
      isFinished: true,
      isSuccess: true
    }

    jest
      .spyOn(useAppInit, 'useAppInit')
      .mockImplementation(() => objResponse as any)

    history.push('/app')

    render(<EntryPoint />)
    expect(SentryRoute).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        path: '/app'
      }),
      {}
    )
  })

  it('renders SentryRoute with correct props when route is /auth', async () => {
    const objResponse = {
      isFinished: true,
      isSuccess: true
    }

    jest
      .spyOn(useAppInit, 'useAppInit')
      .mockImplementation(() => objResponse as any)

    history.push('/auth')

    render(<EntryPoint />)
    await waitFor(() =>
      expect(SentryRoute).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          path: '/auth'
        }),
        {}
      )
    )
  })
})
