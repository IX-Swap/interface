import { DocumentsView } from 'app/pages/exchange/components/ListingDetails/Information/DocumentsView'
import React from 'react'
import { render } from 'test-utils'

describe('DocumentsView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DocumentsView data={[]} />)
  })
})
