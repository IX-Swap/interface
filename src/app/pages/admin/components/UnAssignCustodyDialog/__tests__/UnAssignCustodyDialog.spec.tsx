import React from 'react'
import { render, cleanup } from 'test-utils'
import { UnAssignCustodyDialog } from 'app/pages/admin/components/UnAssignCustodyDialog/UnAssignCustodyDialog'
import { fakeCustodyAccountsListItem } from '__fixtures__/custodyAccount'
import { Dialog } from '@material-ui/core'

jest.mock('@material-ui/core/Dialog', () => jest.fn(() => null))

describe('UnAssignCustodyDialog', () => {
  const handleClose = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <UnAssignCustodyDialog
        custodyAccountId={fakeCustodyAccountsListItem.accountId}
        onClose={handleClose}
      />
    )
  })

  it('renders closed mui dialog component when open prop is undefined ', () => {
    render(
      <UnAssignCustodyDialog
        custodyAccountId={fakeCustodyAccountsListItem.accountId}
        onClose={handleClose}
      />
    )

    expect(Dialog).toHaveBeenCalledWith(
      expect.objectContaining({
        open: false
      }),
      {}
    )
  })
})
