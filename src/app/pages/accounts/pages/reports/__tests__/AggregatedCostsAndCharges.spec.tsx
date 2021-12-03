import React from 'react'
import { render, cleanup } from 'test-utils'
import { AggregatedCostsAndCharges } from 'app/pages/accounts/pages/reports/AggregatedCostsAndCharges'
import { fakeFeeAndCharges } from '__fixtures__/reports'
import * as useFeeAndCharges from 'app/pages/accounts/hooks/useFeeAndCharges'
import timezoneMock from 'timezone-mock'

describe('AggregatedCostsAndCharges', () => {
  beforeAll(() => {
    timezoneMock.register('US/Pacific')
  })

  afterEach(async () => {
    await cleanup()
    timezoneMock.unregister()
  })

  it('should match snapshot when data is undefined', () => {
    jest.spyOn(useFeeAndCharges, 'useFeeAndCharges').mockReturnValue({
      data: undefined,
      isLoading: false
    } as any)

    const { container } = render(<AggregatedCostsAndCharges />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when all data is loaded successfully', () => {
    jest.spyOn(useFeeAndCharges, 'useFeeAndCharges').mockReturnValue({
      data: fakeFeeAndCharges,
      isLoading: false
    } as any)

    const { container } = render(<AggregatedCostsAndCharges />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data is loaded successfully and sgd field is empty array', () => {
    jest.spyOn(useFeeAndCharges, 'useFeeAndCharges').mockReturnValue({
      data: { fakeFeeAndCharges, sgd: [] },
      isLoading: false
    } as any)

    const { container } = render(<AggregatedCostsAndCharges />)
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when data is loaded successfully and usd field is empty array', () => {
    jest.spyOn(useFeeAndCharges, 'useFeeAndCharges').mockReturnValue({
      data: { fakeFeeAndCharges, usd: [] },
      isLoading: false
    } as any)

    const { container } = render(<AggregatedCostsAndCharges />)
    expect(container).toMatchSnapshot()
  })
})
