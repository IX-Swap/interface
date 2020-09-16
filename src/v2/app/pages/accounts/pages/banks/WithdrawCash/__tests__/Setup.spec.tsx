/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Setup } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/Setup'

import { bank } from '__fixtures__/authorizer'
import * as reactHookForm from 'react-hook-form'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { useBankSelect } from 'v2/components/form/typed/BankSelect'

jest.mock('react-hook-form')
jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')
jest.mock('v2/components/form/typed/BankSelect')

const BankSelect = jest.fn(() => null)

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>
const useBankSelectMock = useBankSelect as jest.Mock<
  Partial<ReturnType<typeof useBankSelect>>
>

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

useBanksDataMock.mockReturnValue({
  data: { map: { [bank._id]: bank } }
})
useBankSelectMock.mockReturnValue(BankSelect)

describe('Setup', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('will not render inputs if bankId is undefined', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      watch (arg1) {
        if (arg1 === 'bank') return undefined
        throw Error("arg1 should be 'bank'")
      }
    })

    const { queryByTestId } = render(<Setup />)

    const textInput = queryByTestId('text-input')
    const numberInput = queryByTestId('number-input')

    expect(textInput).toBeNull()
    expect(numberInput).toBeNull()
  })

  it('render inputs without if bankId is not undefined', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      watch (arg1) {
        if (arg1 === 'bank') return bank._id
        throw Error("arg1 should be 'bank'")
      }
    })

    const { queryByTestId } = render(<Setup />)

    const textInput = queryByTestId('text-input')
    const numberInput = queryByTestId('number-input')

    expect(textInput).not.toBeNull()
    expect(numberInput).not.toBeNull()
  })
})
