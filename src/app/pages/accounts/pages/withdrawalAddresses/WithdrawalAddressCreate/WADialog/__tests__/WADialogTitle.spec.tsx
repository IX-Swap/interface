import React from 'react'
import { render } from 'test-utils'
import { WADialogTitle } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialogTitle'

describe('WADialogTitle', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders label correctly', () => {
    const { container } = render(<WADialogTitle label='Test label' />)

    expect(container).toHaveTextContent('Test label')
  })
})
