/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Actions, ActionsProps } from 'v2/app/pages/admin/components/Actions'
import { user } from '__fixtures__/user'
import * as adminViewHook from '../../hooks/useAdminView'
import DialogConfirmRoleChange from 'v2/app/pages/admin/components/DialogConfirmRoleChange'
import { appRoles } from 'v2/helpers/acl'

jest.mock('v2/app/pages/admin/components/DialogConfirmRoleChange', () =>
  jest.fn(() => null)
)
describe('Actions', () => {
  const props: ActionsProps = { user }
  const fakeAdminView = {
    open: true,
    handleClose: jest.fn(),
    roles: [appRoles.ACCREDITED, appRoles.AUTHORIZER],
    handleConfirm: jest.fn(),
    handleChange: jest.fn(),
    handleRoleChange: jest.fn()
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
})
