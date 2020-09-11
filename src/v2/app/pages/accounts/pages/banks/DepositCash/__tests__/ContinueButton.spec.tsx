/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { useFormContext } from 'react-hook-form'

import { asset, cashDeposit } from '__fixtures__/authorizer'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/DepositCash/ContinueButton'

jest.mock('react-hook-form')

describe('ContinueButton', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    useFormContext.mockReturnValue({
      watch (arg1) {
        if (arg1 === 'asset') return asset
        if (arg1 === 'amount') return cashDeposit.amount
        throw Error('arg1 is invalid')
      }
    })

    render(<ContinueButton />)
  })
})
