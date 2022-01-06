import React from 'react'
import { render } from 'test-utils'
import { TopIssuers } from 'app/pages/educationCentre/components/TopIssuers'
import * as useTopIssuers from 'app/pages/educationCentre/hooks/useTopIssuers'
import { individual } from '__fixtures__/identity'

jest.mock('app/pages/educationCentre/components/TopList', () => ({
  TopList: jest.fn(() => null)
}))

describe('TopIssuers', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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
