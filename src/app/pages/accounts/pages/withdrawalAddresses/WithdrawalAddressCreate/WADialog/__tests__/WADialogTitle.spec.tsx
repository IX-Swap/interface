import React from 'react'
import { render, cleanup } from 'test-utils'
import { WADialogTitle } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialogTitle'

describe('WADialogTitle', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WADialogTitle label='Test label' />)
  })

  it('renders label correctly', () => {
    const { container } = render(<WADialogTitle label='Test label' />)

    expect(container).toHaveTextContent('Test label')
  })
})
