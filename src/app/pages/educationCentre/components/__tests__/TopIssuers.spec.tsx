import React from 'react'
import { render, cleanup } from 'test-utils'
import { TopIssuers } from 'app/pages/educationCentre/components/TopIssuers'
import * as useTopIssuers from 'app/pages/educationCentre/hooks/useTopIssuers'
import { individual } from '__fixtures__/identity'

jest.mock('app/pages/educationCentre/components/TopList', () => ({
  TopList: jest.fn(() => null)
}))

describe('TopIssuers', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = { data: [individual], isLoading: false }

    jest
      .spyOn(useTopIssuers, 'useTopIssuers')
      .mockImplementation(() => objResponse as any)

    render(<TopIssuers />)
  })

  it('renders null when isLoading is true', () => {
    const objResponse = { data: [individual], isLoading: true }

    jest
      .spyOn(useTopIssuers, 'useTopIssuers')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<TopIssuers />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when data is undefined', () => {
    const objResponse = { data: undefined, isLoading: false }

    jest
      .spyOn(useTopIssuers, 'useTopIssuers')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<TopIssuers />)

    expect(container).toBeEmptyDOMElement()
  })
})
