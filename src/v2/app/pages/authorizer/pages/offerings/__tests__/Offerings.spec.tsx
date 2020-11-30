import React from 'react'
import { render, cleanup } from 'test-utils'
import { Offerings } from 'v2/app/pages/authorizer/pages/offerings/Offerings'

describe('Offerings', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<Offerings />)
  })
})
