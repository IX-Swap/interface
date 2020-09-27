/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, render } from 'test-utils'
import ViewBank from 'v2/app/pages/accounts/pages/banks/ViewBank/ViewBank'
import { bank } from '__fixtures__/authorizer'
import { BankPreview } from 'v2/app/components/BankPreview/BankPreview'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { QueryStatus } from 'react-query'
import { history } from 'v2/history'
import { BanksRoute } from 'v2/app/pages/accounts/pages/banks/router'

jest.mock('v2/app/components/BankPreview/BankPreview', () => ({
  BankPreview: jest.fn(() => <div data-testid='bank-preview' />)
}))

jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('ViewBank', () => {
  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders nothing if loading', () => {
    useBanksDataMock.mockReturnValue({
      data: { map: {}, raw: [], list: [] },
      status: QueryStatus.Loading
    })

    const { container } = render(<ViewBank />)
    expect(container).toBeEmptyDOMElement()
    expect(BankPreview).toHaveBeenCalledTimes(0)
  })

  it('renders BankPreview without error', () => {
    history.push(BanksRoute.view, { bankId: 'testBankId' })
    useBanksDataMock.mockReturnValue({
      data: { map: { testBankId: bank }, raw: [], list: [] },
      status: QueryStatus.Success
    })

    render(<ViewBank />)

    expect(BankPreview).toHaveBeenCalledTimes(1)
    expect(BankPreview).toHaveBeenCalledWith({ bank: bank }, {})
  })
})
