import React from 'react'
import { render, cleanup } from 'test-utils'
import { TopCorporates } from 'app/pages/educationCentre/components/TopCorporates'
import * as useTopCorporates from 'app/pages/educationCentre/hooks/useTopCorporates'
import { corporate } from '__fixtures__/identity'

jest.mock('app/pages/educationCentre/components/TopList', () => ({
  TopList: jest.fn(() => null)
}))

describe('TopCorporates', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = { data: [corporate], isLoading: false }

    jest
      .spyOn(useTopCorporates, 'useTopCorporates')
      .mockImplementation(() => objResponse as any)

    render(<TopCorporates />)
  })

  it('renders null if isLoading', () => {
    const objResponse = { data: [corporate], isLoading: true }

    jest
      .spyOn(useTopCorporates, 'useTopCorporates')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<TopCorporates />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders null if data is undefined', () => {
    const objResponse = { data: undefined, isLoading: false }

    jest
      .spyOn(useTopCorporates, 'useTopCorporates')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<TopCorporates />)

    expect(container).toBeEmptyDOMElement()
  })
})
