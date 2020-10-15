/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Actions, ActionsProps } from 'v2/app/pages/invest/components/Actions'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { commitment } from '__fixtures__/authorizer'
import {
  useCommitmentRouter,
  CommitmentRoute
} from 'v2/app/pages/invest/routers/commitmentsRouter'

jest.mock('v2/app/pages/invest/routers/commitmentsRouter')

const useCommitmentRouterMock = useCommitmentRouter as jest.Mock<
  Partial<ReturnType<typeof useCommitmentRouter>>
>

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(({ children }) => children)
}))

describe('Actions', () => {
  const props: ActionsProps = { item: commitment }
  const paths = CommitmentRoute
  beforeEach(() => {
    useCommitmentRouterMock.mockReturnValueOnce({ paths })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Actions {...props} />)
  })

  it('renders AppRouterLink with correct props', () => {
    render(<Actions {...props} />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        to: paths.commitmentView,
        params: { commitmentId: commitment._id }
      },
      {}
    )
  })
})
