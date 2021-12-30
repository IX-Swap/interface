import React from 'react'
import { render } from 'test-utils'
import { UserDetails } from 'app/pages/admin/components/UserDetails'
import { managedUser } from '__fixtures__/user'
import { LabelledValue } from 'components/LabelledValue'
import { UserActions } from 'app/pages/admin/components/UserActions'
import { getTimeFromNow } from 'helpers/dates'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(({ value }) => <>{value}</>)
}))

jest.mock('app/pages/admin/components/UserActions', () => ({
  UserActions: jest.fn(() => null)
}))

describe('UserDetails', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders components with correct props', () => {
    const { getByText } = render(<UserDetails data={managedUser} />)

    expect(getByText('selmer+1@investax.io')).toBeInTheDocument()
    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      { label: 'Roles', value: 'user, accredited, issuer, authorizer, admin' },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      { label: 'Name', value: 'Nube Nueno' },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      {
        label: 'Account Creation Date',
        value: getTimeFromNow(new Date(managedUser.createdAt))
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      {
        label: 'Last Updated Date',
        value: getTimeFromNow(new Date(managedUser.updatedAt))
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      { label: 'Reset Status', value: 'Inactive' },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      6,
      {
        label: 'Reset Expires on',
        value: getTimeFromNow(new Date(managedUser.resetExpiresOn ?? ''))
      },
      {}
    )
    expect(UserActions).toHaveBeenCalledWith({ data: managedUser }, {})
  })

  it('renders Reset Status and Reset Expires on with correct value prop', () => {
    const { rerender, getByText } = render(<UserDetails data={managedUser} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      { label: 'Reset Status', value: 'Inactive' },
      {}
    )

    const mockNow = new Date()
    const mockExpiresOn = new Date(
      mockNow.setFullYear(mockNow.getFullYear() + 30)
    ).toLocaleDateString()
    rerender(
      <UserDetails data={{ ...managedUser, resetExpiresOn: mockExpiresOn }} />
    )

    expect(getByText(/active/i)).toBeInTheDocument()

    rerender(
      <UserDetails data={{ ...managedUser, resetExpiresOn: undefined }} />
    )

    expect(LabelledValue).toHaveBeenNthCalledWith(
      17,
      { label: 'Reset Status', value: '-' },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      18,
      { label: 'Reset Expires on', value: '-' },
      {}
    )
  })
})
