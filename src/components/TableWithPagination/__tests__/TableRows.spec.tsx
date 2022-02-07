import React from 'react'
import { render } from 'test-utils'
import {
  TableRows,
  TableRowsProps
} from 'components/TableWithPagination/TableRows'
import { TableRow } from '@mui/material'

jest.mock('@mui/material/TableRow', () => jest.fn(() => null))

describe('TableRows', () => {
  const props: TableRowsProps<any> = {
    isLoading: false,
    actions: undefined,
    bordered: false,
    children: undefined,
    columns: [],
    filter: undefined,
    hasActions: false,
    name: 'test',
    uri: 'test/uri',
    items: [],
    cacheQueryKey: 'cache',
    themeVariant: 'default',
    noDataComponent: <>No Data</>
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', async () => {
    render(<TableRows {...props} />)
  })

  it('renders TableRow when items length is 0', async () => {
    render(<TableRows {...props} />)

    expect(TableRow).toHaveBeenCalledTimes(1)
  })

  it('renders TableRow when items length is 2', async () => {
    const extraProps = { ...props, items: ['1', '2'] }
    render(<TableRows {...extraProps} />)

    expect(TableRow).toHaveBeenCalledTimes(2)
    expect(TableRow).toHaveBeenCalledWith(
      expect.objectContaining({
        style: {
          backgroundColor: 'initial',
          border: 'initial',
          borderBottom: 'initial'
        }
      }),
      {}
    )
  })

  it('renders TableRow with correct props when themeVariant is primary is true', async () => {
    const extraProps: TableRowsProps<any> = {
      ...props,
      items: ['1', '2', '3'],
      themeVariant: 'primary'
    }
    render(<TableRows {...extraProps} />)

    expect(TableRow).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        style: {
          backgroundColor: '#ffffff',
          border: 'none',
          borderBottom: 'initial'
        }
      }),
      {}
    )

    expect(TableRow).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        style: {
          backgroundColor: '#F8F8FD',
          border: 'none',
          borderBottom: 'initial'
        }
      }),
      {}
    )

    expect(TableRow).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        style: {
          backgroundColor: '#ffffff',
          border: 'none',
          borderBottom: 'initial'
        }
      }),
      {}
    )
  })
})
