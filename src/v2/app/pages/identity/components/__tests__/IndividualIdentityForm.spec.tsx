/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IndividualIdentityForm,
  IndividualIdentityFormProps
} from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { individual } from '__fixtures__/identity'

describe('IndividualIdentityForm', () => {
  const props: IndividualIdentityFormProps = {
    identity: individual,
    isEditing: false,
    useOwnEmail: false,
    submitButtonText: 'Submit',
    cancelButton: <div data-testid='cancelButton' />
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualIdentityForm {...props} />)
  })
})
