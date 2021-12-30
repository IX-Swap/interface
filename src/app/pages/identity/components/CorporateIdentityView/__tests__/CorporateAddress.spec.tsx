import { CorporateAddress } from 'app/pages/identity/components/CorporateIdentityView/CorporateAddress'
import React from 'react'
import { render } from 'test-utils'
import { corporate } from '__fixtures__/identity'

describe('CorporateAddress', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <CorporateAddress
        registeredAddress={corporate.companyAddress}
        mailingAddress={corporate.mailingAddress}
      />
    )
  })

  it('does not render mailing address when it is undefined', () => {
    const { queryByText } = render(
      <CorporateAddress
        registeredAddress={corporate.companyAddress}
        mailingAddress={undefined}
      />
    )

    expect(queryByText('Address for Correspondence')).not.toBeTruthy()
  })
})
