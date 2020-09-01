/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  renderWithUserStore
} from 'test-utils'
import { Confirmation } from 'v2/auth/confirmation/Confirmation'
import { AuthFormMessage } from 'v2/auth/components/AuthFormMessage'
import { AuthRoute } from 'v2/auth/router'
import { history } from 'v2/history'

jest.mock('v2/auth/components/AuthFormMessage', () => ({
  AuthFormMessage: jest.fn(() => null)
}))

describe('VerifyRegistration', () => {
  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders without error', async () => {
    render(<Confirmation />)
  })

  it('renders AuthFormMessage and back to login button', async () => {
    const { getByText } = renderWithUserStore(<Confirmation />)
    const backToLoginButton = getByText(/back to login/i)

    expect(backToLoginButton).toBeTruthy
    expect(AuthFormMessage).toHaveBeenCalledTimes(1)
  })

  it('renders loading indicator if isLoading=true', async () => {
    const { getByTestId } = renderWithUserStore(<Confirmation />, {
      isLoading: true
    })
    const loadingIndicator = getByTestId('loading')

    expect(loadingIndicator).toBeTruthy
  })

  it('handles back to login button click', async () => {
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

    renderWithUserStore(<Confirmation />, { verifySignup })

    expect(verifySignup).toHaveBeenCalledTimes(1)
  })

  it('does not calls api for token verification if token is present', async () => {
    history.push(AuthRoute.confirm)
    const verifySignup = jest.fn()

    renderWithUserStore(<Confirmation />, { verifySignup })

    expect(verifySignup).toHaveBeenCalledTimes(0)
  })
})
