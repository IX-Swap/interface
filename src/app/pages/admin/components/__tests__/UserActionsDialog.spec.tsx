import React from 'react'
import { render } from 'test-utils'
import {
  UserActionsDialog,
  UserActionsDialogProps
} from 'app/pages/admin/components/UserActionsDialog'
import { fireEvent } from '@testing-library/react'

describe('UserActionsDialog', () => {
  const cancelMock = jest.fn()
  const actionMock = jest.fn()

  const dialogProps: UserActionsDialogProps = {
    action: actionMock,
    actionLabel: 'Confirm',
    title: 'Dialog Box',
    closeDialog: cancelMock,
    open: true
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<UserActionsDialog {...dialogProps} />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(<UserActionsDialog {...dialogProps} />)

    expect(getByText(/dialog box/i)).toBeInTheDocument()
    expect(getByText(/cancel/i)).toBeInTheDocument()
    expect(getByText(/confirm/i)).toBeInTheDocument()

    fireEvent(
      getByText('Cancel'),
      new MouseEvent('click', { bubbles: true, cancelable: true })
    )
    expect(cancelMock).toHaveBeenCalled()

    fireEvent(
      getByText('Confirm'),
      new MouseEvent('click', { bubbles: true, cancelable: true })
    )
    expect(actionMock).toHaveBeenCalled()
  })
})
