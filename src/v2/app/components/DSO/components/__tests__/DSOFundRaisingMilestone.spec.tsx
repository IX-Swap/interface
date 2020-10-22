/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, render } from 'test-utils'
import { DSOFundRaisingMilestone } from 'v2/app/components/DSO/components/DSOFundRaisingMilestone'
import { EditableField } from 'v2/components/form/EditableField'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/components/form/EditableField', () => ({
  EditableField: jest.fn(() => <input />)
}))

describe('DSOFundRaisingMilestone', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOFundRaisingMilestone />
      </Form>
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOFundRaisingMilestone />
      </Form>
    )

    expect(EditableField).toBeCalledWith(
      expect.objectContaining({
        label: 'Fund Raising Milestone',
        name: 'fundraisingMilestone',
        valueExtractor: plainValueExtractor
      }),
      {}
    )
  })
})
