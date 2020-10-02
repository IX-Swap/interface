/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import {
  NoIdentity,
  NoIdentityProps
} from 'v2/app/pages/identity/components/NoIdentity'
import { IdentityRoute } from '../../router'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(({ children }) => children)
}))

describe('NoIdentity', () => {
  const props: NoIdentityProps = {
    link: Object.keys(IdentityRoute)[0] as keyof typeof IdentityRoute,
    text: 'Test text'
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<NoIdentity {...props} />)
  })

  it('renders button correctly', () => {
    const { getByRole } = render(<NoIdentity {...props} />)

    expect(getByRole('button')).toHaveTextContent(props.text)
  })

  it('renders AppRouterLink correctly', () => {
    render(<NoIdentity {...props} />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: IdentityRoute[props.link],
        children: props.text
      },
      {}
    )
  })
})
