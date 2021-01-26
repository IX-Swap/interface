import React from 'react'
import { render, cleanup } from 'test-utils'
import { useAdminRouter } from 'app/pages/admin/router'
import { AdminRoot } from 'app/pages/admin/AdminRoot'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

jest.mock('app/pages/admin/router')

jest.mock('app/components/PageHeader/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
}))

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

  it('renders PageHeader component correctly', () => {
    render(<AdminRoot />)

    expect(PageHeader).toHaveBeenCalledTimes(1)
    expect(PageHeader).toHaveBeenCalledWith(
      {
        label: 'Admin',
        alignment: 'flex-start'
      },
      {}
    )
  })
})
