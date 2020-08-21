import React from 'react'
import { fireEvent, renderWithUserStore, fakeUserStore } from 'test-utils'
import { AuthTabs } from 'v2/auth/components/AuthTabs'
import { cleanup } from '@testing-library/react'

describe('AuthTabs', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders correctly with Login tab active by default', () => {
    const { getByTestId } = renderWithUserStore(<AuthTabs />)

    const tabs = getByTestId('auth-tabs')
    const loginTab = getByTestId('login')
    const registerTab = getByTestId('register')

    expect(tabs).toBeInTheDOM()
    expect(loginTab).toBeInTheDOM()
    expect(registerTab).toBeInTheDOM()
    expect(loginTab).toHaveClass('Mui-selected')
  })

  it('handles click on Register by calling userStore.setActiveTab with correct index', async () => {
    const { getByTestId } = renderWithUserStore(<AuthTabs />)
    const registerTab = getByTestId('register')

    expect(registerTab).toBeInTheDOM()

    fireEvent.click(registerTab)

    expect(fakeUserStore.setActiveTab).toBeCalledTimes(1)
    expect(fakeUserStore.setActiveTab).toBeCalledWith(1)
  })

  it('handles click on Login by calling userStore.setActiveTab with correct index', async () => {
    const { getByTestId } = renderWithUserStore(<AuthTabs />)
    const loginTab = getByTestId('login')

    expect(loginTab).toBeInTheDOM()

    fireEvent.click(loginTab)

    expect(fakeUserStore.setActiveTab).toBeCalledTimes(1)
    expect(fakeUserStore.setActiveTab).toBeCalledWith(0)
  })
})
