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

jest.mock('v2/app/components/DSO/components/DSOListTableBody', () => ({
  DSOListTableBody: jest.fn(() => null)
}))
jest.mock('v2/components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(({ children }) => children({ items: [] }))
}))

describe('DSOList', () => {
  const props: DSOfferingsListProps = { filter: {}, user: user, viewURL: '/' }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOList {...props} />)
  })

  it('renders TableView with correct props', () => {
    render(<DSOList {...props} />)

    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      {
        filter: { search: '' },
        children: expect.anything(),
        columns: [],
        bordered: false,
        name: DSO_LIST_QUERY_KEY,
        uri: `/issuance/dso/list/${user?._id}`
      },
      {}
    )
  })

  it('renders TableView with correct props if user is null', () => {
    render(<DSOList {...props} user={null} />)

    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      {
        filter: { search: '' },
        children: expect.anything(),
        columns: [],
        bordered: false,
        name: DSO_LIST_QUERY_KEY,
        uri: `/issuance/dso/list/`
      },
      {}
    )
  })

  it('renders DSOListTableBody with correct props', () => {
    render(<DSOList {...props} user={null} />)

    expect(DSOListTableBody).toHaveBeenCalledTimes(1)
    expect(DSOListTableBody).toHaveBeenCalledWith(
      { viewURL: props.viewURL, items: [] },
      {}
    )
  })
})
