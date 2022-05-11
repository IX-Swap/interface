import React from 'react'
import { render } from 'test-utils'
import { transferDirections } from 'config/defaults'
import { renderSelectItems } from 'helpers/rendering'
import { VTDirectionSelect } from 'app/pages/admin/components/VTDirectionSelect'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

jest.mock('@mui/material', () => ({
  useMediaQuery: jest.fn()
}))

jest.mock('helpers/rendering', () => ({
  renderSelectItems: jest.fn()
}))

jest.mock('ui/Select/Select', () => ({
  Select: jest.fn(({ children }) => <select>{children}</select>)
}))

jest.mock('ui/Select/SelectItem/SelectItem', () => ({
  SelectItem: jest.fn(({ value }) => <option value={value}>{value}</option>)
}))

describe('VTDirectionSelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders default transfer directions correctly', () => {
    render(<VTDirectionSelect />)

    expect(Select).toHaveBeenCalled()
    expect(renderSelectItems).toHaveBeenCalledWith(
      transferDirections.map(option => ({ label: option, value: option }))
    )
  })

  it('shows all in the option if includeAll props is true', () => {
    const { getByText } = render(<VTDirectionSelect includeAll />)

    expect(SelectItem).toHaveBeenCalledWith(
      { value: 'All', children: 'All' },
      {}
    )
    expect(getByText(/all/i)).toBeTruthy()
  })

  it('shows all in the option if includeAll props is true and labelBetweenAll is not undefined', () => {
    const { getByText } = render(
      <VTDirectionSelect includeAll labelBetweenAll={''} />
    )

    expect(SelectItem).toHaveBeenCalledWith({ value: 'All', children: '' }, {})
    expect(getByText(/all/i)).toBeTruthy()
  })
})
