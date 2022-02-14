import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { SecuritiesGrid } from 'app/pages/educationCentre/components/Securities/SecuritiesGrid'
import React from 'react'
import { render } from 'test-utils'

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

describe('SecuritiesGrid', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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
