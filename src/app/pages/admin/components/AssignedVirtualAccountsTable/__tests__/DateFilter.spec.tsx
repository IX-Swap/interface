import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DateFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DateFilter name='fromDate' label='From' />)
  })
})
