import React from 'react'
import { render } from 'test-utils'
import ViewBank from 'app/pages/accounts/pages/banks/pages/ViewBank/ViewBank'
import { bank } from '__fixtures__/authorizer'
import { BankPreview } from 'app/components/BankPreview/BankPreview'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { QueryStatus } from 'react-query'
import { history } from 'config/history'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { generatePath, Route } from 'react-router-dom'

jest.mock('app/components/BankPreview/BankPreview', () => ({
  BankPreview: jest.fn(() => <div data-testid='bank-preview' />)
}))
jest.mock('app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('ViewBank', () => {
  beforeEach(() => {
    history.push(generatePath(BanksRoute.view, { bankId: bank._id }))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders nothing if loading', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
    )

    const { container } = render(<ViewBank />)

    expect(container).toBeEmptyDOMElement()
    expect(BankPreview).toHaveBeenCalledTimes(0)
  })

  it('renders BankPreview without error', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({
        map: { [bank._id]: bank }
      })
    )

    render(
      <Route path={BanksRoute.view}>
        <ViewBank />
      </Route>
    )

    expect(BankPreview).toHaveBeenCalledWith({ data: bank }, {})
  })
})
