/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Preview } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/Preview'

import { bank, cashDeposit } from '__fixtures__/authorizer'
import * as reactHookForm from 'react-hook-form'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import GenericPreview from 'v2/app/components/generic-preview'

import { INVESTAX_BANK } from 'v2/config'
import { formatMoney } from 'v2/helpers/numbers'

jest.mock('v2/app/components/generic-preview', () => {
  const GenericPreview = jest.fn(() => (
    <div data-testid='generic-preview'></div>
  ))
  return GenericPreview
})

jest.mock('react-hook-form')
jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('Preview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders nothing if status is loading', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      getValues () {
        return { bank: bank._id }
      }
    })
    useBanksDataMock.mockReturnValue({
      data: { map: { [bank._id]: bank } },
      status: 'loading'
    })

    const { container } = render(<Preview />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders without error', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      getValues () {
        return { bank: bank._id }
      }
    })
    useBanksDataMock.mockReturnValue({
      data: { map: { [bank._id]: bank } }
    })

    render(<Preview />)
  })

  it('calls GenericPreview with correct items', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      getValues () {
        return { bank: bank._id, amount: cashDeposit.amount }
      }
    })
    useBanksDataMock.mockReturnValue({
      data: { map: { [bank._id]: bank } }
    })

    render(<Preview />)
    expect(GenericPreview).toHaveBeenCalledTimes(1)
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
              bank.asset.numberFormat.currency
            )
          }
        ]
      },
      {}
    )
  })
})
