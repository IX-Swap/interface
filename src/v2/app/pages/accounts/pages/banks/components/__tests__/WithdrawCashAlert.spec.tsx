/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { bank, asset } from '__fixtures__/authorizer'
import { WithdrawCashAlert } from 'v2/app/pages/accounts/pages/banks/components/WithdrawCashAlert'

import { CashTransactionAlert } from 'v2/app/pages/accounts/pages/banks/components/CashTransactionAlert'
import * as reactHookForm from 'react-hook-form'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'

jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')
jest.mock('react-hook-form')
jest.mock(
  'v2/app/pages/accounts/pages/banks/components/CashTransactionAlert',
  () => ({
    CashTransactionAlert: jest.fn(({ children }) => (
      <div data-testid='cta-wrapper'>{children('money123')}</div>
    ))
  })
)

describe('WithdrawCashAlert', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders CashTransactionAlert if status is error', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      getValues () {
        return { bank: bank._id }
      }
    })
    useBanksData.mockReturnValue({
      data: { map: { [bank._id]: { asset } } },
      status: 'error'
    })
    const { getByTestId } = render(<WithdrawCashAlert />)

    expect(CashTransactionAlert).toHaveBeenCalledTimes(1)
    expect(getByTestId('cta-wrapper')).toHaveTextContent('money123')
  })

  it('renders nothing if status is loading', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      getValues () {
        return { bank: bank._id }
      }
    })
    useBanksData.mockReturnValue({ data: [], status: 'loading' })

    const { container } = render(<WithdrawCashAlert />)
    expect(container).toBeEmptyDOMElement()
  })
})
