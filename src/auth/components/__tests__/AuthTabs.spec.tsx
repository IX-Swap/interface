import React from 'react'
import { fireEvent, renderWithUserStore, fakeUserStore } from 'test-utils'
import { AuthTabs } from 'auth/components/AuthTabs'
import {} from '@testing-library/react'

describe('AuthTabs', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders correctly with Login tab active by default', () => {
    const { getByTestId } = renderWithUserStore(<AuthTabs />)

    const tabs = getByTestId('auth-tabs')
    const loginTab = getByTestId('login')
    const registerTab = getByTestId('register')

    expect(tabs).toBeTruthy()
    expect(loginTab).toBeTruthy()
    expect(registerTab).toBeTruthy()
    expect(loginTab).toHaveClass('Mui-selected')
  })

  it('handles click on Register by calling userStore.setActiveTab with correct index', async () => {
    const { getByTestId } = renderWithUserStore(<AuthTabs />)
    const registerTab = getByTestId('register')

    expect(registerTab).toBeTruthy()

    fireEvent.click(registerTab)

    expect(fakeUserStore.setActiveTab).toBeCalledTimes(1)
    expect(fakeUserStore.setActiveTab).toBeCalledWith(1)
  })

  it('handles click on Login by calling userStore.setActiveTab with correct index', async () => {
    const { getByTestId } = renderWithUserStore(<AuthTabs />)
    const loginTab = getByTestId('login')

    expect(loginTab).toBeTruthy()

    fireEvent.click(loginTab)

    expect(fakeUserStore.setActiveTab).toBeCalledTimes(1)
    expect(fakeUserStore.setActiveTab).toBeCalledWith(0)
  })
})
