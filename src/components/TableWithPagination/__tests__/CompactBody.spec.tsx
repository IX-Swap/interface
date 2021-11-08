import React from 'react'
import { render, cleanup } from 'test-utils'
import { CompactBody } from 'components/TableWithPagination/CompactBody'

describe('CompactBody', () => {
  const props = {
    items: [],
    columns: [],
    hasActions: false,
    actions: jest.fn(),
    cacheQueryKey: undefined,
    renderRow: jest.fn()
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CompactBody {...props} />)
  })
})
