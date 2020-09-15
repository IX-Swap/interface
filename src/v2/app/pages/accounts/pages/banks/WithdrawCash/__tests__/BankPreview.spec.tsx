/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as reactHookForm from 'react-hook-form'

import { bank } from '__fixtures__/authorizer'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import BankDetails from 'v2/app/components/bank-details'
import { BankPreview } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/BankPreview'

jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

jest.mock('v2/app/components/bank-details', () => {
  const BankDetails = jest.fn(() => <div data-testid='bank-details'></div>)
  return BankDetails
})

describe('BankPreview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders if bank is defined', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
             getValues () {
        return { bank: bank._id }
      }
    })
    useBanksDataMock.mockReturnValue({ data: { map: { [bank._id]: bank } } })

    const { queryByTestId } = render(<BankPreview />)

    expect(queryByTestId('bank-details')).not.toBeNull()
    expect(BankDetails).toHaveBeenCalledWith({ bank: bank }, {})
  })

  it('renders nothing if bank does not exist in banksdata', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
             getValues () {
        return { bank: bank._id }
      }
    })
    useBanksDataMock.mockReturnValue({ data: { map: {} } })

    const { queryByTestId, container } = render(<BankPreview />)

    expect(queryByTestId('bank-details')).toBeNull()
    expect(container).toBeEmptyDOMElement()
  })
})
