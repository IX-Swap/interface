import React from 'react'
import { RoleManagement } from 'app/pages/admin/components/RoleManagement'
import { render } from 'test-utils'
import { managedUser } from '__fixtures__/user'
import * as useRoleManagement from 'app/pages/admin/hooks/useRoleManagement'
import { fireEvent } from '@testing-library/react'

describe('RoleManagement', () => {
  const roles = managedUser.roles.split(',')
  const selectedRolesMock = roles
  const handleChangeMock = jest.fn()
  const handleUpdateMock = jest.fn()
  const responseObj = {
    selectedRoles: selectedRolesMock,
    handleChange: handleChangeMock,
    handleUpdate: handleUpdateMock
  }

  beforeEach(() => {
    jest
      .spyOn(useRoleManagement, 'useRoleManagement')
      .mockImplementation(() => responseObj as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<RoleManagement activeRoles={roles} />)
  })

  it('renders components correctly', () => {
    const { getByText } = render(<RoleManagement activeRoles={roles} />)

    expect(getByText(/user/i)).toBeTruthy()
    expect(getByText(/accredited/i)).toBeTruthy()
    expect(getByText(/authorizer/i)).toBeTruthy()
    expect(getByText(/admin/i)).toBeTruthy()
    expect(getByText(/issuer/i)).toBeTruthy()
  })

  it('invokes handleChange function when a checkbox is clicked', () => {
    const { getByTestId } = render(<RoleManagement activeRoles={roles} />)

    fireEvent(
      getByTestId('admin'),
      new MouseEvent('click', { bubbles: true, cancelable: true })
    )
    expect(handleChangeMock).toHaveBeenCalled()
  })

  it('invokes handleUpdate function correctly when a submit button is clicked', () => {
    const { getByText } = render(<RoleManagement activeRoles={['user']} />)

    fireEvent(
      getByText('UPDATE'),
      new MouseEvent('click', { bubbles: true, cancelable: true })
    )
    expect(handleUpdateMock).toHaveBeenCalled()
  })
})
