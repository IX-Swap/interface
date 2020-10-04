/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, render } from 'test-utils'
import { Preview } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/Preview'
import { bank, cashDeposit } from '__fixtures__/authorizer'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { GenericPreview } from 'v2/app/components/GenericPreview/GenericPreview'
import { INVESTAX_BANK } from 'v2/config'
import { formatMoney } from 'v2/helpers/numbers'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/app/components/GenericPreview/GenericPreview', () => ({
  GenericPreview: jest.fn(() => null)
}))

jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('Preview', () => {
  const formValues = {
    bank: bank._id,
    amount: cashDeposit.amount,
    memo: 'hello'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({
        map: { [bank._id]: bank }
      })
    )

    render(
      <Form defaultValues={formValues}>
        <Preview />
      </Form>
    )
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
            value: bank.bankAccountNumber
          },
          {
            label: 'Account Number',
            value: INVESTAX_BANK.bankAccountNumber ?? ''
          },
          {
            label: 'Withdraw Amount',
            value: formatMoney(
              cashDeposit.amount,
              bank.currency.numberFormat.currency
            )
          },
          {
            label: 'Memo',
            value: formValues.memo
          }
        ]
      },
      {}
    )
  })
})
