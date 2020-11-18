import React from 'react'
import { render, cleanup } from 'test-utils'
import { IssuanceRoot } from 'v2/app/pages/issuance/IssuanceRoot'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'

jest.mock('v2/app/pages/issuance/router')
jest.mock('v2/app/components/PageHeader/PageHeader', () => ({
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
