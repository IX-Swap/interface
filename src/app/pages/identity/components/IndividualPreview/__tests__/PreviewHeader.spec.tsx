import { PreviewHeader } from 'app/pages/identity/components/IndividualPreview/PreviewHeader'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Status } from 'app/pages/admin/components/Status'

jest.mock('app/pages/admin/components/Status', () => ({
  Status: jest.fn(() => null)
}))

describe('PreviewHeader', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PreviewHeader title='Individual Investor' status='Draft' />)
  })

  it('renders status component as success when status is Approved', () => {
    render(<PreviewHeader title='Individual Investor' status='Approved' />)

    expect(Status).toHaveBeenCalledWith(
      expect.objectContaining({ variant: 'success' }),
      {}
    )
  })
})
