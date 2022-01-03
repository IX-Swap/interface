import React from 'react'
import { render, cleanup } from 'test-utils'
import { AggregatedCostsAndCharges } from 'app/pages/accounts/pages/reports/AggregatedCostsAndCharges'
import { fakeFeeAndCharges } from '__fixtures__/reports'
import * as useFeeAndCharges from 'app/pages/accounts/hooks/useFeeAndCharges'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('AggregatedCostsAndCharges', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('should match snapshot when data is undefined', () => {
    jest.spyOn(useFeeAndCharges, 'useFeeAndCharges').mockReturnValue(
      generateQueryResult({
        data: undefined,
        isLoading: false
      })
    )

    const { container } = render(<AggregatedCostsAndCharges />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when all data is loaded successfully', () => {
    jest.spyOn(useFeeAndCharges, 'useFeeAndCharges').mockReturnValue(
      generateQueryResult({
        data: fakeFeeAndCharges,
        isLoading: false
      })
    )

    const { container } = render(<AggregatedCostsAndCharges />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data is loaded successfully and sgd field is empty array', () => {
    jest.spyOn(useFeeAndCharges, 'useFeeAndCharges').mockReturnValue(
      generateQueryResult({
        data: { fakeFeeAndCharges, sgd: [] },
        isLoading: false
      })
    )

    const { container } = render(<AggregatedCostsAndCharges />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data is loaded successfully and usd field is empty array', () => {
    jest.spyOn(useFeeAndCharges, 'useFeeAndCharges').mockReturnValue(
      generateQueryResult({
        data: { fakeFeeAndCharges, usd: [] },
        isLoading: false
      })
    )

    const { container } = render(<AggregatedCostsAndCharges />)
    expect(container).toMatchSnapshot()
  })
})
