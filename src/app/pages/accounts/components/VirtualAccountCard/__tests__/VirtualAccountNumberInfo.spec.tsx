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
        availableBalance={100000}
        onHold={123}
      />
    )
  })

  it('renders props without errors', () => {
    const { getByText } = render(
      <VirtualAccountNumberInfo
        currency='SGD'
        accountNumber='1234567890123456'
        availableBalance={100000}
        onHold={123}
      />
    )

    expect(getByText('SGD')).toBeTruthy()
    expect(getByText('1234567890123456')).toBeTruthy()
    expect(getByText('100,000.00')).toBeTruthy()
    expect(getByText('123.00')).toBeTruthy()
  })
})
