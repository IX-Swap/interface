import React from 'react'
import { render } from 'test-utils'
import { AccessReports } from 'app/pages/educationCentre/components/AccessReports'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('AccessReports', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AccessReports editable={true} />)
  })
})
