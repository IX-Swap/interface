import { Tooltip } from 'app/pages/identity/components/UploadDocumentsForm/Tooltip/Tooltip'
import React from 'react'
import { render } from 'test-utils'

describe('Tooltip', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Tooltip title='Info' />)
  })
})
