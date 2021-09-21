import React from 'react'
import { render, cleanup } from 'test-utils'
import { DisclosureDialog } from 'app/pages/exchange/components/DisclosureDialog/DisclosureDialog'

describe('DisclosureDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DisclosureDialog isOpen={true} content={<></>} />)
  })
})
