/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  AddressView,
  AddressViewProps
} from 'v2/app/pages/identity/components/AddressView'
import { individual } from '__fixtures__/identity'

describe('AddressView', () => {
  const props: AddressViewProps = { data: individual.address }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AddressView {...props} />)
  })
})
