import { VirtualAccountNumberInfo } from 'app/pages/accounts/components/VirtualAccountCard/VirtualAccountNumberInfo'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('VirtualAccountNumberInfo', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <VirtualAccountNumberInfo
        currency='SGD'
        accountNumber='1234567890123456'
      />
    )
  })

  it('renders props without errors', () => {
    const { getByText } = render(
      <VirtualAccountNumberInfo
        currency='SGD'
        accountNumber='1234567890123456'
      />
    )

    expect(getByText('SGD')).toBeTruthy()
    expect(getByText('1234')).toBeTruthy()
    expect(getByText('5678')).toBeTruthy()
    expect(getByText('9012')).toBeTruthy()
    expect(getByText('3456')).toBeTruthy()
  })
})
