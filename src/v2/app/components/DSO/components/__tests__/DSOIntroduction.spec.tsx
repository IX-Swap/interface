/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, render } from 'test-utils'
import { DSOIntroduction } from 'v2/app/components/DSO/components/DSOIntroduction'
import { EditableField } from 'v2/components/form/EditableField'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/components/form/EditableField', () => ({
  EditableField: jest.fn(() => <input />)
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

    expect(EditableField).toBeCalledWith(
      expect.objectContaining({
        label: 'Introduction',
        name: 'introduction',
        valueExtractor: plainValueExtractor
      }),
      {}
    )
  })
})
