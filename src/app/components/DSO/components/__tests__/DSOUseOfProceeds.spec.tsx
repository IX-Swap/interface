import React from 'react'
import { render } from 'test-utils'
import { TypedField } from 'components/form/TypedField'
import { wysiwygValueExtractor } from 'helpers/forms'
import { DSOUseOfProceeds } from 'app/components/DSO/components/DSOUseOfProceeds'
import { Form } from 'components/form/Form'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOUseOfProceeds', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOUseOfProceeds />
      </Form>
    )

    expect(TypedField).toBeCalledWith(
      expect.objectContaining({
        label: 'Use of Proceeds',
        name: 'useOfProceeds',
        valueExtractor: wysiwygValueExtractor
      }),
      {}
    )
  })
})
