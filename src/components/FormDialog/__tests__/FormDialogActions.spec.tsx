import React from 'react'
import { render, cleanup } from 'test-utils'
import { FormDialogActions } from 'components/FormDialog/FormDialogActions'

describe('WADialogActions', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<FormDialogActions />)
  })
})
