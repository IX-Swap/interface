import { Charts } from 'app/pages/home/components/Charts/Charts'
import { sampleSecurity } from 'app/pages/home/components/Securities/__tests__/SecurityCard.spec'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

describe('Charts', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Charts data={[sampleSecurity]} isLoading={false} />)
  })

  it('renders loading indicator when isLoading', () => {
    render(<Charts data={[sampleSecurity]} isLoading={true} />)
    expect(LoadingIndicator).toHaveBeenCalled()
  })

  it('renders null when data is undefined', () => {
    const { container } = render(<Charts data={undefined} isLoading={false} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders noData when data length < 1', () => {
    const { getByText } = render(<Charts data={[]} isLoading={false} />)

    expect(getByText('No data found')).toBeTruthy()
  })
})
