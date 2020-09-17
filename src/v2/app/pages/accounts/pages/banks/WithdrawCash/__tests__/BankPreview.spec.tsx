/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as reactHookForm from 'react-hook-form'
import { bank } from '__fixtures__/authorizer'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { BankDetails } from 'v2/app/components/BankDetails'
import { BankPreview } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/BankPreview'
import { Form } from 'v2/components/form/Form'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'

jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

jest.mock('v2/app/components/BankDetails', () => ({
  BankDetails: jest.fn(() => <div data-testid='bank-details' />)
}))

describe('BankPreview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders BankDetails component with correct payload if bank is defined', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({ map: { [bank._id]: bank } })
    )

    const { queryByTestId } = render(
      <Form defaultValues={{ bank: bank._id }}>
        <BankPreview />
      </Form>
    )

    expect(queryByTestId('bank-details')).not.toBeNull()
    expect(BankDetails).toHaveBeenCalledWith({ bank: bank }, {})
  })

  it('renders nothing if bank does not exist in banks data', () => {
    useBanksDataMock.mockReturnValue(generateInfiniteQueryResult({}))

    const { queryByTestId } = render(
      <Form defaultValues={{ bank: bank._id }}>
        <BankPreview />
      </Form>
    )

    expect(queryByTestId('BankPreview')).toBeFalsy()
  })
})
