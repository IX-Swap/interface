/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'

import { asset } from '__fixtures__/authorizer'

import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { EditBank } from 'v2/app/pages/accounts/pages/banks/EditBank/EditBank'

jest.mock('v2/app/pages/accounts/pages/banks/router')
jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')
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
    useBanksRouter.mockReturnValue({ push: () => null })
    useBanksData.mockReturnValue({
      data: { map: { testBankId: { asset } } },
      status: 'loading'
    })

    render(<EditBank />)
  })

  it('renders without error', () => {
    useBanksRouter.mockReturnValue({ push: () => null })
    useBanksData.mockReturnValue({
      data: { map: { testBankId: { asset } } },
      status: 'success'
    })

    const { queryByTestId } = render(<EditBank />)

    expect(queryByTestId('bank-form')).not.toBeNull()
  })
})
