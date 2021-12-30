import * as useDSOById from 'app/pages/invest/hooks/useDSOById'
import { PricePerToken } from 'app/pages/issuance/components/CapTable/PricePerToken'
import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('PricePerToken', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({ data: dso })

    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<PricePerToken />)
  })

  it('renders correct value when dso is defined', () => {
    const { getByText } = render(<PricePerToken />)
    expect(getByText('S$ 1')).toBeTruthy()
  })

  it('renders correct value when dso is undefined', () => {
    const objResponse = generateQueryResult({ data: undefined })

    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)

    const { getByText } = render(<PricePerToken />)
    expect(getByText('SGD 0')).toBeTruthy()
  })
})
