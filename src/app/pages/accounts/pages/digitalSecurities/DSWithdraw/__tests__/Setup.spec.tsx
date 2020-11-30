import React from 'react'
import { render, cleanup } from 'test-utils'
import { Setup } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/Setup'
import { balance } from '__fixtures__/balance'
import * as balancesData from 'hooks/balance/useAllBalances'
import { ContinueButton } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/ContinueButton'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { history } from 'config/history'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router'
import { Form } from 'components/form/Form'
import { TypedField } from 'components/form/TypedField'
import { moneyNumberFormat } from 'config/numberFormat'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/DSWithdraw/ContinueButton',
  () => ({ ContinueButton: jest.fn(() => null) })
)

describe('Setup', () => {
  const balanceId = 'testId'

  beforeEach(() => {
    history.push(DSRoute.withdraw, { balanceId })
    jest
      .spyOn(balancesData, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { testId: balance } })
      )
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  afterAll(() => history.push('/'))

  it('renders ContinueButton', () => {
    render(
      <Form>
        <Setup />
      </Form>
    )

    expect(ContinueButton).toHaveBeenCalled()
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <Setup />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'recipientWallet',
        label: `Recipients ${balance.symbol} Address`
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Amount',
        name: 'amount',
        numberFormat: moneyNumberFormat
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        name: 'memo',
        label: 'Memo'
      }),
      {}
    )
  })
})
