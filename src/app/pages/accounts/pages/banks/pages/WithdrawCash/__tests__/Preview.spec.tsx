import React from 'react'
import { render } from 'test-utils'
import { Preview } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/Preview'
import { bank, cashDeposit } from '__fixtures__/authorizer'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { GenericPreview } from 'app/components/GenericPreview/GenericPreview'
import { INVESTAX_BANK } from 'config'
import { formatMoney } from 'helpers/numbers'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { Form } from 'components/form/Form'

jest.mock('app/components/GenericPreview/GenericPreview', () => ({
  GenericPreview: jest.fn(() => null)
}))
jest.mock('app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('Preview', () => {
  const formValues = {
    bankAccountId: bank._id,
    amount: cashDeposit.amount,
    memo: 'hello'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders nothing if status is loading', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({
        map: { [bank._id]: bank },
        isLoading: true
      })
    )

    const { getByTestId } = render(
      <Form data-testid='form' defaultValues={formValues}>
        <Preview />
      </Form>
    )

    expect(getByTestId('form')).toBeEmptyDOMElement()
  })

  it('calls GenericPreview with correct items', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({
        map: { [bank._id]: bank },
        isLoading: false
      })
    )

    render(
      <Form defaultValues={formValues}>
        <Preview />
      </Form>
    )

    expect(GenericPreview).toHaveBeenCalledWith(
      {
        items: [
          {
            label: 'Bank',
            value: bank.bankName
          },
          {
            label: 'Account No',
            secret: true,
            value: bank.bankAccountNumber
          },
          {
            label: 'Account Number',
            value: INVESTAX_BANK.bankAccountNumber ?? ''
          },
          {
            label: 'Withdraw Amount',
            secret: true,
            value: formatMoney(
              cashDeposit.amount,
              bank.currency.numberFormat.currency
            )
          },
          {
            label: 'Memo',
            secret: true,
            value: formValues.memo
          }
        ]
      },
      {}
    )
  })
})
