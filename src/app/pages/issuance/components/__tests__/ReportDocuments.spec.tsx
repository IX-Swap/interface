import { ReportDocuments } from 'app/pages/issuance/components/ReportDocuments'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock('components/dataroom/DataroomHeader', () => ({
  DataroomHeader: jest.fn(() => null)
}))

jest.mock('components/dataroom/DataroomViewRow', () => ({
  DataroomViewRow: jest.fn(() => null)
}))

describe('ReportDocuments', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ReportDocuments />)
  })
})
