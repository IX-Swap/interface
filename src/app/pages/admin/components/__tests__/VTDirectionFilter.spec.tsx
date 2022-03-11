import React from 'react'
import { render, fireEvent, waitFor } from 'test-utils'
import { VTDirectionFilter } from 'app/pages/admin/components/VTDirectionFilter'
import { InputLabel } from '@mui/material'
import { history } from 'config/history'
import { generatePath } from 'react-router-dom'
import { AdminRoute } from 'app/pages/admin/router/config'
import * as useQueryFilter from 'hooks/filters/useQueryFilter'

jest.mock('@mui/material/InputLabel', () => jest.fn(() => null))

describe('VTDirectionFilter', () => {
  beforeEach(() => {
    history.push(generatePath(AdminRoute.virtualAccountTransactions))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders input label with correct props', () => {
    render(<VTDirectionFilter />)

    expect(InputLabel).toHaveBeenCalledTimes(1)
    expect(InputLabel).toHaveBeenCalledWith(
      expect.objectContaining({
        htmlFor: 'sortBy',
        children: 'Direction'
      }),
      {}
    )
  })

  it('renders SearchFilter correctly', async () => {
    const getFilterValueFn = jest.fn(() => 'transferDirection')
    const updateFilterValueFn = jest.fn()

    jest.spyOn(useQueryFilter, 'useQueryFilter').mockImplementation(
      () =>
        ({
          getFilterValue: getFilterValueFn,
          updateFilter: updateFilterValueFn
        } as any)
    )
    const { getByTestId } = render(<VTDirectionFilter />)
    const select = getByTestId('select')
    expect(select).toBeInTheDocument()

    fireEvent.change(select, { target: { value: '' } })
    await waitFor(() => {
      expect(updateFilterValueFn).toBeCalled()
    })
  })
})
