import { DocumentsView } from 'app/pages/exchange/market/components/ListingDetails/Information/DocumentsView'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DocumentsView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DocumentsView data={[]} />)
  })
})
