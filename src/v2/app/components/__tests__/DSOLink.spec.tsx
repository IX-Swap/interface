/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOLink, DSOLinkProps } from 'v2/app/components/DSOLink'
import { InvestRoute } from 'v2/app/pages/invest/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { dso } from '__fixtures__/authorizer'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(({ children }) => children)
}))

describe('DSOLink', () => {
  const props: DSOLinkProps = { dso: dso }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOLink {...props} />)
  })

  it('renders correct text', () => {
    const { container } = render(<DSOLink {...props} />)

    expect(container).toHaveTextContent(`${dso.tokenName} (${dso.tokenSymbol})`)
  })

  it('renders AppRouterLink with correct props', () => {
    render(<DSOLink {...props} />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: InvestRoute.offeringView,
        children: expect.anything(),
        params: {
          dsoId: dso._id,
          issuerId: dso.createdBy
        },
        color: 'primary',
        underline: 'always',
        replace: true
      },
      {}
    )
  })
})
