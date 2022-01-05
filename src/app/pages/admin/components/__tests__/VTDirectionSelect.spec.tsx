import React from 'react'
import { render } from 'test-utils'
import { transferDirections } from 'config/defaults'
import { MenuItem, Select } from '@material-ui/core'
import { renderMenuItems } from 'helpers/rendering'
import { VTDirectionSelect } from 'app/pages/admin/components/VTDirectionSelect'

jest.mock('@material-ui/core', () => ({
  Select: jest.fn(({ children }) => <select>{children}</select>),
  MenuItem: jest.fn(({ value }) => <option value={value}>{value}</option>),
  useMediaQuery: jest.fn()
}))

jest.mock('helpers/rendering', () => ({
  renderMenuItems: jest.fn()
}))

describe('VTDirectionSelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders default transfer directions correctly', () => {
    render(<VTDirectionSelect />)

    expect(Select).toHaveBeenCalled()
    expect(renderMenuItems).toHaveBeenCalledWith(
      transferDirections.map(option => ({ label: option, value: option }))
    )
  })

  it('shows all in the option if includeAll props is true', () => {
    const { getByText } = render(<VTDirectionSelect includeAll />)

    expect(MenuItem).toHaveBeenCalledWith({ value: 'All', children: 'All' }, {})
    expect(getByText(/all/i)).toBeTruthy()
  })

  it('shows all in the option if includeAll props is true and labelBetweenAll is not undefined', () => {
    const { getByText } = render(
      <VTDirectionSelect includeAll labelBetweenAll={''} />
    )

    expect(MenuItem).toHaveBeenCalledWith({ value: 'All', children: '' }, {})
    expect(getByText(/all/i)).toBeTruthy()
  })
})
