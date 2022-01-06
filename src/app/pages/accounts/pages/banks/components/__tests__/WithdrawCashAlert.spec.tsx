import React from 'react'
import { render } from 'test-utils'
import { bank } from '__fixtures__/authorizer'
import { WithdrawCashAlert } from 'app/pages/accounts/pages/banks/components/WithdrawCashAlert'
import { CashTransactionAlert } from 'app/pages/accounts/pages/banks/components/CashTransactionAlert'
import { Form } from 'components/form/Form'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'

jest.mock(
  'app/pages/accounts/pages/banks/components/CashTransactionAlert',
  () => ({
    CashTransactionAlert: jest.fn(({ children }) => (
      <div data-testid='cta-wrapper'>{children('money123')}</div>
    ))
  })
)
jest.mock('app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('WithdrawCashAlert', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders CashTransactionAlert correctly', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({ map: { [bank._id]: bank } })
    )
    const { getByTestId } = render(
      <Form defaultValues={{ bankAccountId: bank._id }}>
        <WithdrawCashAlert />
      </Form>
    )

    expect(CashTransactionAlert).toHaveBeenCalledTimes(1)
    expect(getByTestId('cta-wrapper')).toHaveTextContent('money123')
  })

  it('renders nothing if status is loading', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
    )
    const { getByTestId } = render(
      <Form data-testid='form' defaultValues={{ bankAccountId: bank._id }}>
        <WithdrawCashAlert />
      </Form>
    )

    expect(getByTestId('form')).toBeEmptyDOMElement()
  })
})
