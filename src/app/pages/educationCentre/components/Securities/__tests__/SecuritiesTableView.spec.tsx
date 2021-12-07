import { SecuritiesTableView } from 'app/pages/educationCentre/components/Securities/SecuritiesTableView'
import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

describe('SecuritiesTableView', () => {
  const sampleData = [sampleSecurity]

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SecuritiesTableView data={sampleData} isLoading={false} />)
  })

  it('renders null when data is undefined', () => {
    const { container } = render(<SecuritiesTableView isLoading={false} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders loading indicator when isLoading', () => {
    render(<SecuritiesTableView isLoading={true} />)

    expect(LoadingIndicator).toHaveBeenCalled()
  })

  it('renders no data found when data length is < 1', () => {
    const { getByText } = render(
      <SecuritiesTableView data={[]} isLoading={false} />
    )

    expect(getByText('No data found')).toBeTruthy()
  })
})
