import React from 'react'
import { render } from 'test-utils'
import { CustodiansFilter } from 'app/pages/admin/components/CustodiansFilter/CustodiansFilter'

describe('CustodiansFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CustodiansFilter />)
  })
})
