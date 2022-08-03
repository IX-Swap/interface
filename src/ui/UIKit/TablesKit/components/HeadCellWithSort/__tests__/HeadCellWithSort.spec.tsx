import * as useQueryFilter from 'hooks/filters/useQueryFilter'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { render } from 'test-utils'
import { HeadCellWithSort } from '../HeadCellWithSort'
import React from 'react'
import Box from '@mui/material/Box'

jest.mock('@mui/material/Box', () => jest.fn(() => null))

describe('HeadCellWithSort', () => {
  const getFilterValueFn = jest.fn((param: string) => 'test')
  const updateFilterValueFn = jest.fn()
  const removeFilterValueFn = jest.fn()
  jest.spyOn(useQueryFilter, 'useQueryFilter').mockImplementation(
    () =>
      ({
        getFilterValue: getFilterValueFn,
        updateFilter: updateFilterValueFn,
        removeFilter: removeFilterValueFn
      } as any)
  )

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Renders only the label on mobile', async () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isTablet: true
    } as any)
    const { getByText } = render(<HeadCellWithSort field='test' label='TEST' />)
    expect(getByText('TEST')).toBeDefined()
    expect(Box).not.toHaveBeenCalled()
  })
  it('Renders the boxes on desktop', async () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isTablet: false
    } as any)
    render(<HeadCellWithSort field='test' label='TEST' />)
    expect(Box).toHaveBeenCalled()
  })
})
