import { IdentityStatsCards } from 'app/pages/admin/components/IdentityStatsCards/IdentityStatsCards'
import * as useIdentityStats from 'app/pages/admin/hooks/useIdentityStats'
import React from 'react'
import { render } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('IdentityStatsCards', () => {
  const data = {
    identity: {
      total: 178,
      totalLastWeek: 1
    },
    userWithoutIdentity: {
      total: 65,
      totalLastWeek: 1
    },
    user: {
      total: 149,
      totalLastWeek: 2
    }
  }
  const useIdentityStatsResponse = generateQueryResult({
    data,
    isLoading: false
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    jest
      .spyOn(useIdentityStats, 'useIdentityStats')
      .mockImplementation(() => useIdentityStatsResponse as any)

    render(<IdentityStatsCards />)
  })

  it('renders null when loading', () => {
    const useIdentityStatsIsLoadingResponse = generateQueryResult({
      data,
      isLoading: true
    })

    jest
      .spyOn(useIdentityStats, 'useIdentityStats')
      .mockImplementation(() => useIdentityStatsIsLoadingResponse as any)

    const { container } = render(<IdentityStatsCards />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when data is undefined', () => {
    const useIdentityStatsIsLoadingResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useIdentityStats, 'useIdentityStats')
      .mockImplementation(() => useIdentityStatsIsLoadingResponse as any)

    const { container } = render(<IdentityStatsCards />)

    expect(container).toBeEmptyDOMElement()
  })
})
