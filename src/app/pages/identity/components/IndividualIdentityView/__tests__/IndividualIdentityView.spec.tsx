import { IndividualIdentityView } from 'app/pages/identity/components/IndividualIdentityView/IndividualIdentityView'
import React from 'react'
import { render } from 'test-utils'
import { individual } from '__fixtures__/identity'

window.URL.revokeObjectURL = jest.fn()

describe('IndividualIdentityView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<IndividualIdentityView data={individual} />)
  })
})
