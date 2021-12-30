import React from 'react'
import { render } from 'test-utils'
import { FormDialog } from 'components/FormDialog/FormDialog'

describe('FormDialog', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<FormDialog open />)
  })
})
