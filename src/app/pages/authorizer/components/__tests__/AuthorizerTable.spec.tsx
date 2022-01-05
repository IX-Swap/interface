import React from 'react'
import { render } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'
import { withExtraActions } from 'app/pages/authorizer/components/withExtraActions'
import { AuthorizerTable } from 'app/pages/authorizer/components/AuthorizerTable'
import * as useAuthorizerFilterHook from 'app/pages/authorizer/hooks/useAuthorizerFilter'
import { SelectionHelper } from 'components/SelectionHelper'

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
    jest.clearAllMocks()
  })

  it.skip('renders without error', async () => {
    render(
      <SelectionHelper itemComparator={() => true}>
        <AuthorizerTable {...props} />
      </SelectionHelper>
    )
  })

  it('renders table with correct props if isAll is true', async () => {
    jest.spyOn(useAuthorizerFilterHook, 'useAuthorizerFilter').mockReturnValue({
      filter: {
        from: undefined,
        to: undefined,
        status: '',
        search: undefined,
        fundStatus: '',
        searchTokenName: '',
        dso: '',
        deploymentStatus: undefined
      }
    })

    render(
      <SelectionHelper itemComparator={() => true}>
        <AuthorizerTable {...props} />
      </SelectionHelper>
    )

    expect(withExtraActions).toHaveBeenCalled()

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        name: props.name,
        uri: props.uri,
        columns: [...props.columns],
        actions: null,
        hasStatus: true,
        hasActions: true,
        filter: {
          status: '',
          isAssigned: undefined,
          from: undefined,
          to: undefined,
          searchTokenName: '',
          fundStatus: '',
          dso: '',
          deploymentStatus: undefined
        },
        themeVariant: 'primary'
      }),
      {}
    )
  })
})
