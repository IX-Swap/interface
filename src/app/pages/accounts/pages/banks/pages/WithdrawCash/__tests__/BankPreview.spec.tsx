import React from 'react'
import { render } from 'test-utils'
import { bank } from '__fixtures__/authorizer'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { BankDetails } from 'app/components/BankDetails'
import { BankPreview } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/BankPreview'
import { Form } from 'components/form/Form'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'

jest.mock('app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

jest.mock('app/components/BankDetails', () => ({
  BankDetails: jest.fn(() => <div data-testid='bank-details' />)
}))

describe('BankPreview', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders BankDetails component with correct payload if bank is defined', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({ map: { [bank._id]: bank } })
    )

    const { queryByTestId } = render(
      <Form defaultValues={{ bankAccountId: bank._id }}>
        <BankPreview />
      </Form>
    )

    expect(queryByTestId('bank-details')).not.toBeNull()
    expect(BankDetails).toHaveBeenCalledWith({ bank: bank }, {})
  })

  it('renders nothing if bank does not exist in banks data', () => {
    useBanksDataMock.mockReturnValue(generateInfiniteQueryResult({}))

    const { queryByTestId } = render(
      <Form defaultValues={{ bankAccountId: bank._id }}>
        <BankPreview />
      </Form>
    )

    expect(queryByTestId('BankPreview')).toBeFalsy()
  })
})
