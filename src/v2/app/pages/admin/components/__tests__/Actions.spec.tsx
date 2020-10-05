/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Actions, ActionsProps } from 'v2/app/pages/admin/components/Actions'
import { user } from '__fixtures__/user'
import * as adminViewHook from '../../hooks/useAdminView'
import DialogConfirmRoleChange from 'v2/app/pages/admin/components/DialogConfirmRoleChange'
import { appRoles } from 'v2/helpers/acl'
import { waitFor, fireEvent } from '@testing-library/react'
import { useAdminView } from '../../hooks/useAdminView'

jest.mock('v2/app/pages/admin/components/DialogConfirmRoleChange', () =>
  jest.fn(() => null)
)

describe('Actions', () => {
  const props: ActionsProps = { user }
  const fakeAdminView: ReturnType<typeof useAdminView> = {
    open: true,
    handleClose: jest.fn(),
    roles: [appRoles.ACCREDITED, appRoles.AUTHORIZER],
    handleConfirm: jest.fn(),
    handleChange: jest.fn(),
    handleRoleChange: jest.fn(),
    setOpen: jest.fn(),
    setRoles: jest.fn()
  }
  const ref = React.createRef()

  beforeEach(() => {
    jest
      .spyOn(adminViewHook, 'useAdminView')
      .mockImplementation(() => fakeAdminView)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Actions {...props} ref={ref} />)
  })

  it('renders DialogConfirmRoleChange with correct props', () => {
    render(<Actions {...props} ref={ref} />)

    expect(DialogConfirmRoleChange).toHaveBeenCalledTimes(1)
    expect(DialogConfirmRoleChange).toHaveBeenCalledWith(
      {
        open: fakeAdminView.open,
        handleClose: fakeAdminView.handleClose,
        handleConfirm: fakeAdminView.handleConfirm,
        newRole: `${fakeAdminView.roles[0]},${fakeAdminView.roles[1]}`,
        user: props.user
      },
      {}
    )
  })

  it('does not invoke handleChange if roles match', async () => {
    const { getByTestId, getByRole } = render(
      <Actions
        user={{ ...props.user, roles: fakeAdminView.roles.join(',') }}
        ref={ref}
      />
    )

    fireEvent.mouseDown(getByRole('button'))
    await waitFor(() => {
      fireEvent.click(getByTestId('backdrop'))
      expect(fakeAdminView.handleChange).toHaveBeenCalledTimes(0)
    })
  })

  it('invokes handleChange with correct arguments if roles does not match', async () => {
    const { getByTestId, getByRole } = render(<Actions {...props} ref={ref} />)

    fireEvent.mouseDown(getByRole('button'))
    await waitFor(() => {
      fireEvent.click(getByTestId('backdrop'))
      expect(fakeAdminView.handleChange).toHaveBeenCalledTimes(1)
      expect(fakeAdminView.handleChange).toHaveBeenCalledWith(
        `${fakeAdminView.roles[0]},${fakeAdminView.roles[1]}`
      )
    })
  })

  it('invokes handleRoleChange correctly', async () => {
    const { getByRole, getAllByRole } = render(<Actions {...props} ref={ref} />)

    fireEvent.mouseDown(getByRole('button'))
    await waitFor(() => {
      const options = getAllByRole('option')
      fireEvent.click(options[2])
      expect(fakeAdminView.handleRoleChange).toHaveBeenCalledTimes(1)
    })
  })
})
