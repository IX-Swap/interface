import React from 'react'
import { render } from 'test-utils'
import { TopInvestors } from 'app/pages/issuance/components/IssuanceLanding/TopInvestors'
import * as useTopInvestorsHook from 'app/pages/issuance/hooks/useTopInvestors'

describe('TopInvestors', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    jest.spyOn(useTopInvestorsHook, 'useTopInvestors').mockReturnValue({
      data: [
        ['Investor', 'Amount'],
        ['', 100]
      ],
      isLoading: false
    } as any)

    render(<TopInvestors />)
  })

  it.skip('renders without error if data does not exist', () => {
    jest.spyOn(useTopInvestorsHook, 'useTopInvestors').mockReturnValue({
      data: [],
      isLoading: false
    } as any)

    render(<TopInvestors />)
  })

  it('renders nothing if loading', () => {
    jest.spyOn(useTopInvestorsHook, 'useTopInvestors').mockReturnValue({
      data: [],
      isLoading: true
    } as any)

    const { container } = render(<TopInvestors />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if data is undefined', () => {
    jest.spyOn(useTopInvestorsHook, 'useTopInvestors').mockReturnValue({
      data: undefined,
      isLoading: true
    } as any)

    const { container } = render(<TopInvestors />)

    expect(container).toBeEmptyDOMElement()
  })
})
