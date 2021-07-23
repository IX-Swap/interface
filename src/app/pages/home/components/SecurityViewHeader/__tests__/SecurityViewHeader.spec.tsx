import { sampleSecurity } from 'app/pages/home/components/Securities/__tests__/SecurityCard.spec'
import { SecurityViewHeader } from 'app/pages/home/components/SecurityViewHeader/SecurityViewHeader'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SecurityViewHeader', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SecurityViewHeader data={sampleSecurity} />)
  })
})
