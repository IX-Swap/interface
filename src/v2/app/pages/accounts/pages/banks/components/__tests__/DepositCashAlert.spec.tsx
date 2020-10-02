/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DepositCashAlert } from 'v2/app/pages/accounts/pages/banks/components/DepositCashAlert'
import { Form } from 'v2/components/form/Form'
import { CashTransactionAlert } from 'v2/app/pages/accounts/pages/banks/components/CashTransactionAlert'
import { asset } from '__fixtures__/authorizer'

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
    const { queryByTestId } = render(
      <Form defaultValues={{ asset: asset._id }}>
        <DepositCashAlert />
      </Form>
    )

    expect(CashTransactionAlert).toHaveBeenCalledTimes(1)
    expect(queryByTestId('cta-wrapper')).not.toBeNull()
  })

  it('renders CashTransactionAlert with correct children', () => {
    const { queryByTestId } = render(
      <Form defaultValues={{ asset: asset._id }}>
        <DepositCashAlert />
      </Form>
    )
    expect(queryByTestId('cta-wrapper')).toHaveTextContent('money123')
  })
})
