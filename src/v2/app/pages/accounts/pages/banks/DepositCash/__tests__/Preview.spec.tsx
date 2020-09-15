/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'

import * as reactHookForm from 'react-hook-form'
import { Preview } from 'v2/app/pages/accounts/pages/banks/DepositCash/Preview'
import { asset, cashDeposit } from '__fixtures__/authorizer'
import * as assetsContext from 'v2/context/assets/useAssetsData'

jest.mock('v2/components/form/Form', () => ({
  Form: () => <div data-testid='form'></div>
}))

describe('Preview', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    jest.spyOn(assetsContext, 'useAssetsData').mockReturnValue({
      data: { map: { [asset._id]: asset } }
    })

    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
             getValues () {
        return { asset: asset._id, amount: cashDeposit.amount }
      }
    })

    render(<Preview />)
  })
})
