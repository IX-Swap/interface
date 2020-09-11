/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Setup } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/Setup'

import { bank, asset } from '__fixtures__/authorizer'
import { useFormContext } from 'react-hook-form'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { useBankSelect } from 'v2/components/form/typed/BankSelect'

jest.mock('react-hook-form')
jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')
jest.mock('v2/components/form/typed/BankSelect')

jest.mock('v2/components/form/typed/TextInput', () => {
  const TextInput = jest.fn(() => <div data-testid='text-input'></div>)
  return {
    createTypedTextInput: jest.fn(() => TextInput)
  }
})
jest.mock('v2/components/form/typed/NumberInput', () => {
  const NumberInput = jest.fn(() => <div data-testid='number-input'></div>)
  return {
    createTypedNumberInput: jest.fn(() => NumberInput)
  }
})

const BankSelect = jest.fn(() => null)

describe('Setup', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('do not render inputs if bankId is undefined', () => {
    useFormContext.mockReturnValue({
      watch (arg1) {
        if (arg1 === 'bank') return undefined
        throw Error("arg1 should be 'bank'")
      }
    })
    useBanksData.mockReturnValue({
      data: { map: { [bank._id]: { asset } } }
    })
    useBankSelect.mockReturnValue(BankSelect)

    const { queryByTestId } = render(<Setup />)

    const input1 = queryByTestId('text-input')
    const input2 = queryByTestId('number-input')

    expect(input1).toBeNull()
    expect(input2).toBeNull()
  })

  it('renders without error', () => {
    useFormContext.mockReturnValue({
      watch (arg1) {
        if (arg1 === 'bank') return bank._id
        throw Error("arg1 should be 'bank'")
      }
    })
    useBanksData.mockReturnValue({
      data: { map: { [bank._id]: { asset } } }
    })
    useBankSelect.mockReturnValue(BankSelect)

    const { getByTestId } = render(<Setup />)

    const input1 = getByTestId('text-input')
    const input2 = getByTestId('number-input')

    expect(input1).toBeTruthy()
    expect(input2).toBeTruthy()
  })
})
