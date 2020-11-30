import React from 'react'
import { render, cleanup } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'
import { withExtraActions } from 'app/pages/authorizer/components/withExtraActions'
import { AuthorizerTable } from 'app/pages/authorizer/components/AuthorizerTable'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))
jest.mock('app/pages/authorizer/components/withExtraActions', () => ({
  withExtraActions: jest.fn(() => null)
}))
jest.mock('app/pages/authorizer/components/Filters', () => ({
  Filters: jest.fn(() => null)
}))

describe('AuthorizerTable', () => {
  const props = {
    title: 'Banks',
    name: 'Bank Account(s)',
    uri: '/some/uri',
    columns: [],
    renderView: jest.fn(),
    isAll: true
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', async () => {
    render(<AuthorizerTable {...props} />)
  })

  it('renders table with correct props if isAll is true', async () => {
    render(<AuthorizerTable {...props} />)

    expect(withExtraActions).toHaveBeenCalled()
    expect(TableView).toHaveBeenCalledWith(
      {
        name: props.name,
        uri: props.uri,
        columns: [...props.columns],
        actions: null,
        hasStatus: true,
        hasActions: true,
        filter: { status: '' }
      },
      {}
    )
  })
})
