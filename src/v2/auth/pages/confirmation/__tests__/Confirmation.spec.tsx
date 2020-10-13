/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  renderWithUserStore
} from 'test-utils'
import { Confirmation } from 'v2/auth/pages/confirmation/Confirmation'
import { AuthRoute } from 'v2/auth/router'
import { history } from 'v2/history'
import * as useVerifySignupHook from 'v2/auth/hooks/useVerifySignup'
import {
  generateMutationResult,
  mutationHookResult
} from '__fixtures__/useQuery'

describe('VerifyRegistration', () => {
  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', async () => {
    render(<Confirmation />)
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
    const loadingIndicator = getByTestId('loading')

    expect(loadingIndicator).toBeTruthy()
  })

  it('handles back to login button click', async () => {
    jest
      .spyOn(useVerifySignupHook, 'useVerifySignup')
      .mockReturnValue([
        jest.fn(),
        generateMutationResult({ isLoading: false })
      ])

    const { getByText } = render(<Confirmation />)
    const button = getByText(/back to login/i)

    fireEvent.click(button)

    await waitFor(() => {
      expect(history.location.pathname).toBe(AuthRoute.login)
    })
  })

  it('calls api for token verification if token is present', async () => {
    history.push(`${AuthRoute.confirm}?token=interesnayaschitalochka...`)
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
