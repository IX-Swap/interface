/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSTable } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/DSTable'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import storageHelper from 'v2/helpers/storageHelper'

jest.mock('v2/components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('DSTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSTable />)
  })

  it('renders TableView with props correctly', () => {
    const userId = 'testUserId'
    jest.spyOn(storageHelper, 'getUserId').mockReturnValue(userId)
    const uri = `/accounts/balance/${userId}`
    const name = `ds-${userId}`

    render(<DSTable />)
    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({ uri, name }),
      {}
    )
  })
})
