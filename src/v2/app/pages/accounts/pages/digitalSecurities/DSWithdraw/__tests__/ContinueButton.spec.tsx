/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as reactHookForm from 'react-hook-form'
import { ContinueButton } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/ContinueButton'
import { dsWithdrawal } from '__fixtures__/authorizer'

describe('ContinueButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders Button without error', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      watch (arg1) {
        if (arg1 === 'recipientWallet') return dsWithdrawal.recipientWallet
        if (arg1 === 'amount') return dsWithdrawal.amount
        throw Error('arg1 is invalid')
      }
    })

    const { queryByRole } = render(<ContinueButton />)
    expect(queryByRole('button')).not.toBeNull()
  })

  it('will disable Button if recipientWallet is undefined', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      watch (arg1) {
        if (arg1 === 'recipientWallet') return undefined
        if (arg1 === 'amount') return dsWithdrawal.amount
        throw Error('arg1 is invalid')
      }
    })

    const { getByText } = render(<ContinueButton />)
    const continueButton = getByText(/continue/i)
    expect(continueButton.parentElement).toBeDisabled()
  })

  it('will disable Button if amount is undefined', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      watch (arg1) {
        if (arg1 === 'recipientWallet') return dsWithdrawal.recipientWallet
        if (arg1 === 'amount') return undefined
        throw Error('arg1 is invalid')
      }
    })

    const { getByText } = render(<ContinueButton />)
    const continueButton = getByText(/continue/i)
    expect(continueButton.parentElement).toBeDisabled()
  })
})
