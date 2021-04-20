import React from 'react'
import { render, cleanup } from 'test-utils'
import { FormDialog } from 'components/FormDialog/FormDialog'

describe('FormDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<FormDialog open />)
  })
})
