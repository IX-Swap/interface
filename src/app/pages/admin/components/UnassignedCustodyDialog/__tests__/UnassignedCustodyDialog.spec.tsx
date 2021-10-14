import React from 'react'
import { render, cleanup } from 'test-utils'
import { UnassignedCustodyDialog } from 'app/pages/admin/components/UnassignedCustodyDialog/UnassignedCustodyDialog'
import { fakeCustodyAccountsListItem } from '__fixtures__/custodyAccount'
import { Dialog } from '@material-ui/core'

jest.mock('@material-ui/core/Dialog', () => jest.fn(() => <div></div>))

describe('UnassignedCustodyDialog', () => {
  const handleClose = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <UnassignedCustodyDialog
        custodyAccount={fakeCustodyAccountsListItem}
        onClose={handleClose}
      />
    )
  })

  it('renders mui dialog component with correct props when open is undefined ', () => {
    render(
      <UnassignedCustodyDialog
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
      <UnassignedCustodyDialog
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
      <UnassignedCustodyDialog
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
