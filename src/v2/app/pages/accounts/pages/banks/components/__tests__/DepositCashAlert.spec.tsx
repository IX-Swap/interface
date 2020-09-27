/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DepositCashAlert } from 'v2/app/pages/accounts/pages/banks/components/DepositCashAlert'

import { CashTransactionAlert } from 'v2/app/pages/accounts/pages/banks/components/CashTransactionAlert'
import * as reactHookForm from 'react-hook-form'
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

  it('renders CashTransactionAlert without error', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      getValues () {
        return { asset: asset._id }
      }
    })

    const { queryByTestId } = render(<DepositCashAlert />)

    expect(CashTransactionAlert).toHaveBeenCalledTimes(1)
    expect(queryByTestId('cta-wrapper')).not.toBeNull()
  })

  it('renders CashTransactionAlert with correct children', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      getValues () {
        return { asset: asset._id }
      }
    })

    const { queryByTestId } = render(<DepositCashAlert />)
    expect(queryByTestId('cta-wrapper')).toHaveTextContent('money123')
  })
})
