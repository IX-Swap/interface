import React from 'react'
import { render, cleanup } from 'test-utils'
import { user } from '__fixtures__/user'
import DialogConfirmRoleChange, {
  DialogConfirmRoleChangeProps
} from 'v2/app/pages/admin/components/DialogConfirmRoleChange'
import { AppRole } from 'v2/helpers/acl'
import { waitFor, fireEvent } from '@testing-library/react'

describe('DialogConfirmRoleChange', () => {
  const props: DialogConfirmRoleChangeProps = {
    user: user,
    newRole: AppRole.ACCREDITED,
    open: true,
    handleClose: jest.fn(),
    handleConfirm: jest.fn()
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DialogConfirmRoleChange {...props} />)
  })

  it('renders nothing if open is false', () => {
    const { queryByTestId } = render(
      <DialogConfirmRoleChange {...props} open={false} />
    )

    expect(queryByTestId('dialog-wrapper')).toBeFalsy()
  })

  it('renders title if open is true', () => {
    const { queryByTestId } = render(<DialogConfirmRoleChange {...props} />)

    expect(queryByTestId('dialog-wrapper')).toBeTruthy()
    expect(queryByTestId('dialog-wrapper')).toHaveTextContent(
      'Confirm Role Change'
    )
  })

  it('renders user email & role if open is true', () => {
    const { queryByTestId } = render(<DialogConfirmRoleChange {...props} />)

    expect(queryByTestId('dialog-wrapper')).toBeTruthy()
    expect(queryByTestId('dialog-content')).toHaveTextContent(props.user.email)
    expect(queryByTestId('dialog-content')).toHaveTextContent(props.user.roles)
    expect(queryByTestId('dialog-content')).toHaveTextContent(props.newRole)
  })

  it('invokes handleConfirm when clicked on "Ok"', async () => {
    const { getByText } = render(<DialogConfirmRoleChange {...props} />)
    const confirmButton = getByText(/ok/i)

    fireEvent.click(confirmButton)
    await waitFor(() => {
      expect(props.handleConfirm).toHaveBeenCalledTimes(1)
    })
  })
})
