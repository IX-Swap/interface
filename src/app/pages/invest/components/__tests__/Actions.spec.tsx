import React from 'react'
import { render } from 'test-utils'
import { Actions, ActionsProps } from 'app/pages/invest/components/Actions'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { commitment } from '__fixtures__/authorizer'
import { CommitmentRoute } from 'app/pages/invest/router/config'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(({ children }) => children)
}))

describe('Actions', () => {
  const props: ActionsProps = { item: commitment }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Actions {...props} />)
  })

  it('renders AppRouterLink with correct props', () => {
    render(<Actions {...props} />)

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.anything(),
        to: CommitmentRoute.view,
        params: { commitmentId: commitment._id }
      }),
      {}
    )
  })
})
