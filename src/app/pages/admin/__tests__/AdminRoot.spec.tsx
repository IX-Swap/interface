import React from 'react'
import { render } from 'test-utils'
import { AdminRoot } from 'app/pages/admin/AdminRoot'

jest.mock('app/components/PageHeader/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
}))

describe('AdminRoot', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<AdminRoot />)
  })
})
