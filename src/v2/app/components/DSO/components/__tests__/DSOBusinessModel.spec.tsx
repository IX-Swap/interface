/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, render } from 'test-utils'
import { DSOBusinessModel } from 'v2/app/components/DSO/components/DSOBusinessModel'
import { EditableField } from 'v2/components/form/EditableField'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/components/form/EditableField', () => ({
  EditableField: jest.fn(() => <input />)
}))

describe('DSOBusinessModel', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOBusinessModel />
      </Form>
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOBusinessModel />
      </Form>
    )

    expect(EditableField).toBeCalledWith(
      expect.objectContaining({
        label: 'Business Model',
        name: 'businessModel',
        valueExtractor: plainValueExtractor
      }),
      {}
    )
  })
})
