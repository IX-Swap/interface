import {
  CompactRow,
  CompactRowProps
} from 'components/TableWithPagination/CompactRow'
import React from 'react'
import { render } from 'test-utils'
import get from 'lodash/get'

describe('CompactRow', () => {
  const renderFn = jest.fn()
  const actionFn = jest.fn()
  const props: CompactRowProps<any> = {
    data: {
      one: 'One',
      two: 2
    },
    columns: [
      {
        key: 'one',
        label: 'One'
      },
      {
        key: 'two',
        label: 'Two',
        render: renderFn
      }
    ],
    actions: actionFn,
    hasActions: true
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CompactRow {...props} />)
  })

  it('renders actions correctly', () => {
    render(<CompactRow {...props} />)

    expect(actionFn).toHaveBeenCalledWith({
      item: props.data,
      cacheQueryKey: undefined
    })
  })

  it('calls render functions correcty correctly', () => {
    render(<CompactRow {...props} />)
    expect(renderFn).toHaveBeenCalledWith(get(props.data, 'two'), props.data)
  })
})
