import * as RadioGroup from '@mui/material'
import * as useQueryFilter from 'hooks/filters/useQueryFilter'
import React from 'react'
import { render } from 'test-utils'
import { CurrencySelect } from 'app/pages/accounts/components/CurrencySelect/CurrencySelect'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'

jest.mock('@mui/material/RadioGroup', () => jest.fn(() => null))

describe('CurrencySelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Computes the correct initial value when not provided with default value', async () => {
    const getFilterValueFn = jest.fn(
      (param: string) => virtualAccountsSample[0].accountNumber
    )
    const updateFilterValueFn = jest.fn()
    jest.spyOn(useQueryFilter, 'useQueryFilter').mockImplementation(
      () =>
        ({
          getFilterValue: getFilterValueFn,
          updateFilter: updateFilterValueFn
        } as any)
    )
    render(<CurrencySelect accounts={virtualAccountsSample} />)
    expect(RadioGroup).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        defaultValue: virtualAccountsSample[0].accountNumber
      }),
      {}
    )
  })
})
