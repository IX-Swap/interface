import React from 'react'
import { render } from 'test-utils'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'

describe('AuthorizableStatus', () => {
  it('renders A if status Approved', () => {
    const { getByText } = render(<AuthorizableStatus status='Approved' />)

    expect(getByText('A')).toBeTruthy()
  })

  it('renders R if status Rejected', () => {
    const { getByText } = render(<AuthorizableStatus status='Rejected' />)

    expect(getByText('R')).toBeTruthy()
  })

  it('renders S if status is Submitted', () => {
    const { getByText } = render(<AuthorizableStatus status='Submitted' />)

    expect(getByText('S')).toBeTruthy()
  })

  it('renders C if status is Closed', () => {
    const { getByText } = render(<AuthorizableStatus status='Closed' />)

    expect(getByText('C')).toBeTruthy()
  })

  it('renders Approved if status Approved & compact is false', () => {
    const { getByText } = render(
      <AuthorizableStatus status='Approved' compact={false} />
    )

    expect(getByText('Approved')).toBeTruthy()
  })

  it('renders Rejected if status Rejected & compact is false', () => {
    const { getByText } = render(
      <AuthorizableStatus status='Rejected' compact={false} />
    )

    expect(getByText('Rejected')).toBeTruthy()
  })

  it('renders Submitted if status is Submitted & compact is false', () => {
    const { getByText } = render(
      <AuthorizableStatus status='Submitted' compact={false} />
    )

    expect(getByText('Submitted')).toBeTruthy()
  })

  it('renders Closed if status is Closed & compact is false', () => {
    const { getByText } = render(
      <AuthorizableStatus status='Closed' compact={false} />
    )

    expect(getByText('Closed')).toBeTruthy()
  })
})
