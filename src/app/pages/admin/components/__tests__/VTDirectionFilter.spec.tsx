import React from 'react'
import { render, cleanup } from 'test-utils'
import { VTDirectionFilter } from 'app/pages/admin/components/VTDirectionFilter'
import { VTDirectionSelect } from 'app/pages/admin/components/VTDirectionSelect'
import { InputLabel } from '@material-ui/core'

jest.mock('@material-ui/core/InputLabel', () => jest.fn(() => null))

jest.mock('app/pages/admin/components/VTDirectionSelect', () => ({
  VTDirectionSelect: jest.fn(() => null)
}))

describe('VTDirectionFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<VTDirectionFilter />)
  })

  it('renders input label with correct props', () => {
    render(<VTDirectionFilter />)

    expect(InputLabel).toHaveBeenCalledTimes(1)
    expect(InputLabel).toHaveBeenCalledWith(
      expect.objectContaining({
        htmlFor: 'sortBy',
        children: 'Sort By'
      }),
      {}
    )
  })

  it('renders direction select component with correct props', () => {
    render(<VTDirectionFilter />)

    expect(VTDirectionSelect).toHaveBeenCalledTimes(1)
    expect(VTDirectionSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        includeAll: true,
        valueBetweenAll: '',
        inputProps: { id: 'sortBy', 'data-testid': 'select' }
      }),
      {}
    )
  })
})
