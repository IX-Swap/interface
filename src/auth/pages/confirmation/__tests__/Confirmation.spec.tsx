import React from 'react'
import { cleanup, renderWithUserStore } from 'test-utils'
import { Confirmation } from 'auth/pages/confirmation/Confirmation'
import { AuthRoute } from 'auth/router'
import { history } from 'config/history'
import * as useVerifySignupHook from 'auth/hooks/useVerifySignup'
import {
  generateMutationResult,
  mutationHookResult
} from '__fixtures__/useQuery'

describe('VerifyRegistration', () => {
  const token = 'interesnayaschitalochka...'

  beforeEach(() => {
    history.push(`${AuthRoute.confirm}?token=${token}`)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', async () => {
    renderWithUserStore(<Confirmation />)
  })

  it('renders loading indicator if isLoading=true', async () => {
    jest
      .spyOn(useVerifySignupHook, 'useVerifySignup')
      .mockImplementation(() => [
        jest.fn(),
        {
          ...mutationHookResult,
          isLoading: true
        }
      ])

    const { getByTestId } = renderWithUserStore(<Confirmation />)
    const loadingIndicator = getByTestId('progress')

    expect(loadingIndicator).toBeTruthy()
  })

  it('calls api for token verification if token is present', async () => {
    const verifySignup = jest.fn()
    jest
      .spyOn(useVerifySignupHook, 'useVerifySignup')
      .mockReturnValue([verifySignup, generateMutationResult({})])

    renderWithUserStore(<Confirmation />)

    expect(verifySignup).toHaveBeenCalled()
  })

  it('does not calls api for token verification if token is present', async () => {
    history.push(AuthRoute.confirm)
    const verifySignup = jest.fn()

    jest
      .spyOn(useVerifySignupHook, 'useVerifySignup')
      .mockReturnValue([verifySignup, generateMutationResult({})])

    renderWithUserStore(<Confirmation />)

    expect(verifySignup).not.toHaveBeenCalled()
  })
})
