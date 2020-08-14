/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { useUserStore } from 'v2/auth/context'
import { render } from 'test-utils'
import AuthEntryPoint from 'v2/auth/index'
import history from 'v2/history'
import { cleanup } from '@testing-library/react'

jest.mock('v2/auth/context')
jest.mock('v2/auth/pages/login', () => () => <div data-testid='test' />)
jest.mock('v2/auth/pages/register', () => () => <div data-testid='test' />)
jest.mock('v2/auth/pages/password-reset', () => () => (
  <div data-testid='test' />
))

// FIXME
const useUserStoreMocked = (useUserStore as unknown) as jest.Mock<
  Partial<ReturnType<typeof useUserStore>>
>

describe('AuthEntryPoint', () => {
  beforeEach(() => {
    history.push('/')
    useUserStoreMocked.mockReturnValue({
      setActiveTab: jest.fn()
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('attempts to set active tab to 0 if path is /auth/login', () => {
    useUserStoreMocked.mockReturnValue({
      setActiveTab: jest.fn()
    })
    const userStore = useUserStoreMocked()
    render(<AuthEntryPoint />)

    expect(userStore.setActiveTab).toBeCalledTimes(1)
    expect(userStore.setActiveTab).toBeCalledWith(0)
  })

  it('attempts to set active tab to 1 if path is /auth/register', () => {
    history.push('/auth/register')
    useUserStoreMocked.mockReturnValue({
      setActiveTab: jest.fn()
    })
    const userStore = useUserStoreMocked()
    render(<AuthEntryPoint />)

    expect(userStore.setActiveTab).toBeCalledTimes(1)
    expect(userStore.setActiveTab).toBeCalledWith(1)
  })

  it('redirects to /app if user is authenticated', () => {
    useUserStoreMocked.mockReturnValue({
      isAuthenticated: true
    })
    render(<AuthEntryPoint />)

    expect(history.location.pathname).toBe('/app')
  })

  it('redirects to /auth/login if path does not match', () => {
    history.push('/wrong/path')
    render(<AuthEntryPoint />)

    expect(history.location.pathname).toBe('/auth/login')
  })

  it('does not render AuthTabs on password-reset route', () => {
    history.push('/auth/password-reset')
    const { queryByTestId } = render(<AuthEntryPoint />)
    const authTabs = queryByTestId('auth-tabs')

    expect(authTabs).not.toBeInTheDocument()
  })

  it('renders Login if path is /auth/login', () => {
    history.push('/auth/login')
    const { getByTestId } = render(<AuthEntryPoint />)
    const component = getByTestId('test')

    expect(component).toBeTruthy()
  })

  it('renders Register if path is /auth/register', () => {
    history.push('/auth/register')
    const { getByTestId } = render(<AuthEntryPoint />)
    const component = getByTestId('test')

    expect(component).toBeTruthy()
  })

  it('renders ResetPassword if path is /auth/password-reset', () => {
    history.push('/auth/password-reset')
    const { getByTestId } = render(<AuthEntryPoint />)
    const component = getByTestId('test')

    expect(component).toBeTruthy()
  })
})
