import * as useOnboardingDialog from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { AppRoute } from 'components/AppRoute'
import { history } from 'config/history'
import * as useCachedUser from 'hooks/auth/useCachedUser'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { user } from '__fixtures__/user'
import { AppRoute as AppPath } from 'app/router/config'
import * as useIsAccredited from 'helpers/acl'

describe('AppRoute', () => {
  beforeEach(() => {
    const useOnboardingDialogResponse = {
      showEnable2FADialog: () => {},
      showCreateAccountDialog: () => {}
    }

    jest
      .spyOn(useOnboardingDialog, 'useOnboardingDialog')
      .mockImplementation(() => useOnboardingDialogResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    jest
      .spyOn(useCachedUser, 'useCachedUser')
      .mockImplementation(() => user as any)

    render(
      <AppRoute path={'/'}>
        <div>App</div>
      </AppRoute>
    )
  })

  it('redirects to auth page when user is undefined', () => {
    jest
      .spyOn(useCachedUser, 'useCachedUser')
      .mockImplementation(() => undefined as any)

    render(
      <AppRoute path={AppPath.identity}>
        <div>App</div>
      </AppRoute>
    )

    expect(history.location.pathname).toBe('/auth')
  })

  it('redirects to identity page when isAccredited is false', () => {
    jest
      .spyOn(useCachedUser, 'useCachedUser')
      .mockImplementation(() => user as any)

    jest
      .spyOn(useIsAccredited, 'useIsAccredited')
      .mockImplementation(() => false as any)

    render(
      <AppRoute path={AppPath.issuance}>
        <div>App</div>
      </AppRoute>
    )

    expect(history.location.pathname).toBe(AppPath.identity)
  })

  it('redirects to educationCentre page when is2FAEnabled is false', () => {
    jest
      .spyOn(useCachedUser, 'useCachedUser')
      .mockImplementation(() => user as any)

    jest
      .spyOn(useIsAccredited, 'useIsAccredited')
      .mockImplementation(() => true as any)

    jest
      .spyOn(useIsAccredited, 'useIsEnabled2FA')
      .mockImplementation(() => false as any)

    render(
      <AppRoute path={AppPath.issuance}>
        <div>App</div>
      </AppRoute>
    )

    expect(history.location.pathname).toBe(AppPath.identity)
  })
})
