/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { bank } from '__fixtures__/authorizer'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { BanksRoute } from 'v2/app/pages/accounts/pages/banks/router'
import { BankForm } from 'v2/app/pages/accounts/pages/banks/components/BankForm'
import { EditBank } from 'v2/app/pages/accounts/pages/banks/EditBank/EditBank'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { history } from 'v2/history'

jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')
jest.mock('v2/app/pages/accounts/pages/banks/components/BankForm', () => ({
  BankForm: jest.fn(() => null)
}))

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('EditBank', () => {
  beforeEach(() => {
    history.push(BanksRoute.edit, { bankId: 'testBankId' })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it('renders nothing if loading', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({
        map: { testBankId: bank },
        queryStatus: QueryStatus.Loading
      })
    )

    render(<EditBank />)
  })

  it('renders BankForm without error', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({ map: { testBankId: bank } })
    )
    render(<EditBank />)

    expect(BankForm).toHaveBeenCalledTimes(1)
  })
})
