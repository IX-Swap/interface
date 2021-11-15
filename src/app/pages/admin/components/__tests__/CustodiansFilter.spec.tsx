import React from 'react'
import { render, cleanup } from 'test-utils'
import { CustodiansFilter } from 'app/pages/admin/components/CustodiansFilter/CustodiansFilter'

describe('CustodiansFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CustodiansFilter />)
  })
})
