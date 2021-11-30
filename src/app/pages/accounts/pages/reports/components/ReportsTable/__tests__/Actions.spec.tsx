import React from 'react'
import { renderWithUserStore, cleanup } from 'test-utils'
import { Actions } from '../Actions'
import { reportsItems } from 'app/pages/accounts/pages/reports/components/ReportsTable/ReportsTable'

describe('Actions', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', async () => {
    renderWithUserStore(<Actions item={reportsItems[0]} />)
  })
})
