/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Setup } from 'v2/app/pages/accounts/pages/banks/DepositCash/Setup'

import * as reactHookForm from 'react-hook-form'
import { asset } from '__fixtures__/authorizer'
import * as assetSelect from 'v2/components/form/typed/AssetSelect'

jest.mock('v2/components/form/typed/NumberInput', () => ({
  createTypedNumberInput: () =>
    jest.fn(() => <div data-testid='number-input'></div>)
}))

describe('Setup', () => {
  const AssetSelect = jest.fn(() => null)
  beforeEach(() => {
    jest
      .spyOn(assetSelect, 'useAssetSelect')
      .mockImplementation(() => AssetSelect)

    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      watch (arg1) {
        if (arg1 === 'asset') return asset
        throw new Error('arg1 is invalid')
      }
    })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders NumberInput without error', () => {
    const { queryByTestId } = render(<Setup />)
    expect(queryByTestId('number-input')).not.toBeNull()
  })

  it('enables NumberInput if asset is not defined', () => {
    const { queryByTestId } = render(<Setup />)
    // TODO: needs be improved as the test passes even asset is undefined
    expect(queryByTestId('number-input')?.parentElement).not.toBeDisabled()
  })
})
