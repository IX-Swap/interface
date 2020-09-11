/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/ContinueButton'

import { bank, cashDeposit } from '__fixtures__/authorizer'
import { useFormContext } from 'react-hook-form'
import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'

jest.mock('react-hook-form')
jest.mock('v2/app/pages/accounts/pages/banks/context')

describe('ContinueButton', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    useFormContext.mockReturnValue({
      watch (arg1) {
        if (arg1 === 'bank') return bank
        if (arg1 === 'amount') return cashDeposit.amount
        return ''
      }
    })

    useDepositStore.mockReturnValue({
      setCurrentStep () {
        return null
      }
    })

    render(<ContinueButton />)
  })
})
