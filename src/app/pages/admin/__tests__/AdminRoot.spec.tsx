import React from 'react'
import { render, cleanup } from 'test-utils'
import { AdminRoot } from 'app/pages/admin/AdminRoot'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

jest.mock('app/components/PageHeader/PageHeader', () => ({
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

  it('renders PageHeader component correctly', () => {
    render(<AdminRoot />)

    expect(PageHeader).toHaveBeenCalledTimes(1)
    expect(PageHeader).toHaveBeenCalledWith(
      {
        label: 'Admin',
        alignment: 'flex-start'
      },
      {}
    )
  })
})
