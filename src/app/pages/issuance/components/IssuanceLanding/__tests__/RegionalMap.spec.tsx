import React from 'react'
import { render } from 'test-utils'
import { RegionalMap } from 'app/pages/issuance/components/IssuanceLanding/RegionalMap'
import * as useInvestorsByCountryHook from 'app/pages/issuance/hooks/useInvestorsByCountry'

describe('RegionalMap', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(useInvestorsByCountryHook, 'useInvestorsByCountry')
      .mockReturnValue({ data: [], isLoading: true } as any)

    const { container } = render(<RegionalMap />)

    expect(container).toBeEmptyDOMElement()
  })
})
