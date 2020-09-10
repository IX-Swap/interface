/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DepositCashAlert } from 'v2/app/pages/accounts/pages/banks/components/DepositCashAlert'

import { CashTransactionAlert } from 'v2/app/pages/accounts/pages/banks/components/CashTransactionAlert'
import { useFormContext } from 'react-hook-form'
import { asset } from '__fixtures__/authorizer'

jest.mock('react-hook-form')
jest.mock(
  'v2/app/pages/accounts/pages/banks/components/CashTransactionAlert',
  () => ({
    CashTransactionAlert: jest.fn(({ children }) => (
      <div data-testid='cta-wrapper'>{children('money123')}</div>
    ))
  })
)

describe('DepositCashAlert', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    useFormContext.mockReturnValue({
      getValues () {
        return { asset: asset._id }
      }
    })

    const { getByTestId } = render(<DepositCashAlert />)

    expect(CashTransactionAlert).toHaveBeenCalledTimes(1)
    expect(getByTestId('cta-wrapper')).toHaveTextContent('money123')
  })
})
