import React from 'react'
import { render } from 'test-utils'
import { AuthorizableStatus } from 'v2/app/pages/authorizer/components/AuthorizableStatus'

describe('StatusColumn', () => {
  it('renders A if status Approved', () => {
    const { getByText } = render(<AuthorizableStatus status='Approved' />)

    expect(getByText('A')).toBeTruthy()
  })

  it('renders R if status Rejected', () => {
    const { getByText } = render(<AuthorizableStatus status='Rejected' />)

    expect(getByText('R')).toBeTruthy()
  })

  it('renders U if status is empty', () => {
    const { getByText } = render(<AuthorizableStatus status='' />)

    expect(getByText('U')).toBeTruthy()
  })
})
