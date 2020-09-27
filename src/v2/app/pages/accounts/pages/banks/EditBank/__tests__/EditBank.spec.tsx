/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'

import { bank } from '__fixtures__/authorizer'

import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { EditBank } from 'v2/app/pages/accounts/pages/banks/EditBank/EditBank'

jest.mock('v2/app/pages/accounts/pages/banks/router')
jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>
const useBanksRouterMock = useBanksRouter as jest.Mock<
  Partial<ReturnType<typeof useBanksRouter>>
>

jest.mock('v2/app/pages/accounts/pages/banks/components/BankForm', () => ({
  BankForm: () => <div data-testid='bank-form'></div>
}))
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({ bankId: 'testBankId' })
}))

describe('EditBank', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders nothing if loading', () => {
    useBanksRouterMock.mockReturnValue({ push: () => null })
    useBanksDataMock.mockReturnValue({
      data: { map: { testBankId: bank } },
      status: 'loading'
    })

    render(<EditBank />)
  })

  it('renders BankForm without error', () => {
    useBanksRouterMock.mockReturnValue({ push: () => null })
    useBanksDataMock.mockReturnValue({
      data: { map: { testBankId: bank } },
      status: 'success'
    })

    const { queryByTestId } = render(<EditBank />)

    expect(queryByTestId('bank-form')).not.toBeNull()
  })
})
