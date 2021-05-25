import React from 'react'
import { render, cleanup } from 'test-utils'
import { AdminRoot } from 'app/pages/admin/AdminRoot'

jest.mock('app/__tests__/PageHeader/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
}))

describe('AdminRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AdminRoot />)
  })
})
