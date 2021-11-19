import React from 'react'
import { render, cleanup } from 'test-utils'
import { CreateWalletDialogTitle } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialogTitle'

describe('CreateWalletDialogTitle', () => {
  const buttonClickHandler = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <CreateWalletDialogTitle
        label='Test label'
        onButtonCloseClick={buttonClickHandler}
      />
    )
  })

  it('renders label correctly', () => {
    const { container } = render(
      <CreateWalletDialogTitle
        label='Test label'
        onButtonCloseClick={buttonClickHandler}
      />
    )

    expect(container).toHaveTextContent('Test label')
  })
})
