import React from 'react'
import { render } from 'test-utils'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { capitalStructures } from 'config/defaults'
import { renderSelectItems } from 'helpers/rendering'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

jest.mock('@mui/material', () => ({
  useMediaQuery: jest.fn()
}))

jest.mock('helpers/rendering', () => ({
  renderSelectItems: jest.fn()
}))

jest.mock('ui/Select/Select', () => ({
  Select: jest.fn(({ children }) => <div>{children}</div>)
}))

jest.mock('ui/Select/InputLabel/InputLabel', () => ({
  InputLabel: jest.fn(({ children }) => <span>{children}</span>)
}))

jest.mock('ui/Select/SelectItem/SelectItem', () => ({
  SelectItem: jest.fn(({ value }) => <option value={value}>{value}</option>)
}))

describe('CapitalStructureSelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders default capital structures correctly', () => {
    render(<CapitalStructureSelect />)

    expect(Select).toHaveBeenCalled()
    expect(InputLabel).toHaveBeenCalled()
    expect(renderSelectItems).toHaveBeenCalledWith(
      capitalStructures.map(option => ({ label: option, value: option }))
    )
  })

  it('shows all in the option if includeAll props is true', () => {
    const { getByText } = render(<CapitalStructureSelect includeAll />)

    expect(SelectItem).toHaveBeenCalledWith(
      { value: 'All', children: 'All' },
      {}
    )
    expect(getByText(/all/i)).toBeTruthy()
  })
})
