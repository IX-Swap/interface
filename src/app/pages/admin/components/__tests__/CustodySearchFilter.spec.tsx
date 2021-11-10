import React from 'react'
import { render, cleanup } from 'test-utils'
import { CustodySearchFilter } from 'app/pages/admin/components/CustodySearchFilter/CustodySearchFilter'

jest.mock('app/components/SearchFilter', () => ({
  SearchFilter: jest.fn(() => null)
}))

describe('CustodySearchFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<CustodySearchFilter />)
    expect(container).toMatchSnapshot()
  })
})
