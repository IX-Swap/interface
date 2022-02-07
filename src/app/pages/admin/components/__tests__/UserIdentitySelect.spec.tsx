import { fireEvent, within } from '@testing-library/dom'
import {
  UserIdentitySelect,
  UserIdentitySelectProps
} from 'app/pages/admin/components/UserIdentitySelect'
import React from 'react'
import { render } from 'test-utils'
import { managedUser } from '__fixtures__/user'

describe('UserIdentitySelect', () => {
  const props: UserIdentitySelectProps = {
    userIdentities: {
      individual: false,
      investors: false,
      issuers: false
    },
    userId: managedUser._id
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders "No Identity Created Yet" if hasIdentity is false', () => {
    const { getByText } = render(<UserIdentitySelect {...props} />)

    expect(getByText('No Identity Created Yet')).toBeTruthy()
  })

  it('does not render "No Identity Created Yet" if hasIdentity is true', () => {
    const truthyProps: UserIdentitySelectProps = {
      userIdentities: {
        individual: true,
        investors: true,
        issuers: false
      },
      userId: managedUser._id
    }
    const { queryByText } = render(<UserIdentitySelect {...truthyProps} />)

    expect(queryByText('No Identity Created Yet')).not.toBeTruthy()
  })

  it('renders correct path for button when selected identity is issuer', () => {
    const { getByRole, getByText } = render(<UserIdentitySelect {...props} />)

    fireEvent.mouseDown(getByText('No Identity Created Yet'))
    const options = within(getByRole('listbox'))
    fireEvent.click(options.getByText('Issuer (Raise Capital)'))

    expect(getByRole('link', { name: 'Create Identity' })).toHaveAttribute(
      'href',
      `/app/admin/users/${managedUser._id}/createIssuer`
    )
  })

  it('renders correct path for button when selected identity is investor', () => {
    const { getByRole, getByText } = render(<UserIdentitySelect {...props} />)

    fireEvent.mouseDown(getByText('No Identity Created Yet'))
    const options = within(getByRole('listbox'))
    fireEvent.click(options.getByText('Corporate Investor'))

    expect(getByRole('link', { name: 'Create Identity' })).toHaveAttribute(
      'href',
      `/app/admin/users/${managedUser._id}/createCorporate`
    )
  })

  it('renders correct path for button when selected identity is individual', () => {
    const { getByRole, getByText } = render(<UserIdentitySelect {...props} />)

    fireEvent.mouseDown(getByText('No Identity Created Yet'))
    const options = within(getByRole('listbox'))
    fireEvent.click(options.getByText('Individual Investor'))

    expect(getByRole('link', { name: 'Create Identity' })).toHaveAttribute(
      'href',
      `/app/admin/users/${managedUser._id}/createIndividual`
    )
  })

  it('disables create identity button for Issuer when one of the Investor is already created', () => {
    const propsWithInvestor: UserIdentitySelectProps = {
      userIdentities: {
        individual: true,
        investors: true,
        issuers: false
      },
      userId: managedUser._id
    }
    const { getByRole, getByText } = render(
      <UserIdentitySelect {...propsWithInvestor} />
    )

    fireEvent.mouseDown(getByText('Individual Investor'))
    const options = within(getByRole('listbox'))
    fireEvent.click(options.getByText('Issuer (Raise Capital)'))

    expect(getByText('Create Identity')).toHaveAttribute(
      'aria-disabled',
      'true'
    )
  })

  it('disables create identity button for Investor when one of the Issuer is already created', () => {
    const propsWithIssuer: UserIdentitySelectProps = {
      userIdentities: {
        individual: true,
        investors: false,
        issuers: true
      },
      userId: managedUser._id
    }
    const { getByRole, getByText } = render(
      <UserIdentitySelect {...propsWithIssuer} />
    )

    fireEvent.mouseDown(getByText('Individual Investor'))
    const options = within(getByRole('listbox'))
    fireEvent.click(options.getByText('Corporate Investor'))

    expect(getByText('Create Identity')).toHaveAttribute(
      'aria-disabled',
      'true'
    )
  })
})
