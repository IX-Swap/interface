/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Setup } from 'v2/app/pages/accounts/pages/banks/DepositCash/Setup'

import { useFormContext } from 'react-hook-form'
import { asset } from '__fixtures__/authorizer'

jest.mock('react-hook-form')

jest.mock('v2/components/form/typed/NumberInput', () => ({
  createTypedNumberInput: () => () => <div data-testid='number-input'></div>
}))

describe('Setup', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    useFormContext.mockReturnValue({
      watch (arg1) {
        if (arg1 === 'asset') return asset
        throw new Error('arg1 is invalid')
      }
    })

    const { queryByTestId } = render(<Setup />)
    expect(queryByTestId('number-input')).not.toBeNull()
  })
})
