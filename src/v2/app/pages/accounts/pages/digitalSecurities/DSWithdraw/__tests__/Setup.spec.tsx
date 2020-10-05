/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Setup } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Setup'
import { balance } from '__fixtures__/balance'
import * as balancesData from 'v2/hooks/balance/useAllBalances'
import * as withdrawForm from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawForm'
import { ContinueButton } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/ContinueButton'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { history } from 'v2/history'
import { DSRoute } from 'v2/app/pages/accounts/pages/digitalSecurities/router'
import {useTypedForm} from "../../../../../../../../__fixtures__/createTypedForm";

jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/ContinueButton',
  () => ({ ContinueButton: jest.fn(() => null) })
)

describe('Setup', () => {
  const balanceId = 'testId'
  const TextField = jest.fn(() => <div/>)
  const NumericField = jest.fn(() => <div/>)

  beforeEach(() => {
    history.push(DSRoute.withdraw, { balanceId })
    jest
      .spyOn(balancesData, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { testId: balance } })
      )

    jest
      .spyOn(withdrawForm, 'useDSWithdrawForm')
      .mockReturnValue({ ...useTypedForm(), TextField, NumericField } as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it('renders ContinueButton', () => {
    render(<Setup />)

    expect(ContinueButton).toHaveBeenCalledTimes(1)
  })

  it('renders NumericField with correct props', () => {
    render(<Setup />)

    expect(NumericField).toHaveBeenCalledTimes(1)
    expect(NumericField).toHaveBeenCalledWith(
      {
        label: 'Amount',
        name: 'amount',
        numberFormat: {
          decimalScale: 2,
          inputMode: 'numeric',
          thousandSeparator: true,
          allowEmptyFormatting: true,
          isNumericString: true
        }
      },
      {}
    )
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
