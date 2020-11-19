import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestCommitmentView } from 'v2/app/pages/invest/pages/InvestCommitmentView'
import { history } from 'v2/history'
import { CommitmentRoute } from 'v2/app/pages/invest/routers/commitmentsRouter'
import * as useCommitmentByIdHook from 'v2/app/pages/invest/hooks/useCommitmentById'
import { CommitmentPreview } from 'v2/app/components/CommitmentPreview/CommitmentPreview'
import { commitment } from '__fixtures__/authorizer'

jest.mock('v2/app/components/CommitmentPreview/CommitmentPreview', () => ({
  CommitmentPreview: jest.fn(() => null)
}))

describe('InvestCommitmentView', () => {
  beforeEach(() => {
    history.push(CommitmentRoute.commitmentView, {
      commitmentId: 'testCommitmentId'
    })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it('renders without error', () => {
    render(<InvestCommitmentView />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(useCommitmentByIdHook, 'useCommitmentById')
      .mockReturnValue({ isLoading: true, data: commitment } as any)
    const { container } = render(<InvestCommitmentView />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if data is undefined', () => {
    jest
      .spyOn(useCommitmentByIdHook, 'useCommitmentById')
      .mockReturnValue({ isLoading: false, data: undefined } as any)
    const { container } = render(<InvestCommitmentView />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders CommitmentPreview with correct props', () => {
    jest
      .spyOn(useCommitmentByIdHook, 'useCommitmentById')
      .mockReturnValue({ isLoading: false, data: commitment } as any)
    render(<InvestCommitmentView />)

    expect(CommitmentPreview).toHaveBeenCalledWith(
      {
        data: commitment
      },
      {}
    )
  })
})
