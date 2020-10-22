/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, render } from 'test-utils'
import { EditableField } from 'v2/components/form/EditableField'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
import { DSOUseOfProceeds } from 'v2/app/components/DSO/components/DSOUseOfProceeds'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/components/form/EditableField', () => ({
  EditableField: jest.fn(() => <input />)
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

    expect(EditableField).toBeCalledWith(
      expect.objectContaining({
        label: 'Use of Proceeds',
        name: 'useOfProceeds',
        valueExtractor: plainValueExtractor
      }),
      {}
    )
  })
})
