import React from 'react'
import { render } from 'test-utils'
import { DepositCashAlert } from 'app/pages/accounts/pages/banks/components/DepositCashAlert'
import { Form } from 'components/form/Form'
import { CashTransactionAlert } from 'app/pages/accounts/pages/banks/components/CashTransactionAlert'
import { asset } from '__fixtures__/authorizer'

jest.mock(
  'app/pages/accounts/pages/banks/components/CashTransactionAlert',
  () => ({
    CashTransactionAlert: jest.fn(({ children }) => (
      <div data-testid='cta-wrapper'>{children('money123')}</div>
    ))
  })
)

describe('DepositCashAlert', () => {
  afterEach(async () => {
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
