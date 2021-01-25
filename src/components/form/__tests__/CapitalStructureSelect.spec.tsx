import React from 'react'
import { render, cleanup } from 'test-utils'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { generateQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import * as useDSOCapitalStructuresHook from 'hooks/useDSOCapitalStructures'
import { capitalStructures } from 'config/defaults'
import { MenuItem, Select } from '@material-ui/core'
import { renderMenuItems } from 'helpers/rendering'

jest.mock('app/pages/accounts/pages/banks/hooks/useBanksData')

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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(useDSOCapitalStructuresHook, 'useDSOCapitalStructures')
      .mockReturnValue(generateQueryResult({ data: capitalStructures }))

    render(<CapitalStructureSelect />)
  })

  it('renders default capitalStructure when data length < 1', () => {
    jest
      .spyOn(useDSOCapitalStructuresHook, 'useDSOCapitalStructures')
      .mockReturnValue(generateQueryResult({ data: [] }))

    render(<CapitalStructureSelect />)

    expect(Select).toHaveBeenCalled()
    expect(renderMenuItems).toHaveBeenCalledWith(
      capitalStructures.map(option => ({ label: option, value: option }))
    )
  })

  it('renders capital structures from data correctly', () => {
    const dataCapitalStructures = [
      'StructureOne',
      'StructureTwo',
      'StructureThree'
    ]
    jest
      .spyOn(useDSOCapitalStructuresHook, 'useDSOCapitalStructures')
      .mockReturnValue(generateQueryResult({ data: dataCapitalStructures }))

    render(<CapitalStructureSelect />)

    expect(Select).toHaveBeenCalled()
    expect(renderMenuItems).toHaveBeenCalledWith(
      dataCapitalStructures.map(option => ({ label: option, value: option }))
    )
  })

  it('renders null if loading', () => {
    jest
      .spyOn(useDSOCapitalStructuresHook, 'useDSOCapitalStructures')
      .mockReturnValue(
        generateQueryResult({ queryStatus: QueryStatus.Loading })
      )

    const { container } = render(<CapitalStructureSelect />)

    expect(container).toBeEmptyDOMElement()
    expect(Select).not.toHaveBeenCalled()
  })

  it('shows all in the option if includeAll props is true', () => {
    jest
      .spyOn(useDSOCapitalStructuresHook, 'useDSOCapitalStructures')
      .mockReturnValue(generateQueryResult({ data: capitalStructures }))

    const { getByText } = render(<CapitalStructureSelect includeAll />)

    expect(MenuItem).toHaveBeenCalledWith({ value: 'All', children: 'All' }, {})
    expect(getByText(/all/i)).toBeTruthy()
  })
})
