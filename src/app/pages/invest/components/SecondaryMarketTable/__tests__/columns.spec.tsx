import React from 'react'
import { cleanup, render } from 'test-utils'
import { PriceLabelWithSort } from '../columns'
import * as useQueryFilter from 'hooks/filters/useQueryFilter'
import { fireEvent, waitFor } from '@testing-library/dom'

describe('PriceLabelWithSort', () => {
  const updateFilterValueFn = jest.fn()
  const removeFilterValueFn = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('invokes updateFilter on sort label click if filter value is undefined', async () => {
    const getFilterValueFn = jest.fn(() => undefined)

    jest.spyOn(useQueryFilter, 'useQueryFilter').mockImplementation(
      () =>
        ({
          getFilterValue: getFilterValueFn,
          updateFilter: updateFilterValueFn,
          removeFilter: removeFilterValueFn
        } as any)
    )

    const { getByText } = render(<PriceLabelWithSort />)
    fireEvent.click(getByText('Price'))

    await waitFor(() => {
      expect(updateFilterValueFn).toBeCalled()
      expect(removeFilterValueFn).not.toBeCalled()
    })
  })

  it('invokes updateFilter on sort label click if filter value is DESC', async () => {
    const getFilterValueFn = jest.fn(() => 'DESC')

    jest.spyOn(useQueryFilter, 'useQueryFilter').mockImplementation(
      () =>
        ({
          getFilterValue: getFilterValueFn,
          updateFilter: updateFilterValueFn,
          removeFilter: removeFilterValueFn
        } as any)
    )

    const { getByText } = render(<PriceLabelWithSort />)
    fireEvent.click(getByText('Price'))

    await waitFor(() => {
      expect(updateFilterValueFn).toBeCalled()
      expect(removeFilterValueFn).not.toBeCalled()
    })
  })

  it('invokes removeFilter on sort label click if filter value is ASC', async () => {
    const getFilterValueFn = jest.fn(() => 'ASC')

    jest.spyOn(useQueryFilter, 'useQueryFilter').mockImplementation(
      () =>
        ({
          getFilterValue: getFilterValueFn,
          updateFilter: updateFilterValueFn,
          removeFilter: removeFilterValueFn
        } as any)
    )

    const { getByText } = render(<PriceLabelWithSort />)
    fireEvent.click(getByText('Price'))

    await waitFor(() => {
      expect(updateFilterValueFn).not.toBeCalled()
      expect(removeFilterValueFn).toBeCalled()
    })
  })
})
