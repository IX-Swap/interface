import { IndividualPreview } from 'app/pages/identity/components/IndividualPreview/IndividualPreview'
import React from 'react'
import { render } from 'test-utils'
import { individual } from '__fixtures__/identity'

window.URL.revokeObjectURL = jest.fn()

describe('IndividualPreview', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<IndividualPreview data={individual} />)
  })
})
