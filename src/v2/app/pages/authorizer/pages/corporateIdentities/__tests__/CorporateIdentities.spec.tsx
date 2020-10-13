/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CorporateIdentities,
  renderCorporateIdentity
} from 'v2/app/pages/authorizer/pages/corporateIdentities/CorporateIdentities'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { AuthorizerView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { corporate } from '__fixtures__/authorizer'
import { DataroomFeature } from 'v2/types/authorizer'

jest.mock('v2/app/pages/identity/components/CorporateIdentityForm', () => ({
  CorporateIdentityForm: jest.fn(() => null)
}))

jest.mock('v2/app/pages/authorizer/components/AuthorizerView', () => ({
  AuthorizerView: jest.fn(() => null)
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
        <AuthorizerView
          title='About This Corporate'
          data={corporate}
          feature={DataroomFeature.corporates}
        >
          <CorporateIdentityForm
            data={corporate}
            isEditing={false}
            useOwnEmail={false}
          />
        </AuthorizerView>
      )
    })
  })
})
