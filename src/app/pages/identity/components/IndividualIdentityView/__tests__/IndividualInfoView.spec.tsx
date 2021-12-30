import { IndividualInfoView } from 'app/pages/identity/components/IndividualIdentityView/IndividualInfoView/IndividualInfoView'
import React from 'react'
import { render } from 'test-utils'
import { individual } from '__fixtures__/identity'

window.URL.revokeObjectURL = jest.fn()

describe('IndividualInfoView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<IndividualInfoView data={individual} />)
  })
})
