import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentFormCancelButton,
  CommitmentFormCancelButtonProps
} from 'app/pages/invest/components/CommitmentFormCancelButton'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useDSORouter, DSORoute } from 'app/pages/invest/routers/dsoRouter'
import { dso } from '__fixtures__/authorizer'

jest.mock('app/pages/invest/routers/dsoRouter')

const useDSORouterMock = useDSORouter as jest.Mock<
  Partial<ReturnType<typeof useDSORouter>>
>
jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('CommitmentFormCancelButton', () => {
  const props: CommitmentFormCancelButtonProps = {}

  beforeEach(() => {
    useDSORouterMock.mockReturnValue({
      paths: DSORoute,
      params: { dsoId: dso._id }
    })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CommitmentFormCancelButton {...props} />)
  })

  it('renders AppRouterLink with correct props', () => {
    render(<CommitmentFormCancelButton {...props} />)

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.anything(),
        to: DSORoute.view,
        params: { dsoId: dso._id }
      }),
      {}
    )
  })
})
