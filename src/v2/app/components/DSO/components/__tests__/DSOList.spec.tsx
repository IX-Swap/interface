/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOList,
  DSOfferingsListProps,
  DSO_LIST_QUERY_KEY
} from 'v2/app/components/DSO/components/DSOList'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { user } from '__fixtures__/user'
import { DSOListTableBody } from 'v2/app/components/DSO/components/DSOListTableBody'
import * as useAuthHook from 'v2/hooks/auth/useAuth'

jest.mock('v2/app/components/DSO/components/DSOListTableBody', () => ({
  DSOListTableBody: jest.fn(() => null)
}))

jest.mock('v2/components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(({ children }) => children({ items: [] }))
}))

describe('DSOList', () => {
  const props: DSOfferingsListProps = { viewURL: '/', all: true }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOList {...props} />)
  })

  it('renders TableView with correct props', () => {
    render(<DSOList {...props} />)

    expect(TableView).toHaveBeenCalledWith(
      {
        filter: {},
        children: expect.anything(),
        columns: [],
        bordered: false,
        name: DSO_LIST_QUERY_KEY,
        uri: `/issuance/dso/list/approved`
      },
      {}
    )
  })

  it('renders TableView with correct props if all is false', () => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      user
    })

    render(<DSOList {...props} all={false} />)

    expect(TableView).toHaveBeenCalledWith(
      {
        filter: {},
        children: expect.anything(),
        columns: [],
        bordered: false,
        name: DSO_LIST_QUERY_KEY,
        uri: `/issuance/dso/list/${user._id}`
      },
      {}
    )
  })

  it('renders DSOListTableBody with correct props', () => {
    render(<DSOList {...props} />)

    expect(DSOListTableBody).toHaveBeenCalledTimes(1)
    expect(DSOListTableBody).toHaveBeenCalledWith(
      { viewURL: props.viewURL, items: [] },
      {}
    )
  })
})
