import React from 'react'
import { render, cleanup } from 'test-utils'
import { FormDialogContent } from 'components/FormDialog/FormDialogContent'

describe('WADialogContent', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<FormDialogContent />)
  })
})
