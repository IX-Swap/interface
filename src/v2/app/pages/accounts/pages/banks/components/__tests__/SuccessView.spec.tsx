/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { SuccessView } from 'v2/app/pages/accounts/pages/banks/components/SuccessView'

describe('SuccessView', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    render(<SuccessView title='test title' />)
  })
})
