import * as useOnboardingDialog from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { AppRoute } from 'components/AppRoute'
import { history } from 'config/history'
import * as useCachedUser from 'hooks/auth/useCachedUser'
import React from 'react'
import { render } from 'test-utils'
import { user } from '__fixtures__/user'
import { AppRoute as AppPath } from 'app/router/config'
import * as useIsAccredited from 'helpers/acl'

describe('AppRoute', () => {
  const initialPath = '/'

  beforeEach(() => {
    history.push(initialPath)
    const useOnboardingDialogResponse = {
      showEnable2FADialog: () => {},
      showCreateAccountDialog: () => {}
    }

    jest
      .spyOn(useOnboardingDialog, 'useOnboardingDialog')
      .mockImplementation(() => useOnboardingDialogResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
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

  it('does not redirect when isAccredited is true', () => {
    jest
      .spyOn(useCachedUser, 'useCachedUser')
      .mockImplementation(() => user as any)

    jest
      .spyOn(useIsAccredited, 'useIsAccredited')
      .mockImplementation(() => true as any)

    render(
      <AppRoute path={AppPath.issuance}>
        <div>App</div>
      </AppRoute>
    )

    expect(history.location.pathname).toBe(initialPath)
  })
})
