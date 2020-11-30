import React from 'react'
import { render, cleanup } from 'test-utils'
import { SuccessView } from 'app/pages/accounts/pages/banks/components/SuccessView'

describe('SuccessView', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    render(<SuccessView title='test title' />)
  })
})
