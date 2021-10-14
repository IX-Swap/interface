import React from 'react'
import { render, cleanup } from 'test-utils'
import { Actions } from 'app/pages/admin/components/CustodyManagementTable/Actions'
import { fakeCustodyAccountsListItem } from '__fixtures__/custodyAccount'

describe('Actions', () => {
  const launchButtonHandleClick = jest.fn()
  const linkOffButtonHandleClick = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Actions
        item={fakeCustodyAccountsListItem}
        onLaunchButtonClick={launchButtonHandleClick}
        onLinkOffButtonClick={linkOffButtonHandleClick}
      />
    )
  })
})
