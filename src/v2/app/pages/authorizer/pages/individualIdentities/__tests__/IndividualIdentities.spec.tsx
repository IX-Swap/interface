/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IndividualIdentities,
  renderIndividualIdentityForm
} from 'v2/app/pages/authorizer/pages/individualIdentities/IndividualIdentities'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { individual } from '__fixtures__/authorizer'

jest.mock('v2/app/pages/identity/components/IndividualIdentityForm', () => ({
  IndividualIdentityForm: jest.fn(() => null)
}))

describe('IndividualIdentities', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<IndividualIdentities />)
  })

  describe('renderIndividualIdentityForm', () => {
    it('renders IndividualIdentityForm component with correct data', () => {
      const individualIdentityForm = renderIndividualIdentityForm(individual)

      expect(individualIdentityForm).toEqual(
        <IndividualIdentityForm
          identity={individual}
          isEditing={false}
          useOwnEmail={false}
        />
      )
    })
  })
})
