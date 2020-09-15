/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/ContinueButton'

import { Button } from '@material-ui/core'
import { bank, cashDeposit } from '__fixtures__/authorizer'
import * as reactHookForm from 'react-hook-form'
import * as banksContext from 'v2/app/pages/accounts/pages/banks/context'

jest.mock('v2/app/pages/accounts/pages/banks/context')

jest.mock('@material-ui/core', () => ({
  Button: jest.fn(() => <div data-testid='button'></div>)
}))

jest.spyOn(banksContext, 'useDepositStore').mockReturnValue({
  setCurrentStep () {
    return null
  }
})

describe('ContinueButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders Button without error', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
             watch (arg1) {
        if (arg1 === 'bank') return bank
        if (arg1 === 'amount') return cashDeposit.amount
        throw Error('arg1 is invalid')
      }
    })

    const { queryByTestId } = render(<ContinueButton />)
    expect(queryByTestId('button')).not.toBeNull()
  })

  it('will disable Button if bank is undefined', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
             watch (arg1) {
        if (arg1 === 'bank') return undefined
        if (arg1 === 'amount') return cashDeposit.amount
        throw Error('arg1 is invalid')
      }
    })

    render(<ContinueButton />)
    expect(Button).toHaveBeenCalledTimes(1)
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({ disabled: true }),
      {}
    )
  })

  it('will disable Button if amount is undefined', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
             watch (arg1) {
        if (arg1 === 'bank') return bank
        if (arg1 === 'amount') return undefined
        throw Error('arg1 is invalid')
      }
    })

    render(<ContinueButton />)
    expect(Button).toHaveBeenCalledTimes(1)
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({ disabled: true }),
      {}
    )
  })
})
