import React from 'react'
import { render } from 'test-utils'
import { StatusColumn } from 'v2/app/authorizer/components/StatusColumn'

describe('StatusColumn', () => {
  it('renders A if status Approved', () => {
    const { getByText } = render(<StatusColumn status='Approved' />)

    expect(getByText('A')).toBeTruthy()
  })

  it('renders R if status Rejected', () => {
    const { getByText } = render(<StatusColumn status='Rejected' />)

    expect(getByText('R')).toBeTruthy()
  })

  it('renders U if status is empty', () => {
    const { getByText } = render(<StatusColumn status='' />)

    expect(getByText('U')).toBeTruthy()
  })
})
