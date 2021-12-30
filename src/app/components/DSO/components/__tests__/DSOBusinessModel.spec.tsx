import React from 'react'
import { render } from 'test-utils'
import { DSOBusinessModel } from 'app/components/DSO/components/DSOBusinessModel'
import { TypedField } from 'components/form/TypedField'
import { wysiwygValueExtractor } from 'helpers/forms'
import { Form } from 'components/form/Form'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOBusinessModel', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
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

    expect(TypedField).toBeCalledWith(
      expect.objectContaining({
        label: 'Business Model',
        name: 'businessModel',
        valueExtractor: wysiwygValueExtractor
      }),
      {}
    )
  })
})
