import React from 'react'
import { render } from 'test-utils'
import { DSOIntroduction } from 'app/components/DSO/components/DSOIntroduction'
import { TypedField } from 'components/form/TypedField'
import { wysiwygValueExtractor } from 'helpers/forms'
import { Form } from 'components/form/Form'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOIntroduction', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <DSOIntroduction />
      </Form>
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOIntroduction />
      </Form>
    )

    expect(TypedField).toBeCalledWith(
      expect.objectContaining({
        label: 'Company Information',
        name: 'introduction',
        valueExtractor: wysiwygValueExtractor
      }),
      {}
    )
  })
})
