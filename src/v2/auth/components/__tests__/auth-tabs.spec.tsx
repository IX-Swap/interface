import React from 'react'
import { render, fireEvent } from 'test-utils'
import AuthTabs from '../auth-tabs'
import { useUserStore } from 'v2/auth/context'
import { cleanup } from '@testing-library/react'

jest.mock('v2/auth/context')

// FIXME
const useUserStoreMocked = (useUserStore as unknown) as jest.Mock<
  Partial<ReturnType<typeof useUserStore>>
>

useUserStoreMocked.mockReturnValue({
  activeTab: 0,
  setActiveTab: jest.fn()
})

describe('AuthTabs', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('renders correctly with login tab active by default', () => {
    const { getByTestId } = render(<AuthTabs />)
    const tabs = getByTestId('auth-tabs')
    const loginTab = getByTestId('login')
    const registerTab = getByTestId('register')

    expect(tabs).toBeInTheDOM()
    expect(loginTab).toBeInTheDOM()
    expect(registerTab).toBeInTheDOM()
    expect(loginTab).toHaveClass('Mui-selected')
  })

  it('handles click on register by calling userStore.setActiveTab with correct index', async () => {
    const userStore = useUserStoreMocked()
    const { getByTestId } = render(<AuthTabs />)
    const registerTab = getByTestId('register')

    expect(registerTab).toBeInTheDOM()

    fireEvent.click(registerTab)

    expect(userStore.setActiveTab).toBeCalledTimes(1)
    expect(userStore.setActiveTab).toBeCalledWith(1)
  })

  it('handles click on login by calling userStore.setActiveTab with correct index', async () => {
    const userStore = useUserStoreMocked()
    const { getByTestId } = render(<AuthTabs />)
    const loginTab = getByTestId('login')

    expect(loginTab).toBeInTheDOM()

    fireEvent.click(loginTab)

    expect(userStore.setActiveTab).toBeCalledTimes(1)
    expect(userStore.setActiveTab).toBeCalledWith(0)
  })
})
