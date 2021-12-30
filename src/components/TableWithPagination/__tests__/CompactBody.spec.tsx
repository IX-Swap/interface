import React from 'react'
import { render } from 'test-utils'
import { CompactBody } from 'components/TableWithPagination/CompactBody'
import { dso } from '__fixtures__/authorizer'
import { CompactRow } from 'components/TableWithPagination/CompactRow'
jest.mock('components/TableWithPagination/CompactRow', () => ({
  CompactRow: jest.fn(() => null)
}))

describe('CompactBody', () => {
  const renderFn = jest.fn()
  const actionsFn = jest.fn()
  const mockColumns = [
    { key: '_id', label: 'ID' },
    { key: '_id', label: 'ID Render' }
  ]

  const props = {
    items: [dso, { ...dso, _id: 2 }, { ...dso, _id: 3 }],
    columns: mockColumns,
    hasActions: true,
    actions: actionsFn,
    cacheQueryKey: undefined,
    renderRow: renderFn
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CompactBody {...props} />)
  })

  it('renders correct number of rows', () => {
    const { container } = render(<CompactBody {...props} />)
    const rows = container.querySelectorAll('tr')
    expect(rows[0]).toBeTruthy()
    expect(rows[1]).toBeTruthy()
    expect(rows[2]).toBeTruthy()
  })

  it('renders render function correctly', () => {
    render(<CompactBody {...props} />)
    expect(renderFn).toHaveBeenNthCalledWith(1, {
      data: props.items[0],
      columns: mockColumns,
      actions: actionsFn,
      hasActions: true
    })
    expect(renderFn).toHaveBeenNthCalledWith(2, {
      data: props.items[1],
      columns: mockColumns,
      actions: actionsFn,
      hasActions: true
    })
    expect(renderFn).toHaveBeenNthCalledWith(3, {
      data: props.items[2],
      columns: mockColumns,
      actions: actionsFn,
      hasActions: true
    })
  })

  it('renders CompactRow correctly', () => {
    render(<CompactBody {...props} renderRow={undefined} />)
    expect(CompactRow).toHaveBeenNthCalledWith(
      1,
      {
        data: props.items[0],
        columns: mockColumns,
        actions: actionsFn,
        hasActions: true
      },
      {}
    )
    expect(CompactRow).toHaveBeenNthCalledWith(
      2,
      {
        data: props.items[1],
        columns: mockColumns,
        actions: actionsFn,
        hasActions: true
      },
      {}
    )
    expect(CompactRow).toHaveBeenNthCalledWith(
      3,
      {
        data: props.items[2],
        columns: mockColumns,
        actions: actionsFn,
        hasActions: true
      },
      {}
    )
  })
})
