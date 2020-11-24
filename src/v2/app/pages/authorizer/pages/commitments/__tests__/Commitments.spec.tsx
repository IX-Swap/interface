import React from 'react'
import { render, cleanup } from 'test-utils'
import { Commitments } from 'v2/app/pages/authorizer/pages/commitments/Commitments'

describe('Commitments', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<Commitments />)
  })
})
