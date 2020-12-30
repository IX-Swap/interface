import React from 'react'
import { render, cleanup } from 'test-utils'
import { IssuanceRoot } from 'app/pages/issuance/IssuanceRoot'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

jest.mock('app/pages/issuance/router')
jest.mock('app/components/PageHeader/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
}))

const useIssuanceRouterMock = useIssuanceRouter as jest.Mock<
  Partial<ReturnType<typeof useIssuanceRouter>>
>

describe('IssuanceRoot', () => {
  const renderRoutes = jest.fn(() => <div />)

  beforeEach(() => {
    useIssuanceRouterMock.mockReturnValueOnce({ renderRoutes })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IssuanceRoot />)
  })

  it('renders PageHeader correctly', () => {
    render(<IssuanceRoot />)

    expect(PageHeader).toHaveBeenCalledTimes(1)
  })
})
