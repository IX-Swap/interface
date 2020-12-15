import React from 'react'
import { render, cleanup } from 'test-utils'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import {
  NoIdentity,
  NoIdentityProps
} from 'app/pages/identity/components/NoIdentity'
import { IdentityRoute } from 'app/pages/identity/router'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(({ children }) => children)
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
    const { getByText } = render(<NoIdentity {...props} />)

    expect(getByText(props.text)).toBeTruthy()
  })

  it('renders AppRouterLink correctly', () => {
    render(<NoIdentity {...props} />)

    expect(AppRouterLinkComponent).toBeCalledWith(
      expect.objectContaining({
        to: IdentityRoute[props.link],
        children: expect.anything()
      }),
      {}
    )
  })
})
