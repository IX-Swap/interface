/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CorporateIdentities,
  renderCorporateIdentity
} from 'v2/app/pages/authorizer/pages/corporate-identities/CorporateIdentities'
import CorporateIdentityForm from 'v2/app/components/identity-forms/corporate'
import { corporate } from '__fixtures__/authorizer'

jest.mock('v2/app/components/identity-forms/corporate', () =>
  jest.fn(() => null)
)

describe('CorporateIdentities', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<CorporateIdentities />)
  })

  describe('renderCorporateIdentity', () => {
    it('renders CorporateIdentityForm component with correct data', () => {
      const corporateIdentityForm = renderCorporateIdentity(corporate)
      expect(corporateIdentityForm).toEqual(
        <CorporateIdentityForm
          identity={corporate}
          editMode={false}
          useOwnEmail={false}
        />
      )
    })
  })
})
