import React from 'react'
import { render } from 'test-utils'
import { WADialogTitle } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialogTitle'

describe('WADialogTitle', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<WADialogTitle label='Test label' />)
  })

  it('renders label correctly', () => {
    const { container } = render(<WADialogTitle label='Test label' />)

    expect(container).toHaveTextContent('Test label')
  })
})
