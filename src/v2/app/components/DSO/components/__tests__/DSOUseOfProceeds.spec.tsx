/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, render } from 'test-utils'
import { TypedField } from 'v2/components/form/TypedField'
import { wysiwygValueExtractor } from 'v2/helpers/forms'
import { DSOUseOfProceeds } from 'v2/app/components/DSO/components/DSOUseOfProceeds'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOUseOfProceeds', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOUseOfProceeds />
      </Form>
    )
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
