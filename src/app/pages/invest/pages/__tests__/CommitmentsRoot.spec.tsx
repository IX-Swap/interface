import React from 'react'
import { render, cleanup } from 'test-utils'
import { CommitmentsRoot } from 'app/pages/invest/pages/CommitmentsRoot'
import { useCommitmentRouter } from 'app/pages/invest/routers/commitmentsRouter'

jest.mock('app/pages/invest/routers/commitmentsRouter')

const useCommitmentRouterMock = useCommitmentRouter as jest.Mock<
  Partial<ReturnType<typeof useCommitmentRouter>>
>

describe('CommitmentsRoot', () => {
  const renderRoutes = jest.fn(() => <div />)
  beforeEach(() => {
    useCommitmentRouterMock.mockReturnValueOnce({ renderRoutes })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CommitmentsRoot />)
  })

  it('renders routes from hook', () => {
    render(<CommitmentsRoot />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
