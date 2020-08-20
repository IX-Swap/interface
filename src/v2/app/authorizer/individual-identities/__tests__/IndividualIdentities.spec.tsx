/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IndividualIdentities,
  renderIndividualIdentityForm
} from 'v2/app/authorizer/individual-identities/IndividualIdentities'
import IndividualIdentityForm from 'v2/app/components/identity-forms/individual'
import { individual } from '__fixtures__/authorizer'

jest.mock('v2/app/components/identity-forms/individual', () =>
  jest.fn(() => null)
)

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
          editMode={false}
          useOwnEmail={false}
        />
      )
    })
  })
})
