import React from 'react'
import { render, cleanup } from 'test-utils'
import { AccessReports } from 'app/pages/educationCentre/components/AccessReports'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('AccessReports', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AccessReports editable={true} />)
  })
})
