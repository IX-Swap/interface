/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { useAdminRouter } from 'v2/app/pages/admin/router'
import { AdminRoot } from 'v2/app/pages/admin/AdminRoot'

jest.mock('v2/app/pages/admin/router')

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
