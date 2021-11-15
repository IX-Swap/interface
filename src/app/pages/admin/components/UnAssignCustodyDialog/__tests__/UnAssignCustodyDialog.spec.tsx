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
        custodyAccount={fakeCustodyAccountsListItem}
        onClose={handleClose}
      />
    )
  })

  it('renders mui dialog component with correct props when open is undefined ', () => {
    render(
      <UnAssignCustodyDialog
        custodyAccount={fakeCustodyAccountsListItem}
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

  it('renders mui dialog component with correct props when open is true ', () => {
    render(
      <UnAssignCustodyDialog
        open={true}
        custodyAccount={fakeCustodyAccountsListItem}
        onClose={handleClose}
      />
    )

    expect(Dialog).toHaveBeenCalledWith(
      expect.objectContaining({
        open: true
      }),
      {}
    )
  })

  it('renders mui dialog component with correct props when open is false ', () => {
    render(
      <UnAssignCustodyDialog
        open={false}
        custodyAccount={fakeCustodyAccountsListItem}
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
