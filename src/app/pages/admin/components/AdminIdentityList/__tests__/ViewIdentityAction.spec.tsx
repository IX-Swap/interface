import React from 'react'
import { render } from 'test-utils'
import {
  ViewIdentityAction,
  ViewIdentityActionProps
} from 'app/pages/admin/components/AdminIdentityList/ViewIdentityAction'
import * as useAuth from 'hooks/auth/useAuth'
import { AdminRoute } from 'app/pages/admin/router/config'
import { generatePath } from 'react-router-dom'

describe('ViewIdentityAction', () => {
  const props: ViewIdentityActionProps = {
    userId: '1234',
    identityId: '12345',
    identityType: 'individual'
  }

  const objResponse = {
    user: {
      _id: '12345'
    }
  }

  jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

  it('renders view link correctly', () => {
    const { rerender, container } = render(<ViewIdentityAction {...props} />)
    const viewButton = container.firstElementChild
    expect(viewButton).toHaveAttribute(
      'href',
      generatePath(AdminRoute.viewIndividualIdentity, {
        userId: '1234',
        identityId: '12345'
      })
    )

    props.identityType = 'corporate'
    rerender(<ViewIdentityAction {...props} />)

    expect(viewButton).toHaveAttribute(
      'href',
      generatePath(AdminRoute.viewCorporateIdentity, {
        userId: '1234',
        identityId: '12345'
      })
    )

    props.identityType = 'issuer'
    rerender(<ViewIdentityAction {...props} />)

    expect(viewButton).toHaveAttribute(
      'href',
      generatePath(AdminRoute.viewCorporateIdentity, {
        userId: '1234',
        identityId: '12345'
      })
    )
  })
})
