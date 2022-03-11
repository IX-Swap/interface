import React from 'react'
import { render } from 'test-utils'
import { InvitationDeclie } from 'auth/pages/invitation/InvitationDecline'

describe('InvitationDecline', () => {
  it('should match snapshot', () => {
    const { container } = render(<InvitationDeclie />)
    expect(container).toMatchSnapshot()
  })
})
