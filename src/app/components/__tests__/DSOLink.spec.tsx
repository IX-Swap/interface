import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOLink, DSOLinkProps } from 'app/components/DSOLink'
import { AppRouterLink } from 'components/AppRouterLink'
import { dso } from '__fixtures__/authorizer'
import { InvestRoute } from 'app/pages/invest/router/config'

jest.mock('__tests__/AppRouterLink', () => ({
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
        to: InvestRoute.view,
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
