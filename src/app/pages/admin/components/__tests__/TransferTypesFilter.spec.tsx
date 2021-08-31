import React from 'react'
import { render, cleanup } from 'test-utils'
import { TransferTypesFilter } from 'app/pages/admin/components/TransferTypesFilter'

describe('TransferTypesFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TransferTypesFilter type={'PP'} />)
  })
})
