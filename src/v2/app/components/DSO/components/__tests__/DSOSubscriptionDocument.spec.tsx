/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, render } from 'test-utils'
import { EditableField } from 'v2/components/form/EditableField'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
import { DSOSubscriptionDocument } from 'v2/app/components/DSO/components/DSOSubscriptionDocument'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/components/form/EditableField', () => ({
  EditableField: jest.fn(() => <input />)
}))

describe('DSOSubscriptionDocument', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOSubscriptionDocument />
      </Form>
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOSubscriptionDocument />
      </Form>
    )

    expect(EditableField).toBeCalledWith(
      expect.objectContaining({
        label: 'Subscription Document',
        name: 'subscriptionDocument',
        valueExtractor: plainValueExtractor
      }),
      {}
    )
  })
})
