/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import ViewBank from 'v2/app/pages/accounts/pages/banks/ViewBank/ViewBank'

import { asset } from '__fixtures__/authorizer'

import BankPreview from 'v2/app/components/bank-preview'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({ bankId: 'testBankId' })
}))

jest.mock('v2/app/components/bank-preview', () => {
  const BankPreview = jest.fn(() => <div data-testid='bank-preview'></div>)
  return BankPreview
})

jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')

describe('ViewBank', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders nothing if loading', () => {
    useBanksData.mockReturnValue({
      data: { map: { testBankId: { asset } } },
      status: 'loading'
    })

    const { container } = render(<ViewBank />)
    expect(container).toBeEmptyDOMElement()
    expect(BankPreview).toHaveBeenCalledTimes(0)
  })

  it('renders without error', () => {
    useBanksData.mockReturnValue({
      data: { map: { testBankId: { asset } } },
      status: 'success'
    })

    render(<ViewBank />)

    expect(BankPreview).toHaveBeenCalledTimes(1)
  })
})
