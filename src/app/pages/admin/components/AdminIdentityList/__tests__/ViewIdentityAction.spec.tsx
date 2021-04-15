import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  ViewIdentityAction,
  ViewIdentityActionProps
} from 'app/pages/admin/components/AdminIdentityList/ViewIdentityAction'
import * as useAuth from 'hooks/auth/useAuth'
import { AdminRoute } from 'app/pages/admin/router/config'
import { generatePath } from 'react-router'

describe('ViewIdentityAction', () => {
  const props: ViewIdentityActionProps = {
    userId: '1234',
    createdById: '12345',
    identityType: 'individual'
  }

  beforeEach(() => {
    const objResponse = {
      user: {
        _id: '12345'
      }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ViewIdentityAction {...props} />)
  })

  it('renders null when admin id does not match', () => {
    const { container } = render(
      <ViewIdentityAction
        createdById='54321'
        userId='1234'
        identityType='individual'
      />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('renders view link correctly', () => {
    const { getByRole, rerender } = render(<ViewIdentityAction {...props} />)
    const viewButton = getByRole('button')
    expect(viewButton).toHaveAttribute(
      'href',
      generatePath(AdminRoute.createIndividualIdentity, { userId: '1234' })
    )

    props.identityType = 'corporate'
    rerender(<ViewIdentityAction {...props} />)

    expect(viewButton).toHaveAttribute(
      'href',
      generatePath(AdminRoute.createCorporateIdentity, { userId: '1234' })
    )

    props.identityType = 'issuer'
    rerender(<ViewIdentityAction {...props} />)

    expect(viewButton).toHaveAttribute(
      'href',
      generatePath(AdminRoute.createIssuerIdentity, { userId: '1234' })
    )
  })
})
