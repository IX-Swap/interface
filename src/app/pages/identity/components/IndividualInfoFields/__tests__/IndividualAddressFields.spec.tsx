import { IndividualAddressFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualAddressFields'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'
import * as useIsSingPass from 'app/pages/identity/hooks/useIsSingPass'

jest.mock('app/pages/identity/components/AddressFields/AddressFields', () => ({
  AddressFields: jest.fn(() => null)
}))

describe('IndividualAddressFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('calls Addressfields with correct disabled data when isSingPass true', () => {
    const objResponse = {
      isSingPass: true,
      singPassData: {
        regadd: {
          line1: 'Line One',
          country: 'Singapore'
        }
      }
    }

    jest
      .spyOn(useIsSingPass, 'useIsSingPass')
      .mockImplementation(() => objResponse as any)

    render(<IndividualAddressFields />)

    expect(AddressFields).toHaveBeenCalledWith(
      {
        disabledFields: ['line1', 'country']
      },
      {}
    )
  })

  it('calls Addressfields with correct disabled data when isSingPass false', () => {
    const objResponse = {
      isSingPass: false,
      singPassData: undefined
    }

    jest
      .spyOn(useIsSingPass, 'useIsSingPass')
      .mockImplementation(() => objResponse as any)

    render(<IndividualAddressFields />)

    expect(AddressFields).toHaveBeenCalledWith(
      {
        disabledFields: undefined
      },
      {}
    )
  })
})
