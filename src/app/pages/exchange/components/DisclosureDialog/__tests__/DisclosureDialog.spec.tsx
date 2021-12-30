import React from 'react'
import { render } from 'test-utils'
import { DisclosureDialog } from 'app/pages/exchange/components/DisclosureDialog/DisclosureDialog'

describe('DisclosureDialog', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DisclosureDialog isOpen={true} content={<></>} />)
  })
})
