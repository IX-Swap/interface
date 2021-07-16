import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { SecuritiesGrid } from 'app/pages/home/components/Securities/SecuritiesGrid'
import { sampleSecurity } from 'app/pages/home/components/Securities/__tests__/SecurityCard.spec'
import React from 'react'
import { render, cleanup } from 'test-utils'
jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))
describe('SecuritiesGrid', () => {
  const sampleData = [sampleSecurity]

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SecuritiesGrid data={sampleData} isLoading={false} />)
  })

  it('renders null when data is undefined', () => {
    const { container } = render(<SecuritiesGrid isLoading={false} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders loading indicator when isLoading', () => {
    render(<SecuritiesGrid isLoading={true} />)

    expect(LoadingIndicator).toHaveBeenCalled()
  })

  it('renders no data found when data length is < 1', () => {
    const { getByText } = render(<SecuritiesGrid data={[]} isLoading={false} />)

    expect(getByText('No data found')).toBeTruthy()
  })
})
