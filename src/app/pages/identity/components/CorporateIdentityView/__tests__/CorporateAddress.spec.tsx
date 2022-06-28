import { CorporateAddress } from 'app/pages/identity/components/CorporateIdentityView/CorporateAddress'
import React from 'react'
import { render } from 'test-utils'
import { corporate } from '__fixtures__/identity'

describe('CorporateAddress', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('does not render mailing address when it is undefined', () => {
    const { queryByText } = render(<CorporateAddress data={corporate} />)

    expect(queryByText('Address for Correspondence')).not.toBeTruthy()
  })
})
