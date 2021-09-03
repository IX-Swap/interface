import * as useDSOById from 'app/pages/invest/hooks/useDSOById'
import { TotalTokens } from 'app/pages/issuance/components/CapTable/TotalTokens'
import { formatAmount } from 'helpers/numbers'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('TotalTokens', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({ data: dso })

    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TotalTokens />)
  })

  it('renders correct value', () => {
    const { getByText } = render(<TotalTokens />)

    expect(
      getByText(formatAmount(dso.insight?.raisedTotal / dso.pricePerUnit))
    ).toBeTruthy()
  })

  it('renders correct value when data is undefined', () => {
    const objResponse = generateQueryResult({ data: undefined })

    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)

    const { getByText } = render(<TotalTokens />)

    expect(getByText(formatAmount(0))).toBeTruthy()
  })
})
