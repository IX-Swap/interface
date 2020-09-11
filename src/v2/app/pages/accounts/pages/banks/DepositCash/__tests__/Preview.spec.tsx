/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'

import { useFormContext } from 'react-hook-form'
import { Preview } from 'v2/app/pages/accounts/pages/banks/DepositCash/Preview'
import { asset, cashDeposit } from '__fixtures__/authorizer'
import { useAssetsData } from 'v2/context/assets/useAssetsData'

jest.mock('react-hook-form')
jest.mock('v2/context/assets/useAssetsData')
jest.mock('v2/components/form/Form', () => ({
  Form: () => <div data-testid='form'></div>
}))

describe('Preview', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    useFormContext.mockReturnValue({
      getValues (arg1) {
        return { asset: asset._id, amount: cashDeposit.amount }
      }
    })
    useAssetsData.mockReturnValue({ data: { map: { [asset._id]: asset } } })

    render(<Preview />)
  })
})
