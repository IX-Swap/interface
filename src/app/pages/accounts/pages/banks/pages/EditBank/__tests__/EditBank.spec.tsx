import React from 'react'
import { render } from 'test-utils'
import { bank } from '__fixtures__/authorizer'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { BankForm } from 'app/pages/accounts/pages/banks/components/BankForm'
import { EditBank } from 'app/pages/accounts/pages/banks/pages/EditBank/EditBank'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { Route } from 'react-router-dom'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { history } from 'config/history'

jest.mock('app/pages/accounts/pages/banks/hooks/useBanksData')
jest.mock('app/pages/accounts/pages/banks/components/BankForm', () => ({
  BankForm: jest.fn(() => null)
}))

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('EditBank', () => {
  beforeEach(() => {
    history.push(`/app/accounts/bank-accounts/${bank._id}/edit`, {
      bankId: bank._id
    })
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders nothing if loading', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({
        map: { [bank._id]: bank },
        queryStatus: QueryStatus.Loading
      })
    )

    const { container } = render(<EditBank />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders BankForm without error', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({ map: { [bank._id]: bank } })
    )

    render(
      <Route path={BanksRoute.edit}>
        <EditBank />
      </Route>
    )

    expect(BankForm).toHaveBeenCalledWith(
      {
        submitButtonLabel: 'Save',
        onSubmit: expect.any(Function),
        bank
      },
      {}
    )
  })
})
