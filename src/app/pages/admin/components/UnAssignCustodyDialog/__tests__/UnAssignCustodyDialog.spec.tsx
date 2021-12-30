import React from 'react'
import { render } from 'test-utils'
import { UnAssignCustodyDialog } from 'app/pages/admin/components/UnAssignCustodyDialog/UnAssignCustodyDialog'
import { fakeCustodyAccountsListItem } from '__fixtures__/custodyAccount'

describe('UnAssignCustodyDialog', () => {
  const handleClose = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <UnAssignCustodyDialog
        custodyAccountId={fakeCustodyAccountsListItem.accountId}
        onClose={handleClose}
      />
    )
  })

  it('renders closed mui dialog component when open prop is undefined ', () => {
    const { container } = render(
      <UnAssignCustodyDialog
        custodyAccountId={fakeCustodyAccountsListItem.accountId}
        onClose={handleClose}
      />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('renders closed mui dialog component when open prop is false ', () => {
    const { container } = render(
      <UnAssignCustodyDialog
        custodyAccountId={fakeCustodyAccountsListItem.accountId}
        onClose={handleClose}
      />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('renders opened mui dialog component when open prop is true ', () => {
    const { getByTestId } = render(
      <UnAssignCustodyDialog
        open
        custodyAccountId={fakeCustodyAccountsListItem.accountId}
        onClose={handleClose}
      />
    )
    expect(getByTestId('dialog')).toBeInTheDocument()
  })
})
