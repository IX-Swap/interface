import React from 'react'
import { render } from 'test-utils'
import { InvestCommitmentView } from 'app/pages/invest/pages/InvestCommitmentView'
import { history } from 'config/history'
import { CommitmentRoute } from 'app/pages/invest/router/config'
import * as useCommitmentByIdHook from 'app/pages/invest/hooks/useCommitmentById'
import { CommitmentPreview } from 'app/components/CommitmentPreview/CommitmentPreview'
import { commitment } from '__fixtures__/authorizer'
import { generatePath } from 'react-router-dom'

jest.mock('app/components/CommitmentPreview/CommitmentPreview', () => ({
  CommitmentPreview: jest.fn(() => null)
}))

describe('InvestCommitmentView', () => {
  beforeEach(() => {
    history.push(
      generatePath(CommitmentRoute.view, {
        commitmentId: 'testCommitmentId'
      })
    )
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
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
        data: commitment,
        isUserView: true
      },
      {}
    )
  })
})
