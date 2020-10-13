/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Sidebar } from 'v2/app/components/Sidebar/Sidebar'

describe('Sidebar', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Sidebar />)
  })
})
