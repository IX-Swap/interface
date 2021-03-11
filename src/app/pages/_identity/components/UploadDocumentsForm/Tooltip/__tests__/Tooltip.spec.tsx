import { Tooltip } from 'app/pages/_identity/components/UploadDocumentsForm/Tooltip/Tooltip'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Tooltip', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Tooltip title='Info' />)
  })
})
