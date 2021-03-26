import { AddressView } from 'app/pages/_identity/components/IndividualIdentityView/AddressView/AddressView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { individual } from '__fixtures__/identity'

describe('AddressView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AddressView data={individual.address} />)
  })
})
