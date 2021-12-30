import { ClosedDSOsFilter } from 'app/pages/authorizer/components/ClosedDSOFilter'
import * as useQueryFilter from 'hooks/filters/useQueryFilter'
import React from 'react'
import { render, fireEvent, within } from 'test-utils'
import * as useDSOList from 'app/pages/authorizer/hooks/useDSOList'
import { dso } from '__fixtures__/authorizer'

describe('ClosedDSOFilter', () => {
  beforeEach(() => {
    const objResponse = {
      data: {
        list: [dso]
      }
    }

    jest
      .spyOn(useDSOList, 'useDSOList')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('calls handleChange correctly when select has value', () => {
    const objResponse = {
      getFilterValue: jest.fn(() => {}),
      updateFilter: jest.fn(() => {}),
      removeFilter: jest.fn(() => {})
    }

    jest
      .spyOn(useQueryFilter, 'useQueryFilter')
      .mockImplementation(() => objResponse as any)
    const { getByRole } = render(<ClosedDSOsFilter />)

    fireEvent.mouseDown(getByRole('button'))

    const listbox = within(getByRole('listbox'))

    fireEvent.click(listbox.getByText(dso.tokenName))

    expect(objResponse.updateFilter).toHaveBeenCalledWith('dso', dso._id)
  })

  it('calls handleChange correctly when select has no value', () => {
    const objResponse = {
      getFilterValue: jest.fn(() => {}),
      updateFilter: jest.fn(() => {}),
      removeFilter: jest.fn(() => {})
    }

    jest
      .spyOn(useQueryFilter, 'useQueryFilter')
      .mockImplementation(() => objResponse as any)
    const { getByRole } = render(<ClosedDSOsFilter />)

    fireEvent.mouseDown(getByRole('button'))

    const listbox = within(getByRole('listbox'))

    fireEvent.click(listbox.getByText(dso.tokenName))
    fireEvent.click(listbox.getByText('Closed DSO'))

    expect(objResponse.removeFilter).toHaveBeenCalled()
  })
})
