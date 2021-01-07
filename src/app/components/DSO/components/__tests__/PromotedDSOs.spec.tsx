import React from 'react'
import { render, cleanup } from 'test-utils'
import { PromotedDSOs } from 'app/components/DSO/components/PromotedDSOs'
import * as usePromotedDSOsHook from 'app/pages/invest/hooks/usePromotedDSOs'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { dso } from '__fixtures__/authorizer'
import { DSOCard } from 'app/components/DSO/components/DSOCard/DSOCard'
import { DSORoute } from 'app/pages/invest/router/config'

jest.mock('app/components/DSO/components/DSOCard/DSOCard', () => ({
  DSOCard: jest.fn(() => null)
}))

describe('PromotedDSOs', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest.spyOn(usePromotedDSOsHook, 'usePromotedDSOs').mockReturnValue(
      generateInfiniteQueryResult({
        queryStatus: QueryStatus.Success
      })
    )

    render(<PromotedDSOs />)
  })

  it('renders nothing if loading', () => {
    jest.spyOn(usePromotedDSOsHook, 'usePromotedDSOs').mockReturnValue(
      generateInfiniteQueryResult({
        queryStatus: QueryStatus.Loading
      })
    )

    const { container } = render(<PromotedDSOs />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders DSOCard with correct props', () => {
    jest.spyOn(usePromotedDSOsHook, 'usePromotedDSOs').mockReturnValue(
      generateInfiniteQueryResult({
        list: [dso]
      })
    )

    render(<PromotedDSOs />)

    expect(DSOCard).toHaveBeenCalledTimes(1)
    expect(DSOCard).toHaveBeenCalledWith(
      {
        dso: dso,
        viewURL: DSORoute.view
      },
      {}
    )
  })
})
