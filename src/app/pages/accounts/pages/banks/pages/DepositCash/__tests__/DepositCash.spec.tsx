import React from 'react'
import { render } from 'test-utils'
import { DepositCash } from 'app/pages/accounts/pages/banks/pages/DepositCash/DepositCash'
import * as useVirtualAccount from 'app/pages/accounts/hooks/useVirtualAccount'
import { generateQueryResult } from '__fixtures__/useQuery'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'

jest.mock(
  'app/pages/accounts/pages/banks/pages/DepositCash/RecentDeposits',
  () => ({
    RecentDeposits: () => <div data-testid='recent-deposits'></div>
  })
)

describe('DepositCash', () => {
  it('renders RecentDeposits without error', () => {
    const objResponse = generateQueryResult({
      data: virtualAccountsSample,
      isLoading: false
    })

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => objResponse as any)
    const { queryByTestId } = render(<DepositCash />)

    const recentDeposits = queryByTestId('recent-deposits')

    expect(recentDeposits).not.toBeNull()
  })

  it('renders null when is Loading', () => {
    const objResponse = generateQueryResult({
      data: virtualAccountsSample,
      isLoading: true
    })

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => objResponse as any)
    const { container } = render(<DepositCash />)

    expect(container).toBeEmptyDOMElement()
  })
})
