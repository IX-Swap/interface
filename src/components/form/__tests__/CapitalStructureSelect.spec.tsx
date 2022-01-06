import React from 'react'
import { render } from 'test-utils'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { capitalStructures } from 'config/defaults'
import { MenuItem, Select } from '@material-ui/core'
import { renderMenuItems } from 'helpers/rendering'

jest.mock('@material-ui/core', () => ({
  Select: jest.fn(({ children }) => <select>{children}</select>),
  MenuItem: jest.fn(({ value }) => <option value={value}>{value}</option>),
  useMediaQuery: jest.fn()
}))

jest.mock('helpers/rendering', () => ({
  renderMenuItems: jest.fn()
}))

describe('CapitalStructureSelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders default capital structures correctly', () => {
    render(<CapitalStructureSelect />)

    expect(Select).toHaveBeenCalled()
    expect(renderMenuItems).toHaveBeenCalledWith(
      capitalStructures.map(option => ({ label: option, value: option }))
    )
  })

  it('shows all in the option if includeAll props is true', () => {
    const { getByText } = render(<CapitalStructureSelect includeAll />)

    expect(MenuItem).toHaveBeenCalledWith({ value: 'All', children: 'All' }, {})
    expect(getByText(/all/i)).toBeTruthy()
  })
})
