import { CorporateIdentityView } from 'app/pages/_identity/components/CorporateIdentityView/CorporateIdentityView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { corporate } from '__fixtures__/identity'

window.URL.revokeObjectURL = jest.fn()

describe('CorporateIdentityView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CorporateIdentityView data={corporate} />)
  })
})
