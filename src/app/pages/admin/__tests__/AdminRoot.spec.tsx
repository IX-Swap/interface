import React from 'react'
import { render, cleanup } from 'test-utils'
import { useAdminRouter } from 'app/pages/admin/router'
import { AdminRoot } from 'app/pages/admin/AdminRoot'

jest.mock('app/pages/admin/router')

const useAdminRouterMock = useAdminRouter as jest.Mock<
  Partial<ReturnType<typeof useAdminRouter>>
>

describe('AdminRoot', () => {
  const renderRoutes = jest.fn(() => <div />)
  beforeEach(() => {
    useAdminRouterMock.mockReturnValueOnce({ renderRoutes })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AdminRoot />)
  })

  it('renders routes correctly', () => {
    render(<AdminRoot />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
