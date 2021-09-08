import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DateTimePickerComponent } from 'components/form/_DateTimePicker'

jest.mock('components/form/_DateTimePicker', () => ({
  DateTimePickerComponent: jest.fn(() => null)
}))

describe('DateFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DateFilter name='fromDate' label='From' />)
  })

  it('renders DateTimePickerComponent with correct props', () => {
    render(<DateFilter name='fromDate' label='From' />)
    expect(DateTimePickerComponent).toHaveBeenCalledTimes(1)
    expect(DateTimePickerComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        clearable: true,
        inputVariant: 'outlined',
        label: 'From',
        size: 'small',
        style: { width: 150 }
      }),
      {}
    )
  })
})
