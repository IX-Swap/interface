import { AddressView } from 'app/pages/identity/components/IndividualIdentityView/AddressView/AddressView'
import React from 'react'
import { render } from 'test-utils'
import { individual } from '__fixtures__/identity'

describe('AddressView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AddressView data={individual.address} />)
  })
})
