import React from 'react'
import { cleanup, render } from 'test-utils'
import {
  TableRows,
  TableRowsProps
} from 'components/TableWithPagination/TableRows'
import { TableRow } from '@material-ui/core'

jest.mock('@material-ui/core/TableRow', () => jest.fn(() => null))

describe('TableRows', () => {
  const props: TableRowsProps<any> = {
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
    isNewThemeOn: false
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', async () => {
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
        style: { backgroundColor: 'initial', border: 'initial' }
      }),
      {}
    )
  })

  it('renders TableRow with correct props when isNewThemeOn is true', async () => {
    const extraProps = { ...props, items: ['1', '2', '3'], isNewThemeOn: true }
    render(<TableRows {...extraProps} />)

    expect(TableRow).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        style: { backgroundColor: '#ffffff', border: 'none' }
      }),
      {}
    )

    expect(TableRow).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        style: { backgroundColor: '#F8F8FD', border: 'none' }
      }),
      {}
    )

    expect(TableRow).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        style: { backgroundColor: '#ffffff', border: 'none' }
      }),
      {}
    )
  })
})
