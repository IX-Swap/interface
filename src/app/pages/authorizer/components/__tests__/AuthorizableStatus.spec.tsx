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

  it('renders Not Funded if status is Not funded & compact is false', () => {
    const { getByText } = render(
      <AuthorizableStatus status='Not funded' compact={false} />
    )

    expect(getByText('Not funded')).toBeTruthy()
  })

  it('renders F if status Not funded', () => {
    const { getByText } = render(<AuthorizableStatus status='Not funded' />)

    expect(getByText('F')).toBeTruthy()
  })

  it('renders Funds on hold if status is Funds on hold & compact is false', () => {
    const { getByText } = render(
      <AuthorizableStatus status='Funds on hold' compact={false} />
    )

    expect(getByText('Funds on hold')).toBeTruthy()
  })

  it('renders H if status Funds on hold', () => {
    const { getByText } = render(<AuthorizableStatus status='Funds on hold' />)

    expect(getByText('H')).toBeTruthy()
  })

  it('renders Settlement in Progress if status isSettlement in Progress & compact is false', () => {
    const { getByText } = render(
      <AuthorizableStatus status='Settlement in Progress' compact={false} />
    )

    expect(getByText('Settlement in Progress')).toBeTruthy()
  })

  it('renders S if status Settlement in Progress', () => {
    const { getByText } = render(
      <AuthorizableStatus status='Settlement in Progress' />
    )

    expect(getByText('P')).toBeTruthy()
  })

  it('renders Funds transferred if status is Funds transferred & compact is false', () => {
    const { getByText } = render(
      <AuthorizableStatus status='Funds transferred' compact={false} />
    )

    expect(getByText('Funds transferred')).toBeTruthy()
  })

  it('renders T if status Funds transferred', () => {
    const { getByText } = render(
      <AuthorizableStatus status='Funds transferred' />
    )

    expect(getByText('T')).toBeTruthy()
  })

  it('renders Failed if status is Failed & compact is false', () => {
    const { getByText } = render(
      <AuthorizableStatus status='Failed' compact={false} />
    )

    expect(getByText('Failed')).toBeTruthy()
  })

  it('renders F if status Funds transferred', () => {
    const { getByText } = render(<AuthorizableStatus status='Failed' />)

    expect(getByText('F')).toBeTruthy()
  })
})
