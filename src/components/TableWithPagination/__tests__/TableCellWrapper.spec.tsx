import React from 'react'
import { render } from 'test-utils'
import { TableCellsProps, TableCellWrapper } from '../TableCellWrapper'

describe('TableCellWrapper', () => {
  const mock = jest.fn()
  const props: TableCellsProps<any> = {
    bordered: false,
    column: {
      key: 'level',
      label: 'Level',
      render: mock
    },
    row: {}
  }

  it.skip('renders withour errors', () => {
    render(<TableCellWrapper {...props} />)
  })

  it('calls render method correctly', () => {
    render(<TableCellWrapper {...props} />)
    expect(mock).toHaveBeenCalled()
  })
})
