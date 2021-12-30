import { AvailableBalanceInfo } from 'app/pages/accounts/components/VirtualAccountCard/AvailableBalanceInfo'
import React from 'react'
import { render } from 'test-utils'

describe('AvailableBalanceInfo', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AvailableBalanceInfo currency='USD' amount={50000} />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(
      <AvailableBalanceInfo currency='USD' amount={50000} />
    )

    expect(getByText('USD')).toBeTruthy()
    expect(getByText('50,000.00')).toBeTruthy()
  })
})
