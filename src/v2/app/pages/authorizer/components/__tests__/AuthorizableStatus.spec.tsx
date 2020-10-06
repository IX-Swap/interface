import React from 'react'
import { render } from 'test-utils'
import { AuthorizableStatus } from 'v2/app/pages/authorizer/components/AuthorizableStatus'

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
})
