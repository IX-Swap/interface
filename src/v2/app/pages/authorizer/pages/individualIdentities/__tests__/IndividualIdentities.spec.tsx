/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IndividualIdentities,
  renderIndividualIdentityForm
} from 'v2/app/pages/authorizer/pages/individualIdentities/IndividualIdentities'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { individual } from '__fixtures__/authorizer'
import { DataroomFeature } from '../../../../../../types/authorizer'
import { AuthorizerView } from '../../../components/AuthorizerView'

jest.mock('v2/app/pages/identity/components/IndividualIdentityForm', () => ({
  IndividualIdentityForm: jest.fn(() => null)
}))

jest.mock('v2/app/pages/authorizer/components/AuthorizerView', () => ({
  AuthorizerView: jest.fn(() => null)
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
        <AuthorizerView
          title='About This Identity'
          data={individual}
          feature={DataroomFeature.individualIdentities}
        >
          <IndividualIdentityForm
            data={individual}
            isEditing={false}
            useOwnEmail={false}
          />
        </AuthorizerView>
      )
    })
  })
})
