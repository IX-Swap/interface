import { IndividualInfoView } from 'app/pages/_identity/components/IndividualIdentityView/IndividualInfoView/IndividualInfoView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { individual } from '__fixtures__/identity'

window.URL.revokeObjectURL = jest.fn()

describe('IndividualInfoView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<IndividualInfoView data={individual} />)
  })
})
