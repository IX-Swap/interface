/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Setup } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Setup'
import { balance } from '__fixtures__/balance'
import * as balancesData from 'v2/hooks/balance/useAllBalances'
import * as withdrawForm from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawForm'
import { ContinueButton } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/ContinueButton'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'

jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/ContinueButton',
  () => ({ ContinueButton: jest.fn(() => null) })
)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ balanceId: 'testId' })
}))

describe('Setup', () => {
  const TextField = jest.fn(() => null)
  const NumericField = jest.fn(() => null)

  beforeEach(() => {
    jest
      .spyOn(balancesData, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { testId: balance } })
      )

    jest
      .spyOn(withdrawForm, 'useDSWithdrawForm')
      .mockReturnValue({ TextField, NumericField })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders ContinueButton', () => {
    render(<Setup />)

    expect(ContinueButton).toHaveBeenCalledTimes(1)
  })

  it('renders TextField with correct props', () => {
    render(<Setup />)

    expect(TextField).toHaveBeenCalledTimes(2)
    expect(TextField).toHaveBeenNthCalledWith(
      1,
      {
        name: 'recipientWallet',
        label: `Recipients ${balance.symbol} Address`
      },
      {}
    )
    expect(TextField).toHaveBeenNthCalledWith(
      2,
      {
        name: 'memo',
        label: 'Memo'
      },
      {}
    )
  })
})
