/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import ViewBank from 'v2/app/pages/accounts/pages/banks/ViewBank/ViewBank'

import { bank } from '__fixtures__/authorizer'
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

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('ViewBank', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders nothing if loading', () => {
    useBanksDataMock.mockReturnValue({
      data: { map: { testBankId: bank } },
      status: 'loading'
    })

    const { container } = render(<ViewBank />)
    expect(container).toBeEmptyDOMElement()
    expect(BankPreview).toHaveBeenCalledTimes(0)
  })

  it('renders BankPreview without error', () => {
    useBanksDataMock.mockReturnValue({
      data: { map: { testBankId: bank } },
      status: 'success'
    })

    render(<ViewBank />)

    expect(BankPreview).toHaveBeenCalledTimes(1)
    expect(BankPreview).toHaveBeenCalledWith({ bank: bank }, {})
  })
})
