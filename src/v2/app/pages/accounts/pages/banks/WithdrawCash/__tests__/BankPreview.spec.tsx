/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { useFormContext } from 'react-hook-form'

import { bank, asset } from '__fixtures__/authorizer'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { BankPreview } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/BankPreview'

jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')
jest.mock('react-hook-form')

jest.mock('v2/app/components/bank-details', () => () => (
  <div data-testid='bank-details'></div>
))

describe('BankPreview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders if bank is defined', () => {
    useFormContext.mockReturnValue({
      getValues () {
        return { bank: bank._id }
      }
    })
    useBanksData.mockReturnValue({ data: { map: { [bank._id]: { asset } } } })

    const { queryByTestId } = render(<BankPreview />)

    expect(queryByTestId('bank-details')).not.toBeNull()
  })

  it('renders nothing if bank does not exist in banksdata', () => {
    useFormContext.mockReturnValue({
      getValues () {
        return { bank: bank._id }
      }
    })
    useBanksData.mockReturnValue({ data: { map: {} } })

    const { queryByTestId, container } = render(<BankPreview />)

    expect(queryByTestId('bank-details')).toBeNull()
    expect(container).toBeEmptyDOMElement()
  })
})
