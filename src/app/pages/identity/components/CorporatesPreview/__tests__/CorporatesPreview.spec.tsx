import { CorporatesPreview } from 'app/pages/identity/components/CorporatesPreview/CorporatesPreview'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { corporate } from '__fixtures__/identity'

window.URL.revokeObjectURL = jest.fn()

describe('CorporatesPreview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CorporatesPreview data={corporate} />)
  })
})
