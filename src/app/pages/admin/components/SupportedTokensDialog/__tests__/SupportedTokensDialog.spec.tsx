import React from 'react'
import { render, cleanup } from 'test-utils'
import { fakeCustodyAccountsListItem } from '__fixtures__/custodyAccount'
import { Dialog } from '@material-ui/core'
import { SupportedTokensDialog } from 'app/pages/admin/components/SupportedTokensDialog/SupportedTokensDialog'

jest.mock('@material-ui/core/Dialog', () => jest.fn(() => null))

describe('SupportedTokensDialog', () => {
  const handleClose = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <SupportedTokensDialog
        custodyAccount={fakeCustodyAccountsListItem}
        onClose={handleClose}
      />
    )
  })

  it('renders mui dialog component with correct props when open is undefined ', () => {
    render(
      <SupportedTokensDialog
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
      <SupportedTokensDialog
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
      <SupportedTokensDialog
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
