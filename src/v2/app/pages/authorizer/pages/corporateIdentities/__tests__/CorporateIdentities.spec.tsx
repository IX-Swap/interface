/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CorporateIdentities,
  renderCorporateIdentity
} from 'v2/app/pages/authorizer/pages/corporateIdentities/CorporateIdentities'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { corporate } from '__fixtures__/authorizer'

jest.mock('v2/app/pages/identity/components/CorporateIdentityForm', () => ({
  CorporateIdentityForm: jest.fn(() => null)
}))

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
          data={corporate}
          isEditing={false}
          useOwnEmail={false}
        />
      )
    })
  })
})
