import React from 'react'
import { render } from 'test-utils'
import { ActionTableCell, ActionTableCellProps } from '../ActionTableCell'

describe('TableCellWrapper', () => {
  const mock = jest.fn()
  const props: ActionTableCellProps<any> = {
    row: {},
    cacheQueryKey: {},
    actions: mock
  }

  it.skip('renders withour errors', () => {
    render(<ActionTableCell {...props} />)
  })

  it('renders action correctly', () => {
    render(<ActionTableCell {...props} />)
    expect(mock).toHaveBeenCalledWith({
      item: props.row,
      cacheQueryKey: props.cacheQueryKey
    })
  })
})
