import React from 'react'
import { cleanup, render } from 'test-utils'
import { DSOIntroduction } from 'v2/app/components/DSO/components/DSOIntroduction'
import { TypedField } from 'v2/components/form/TypedField'
import { wysiwygValueExtractor } from 'v2/helpers/forms'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOIntroduction', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
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
        label: 'Introduction',
        name: 'introduction',
        valueExtractor: wysiwygValueExtractor
      }),
      {}
    )
  })
})
