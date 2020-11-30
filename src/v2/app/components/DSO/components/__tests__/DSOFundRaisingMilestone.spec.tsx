import React from 'react'
import { cleanup, render } from 'test-utils'
import { DSOFundRaisingMilestone } from 'v2/app/components/DSO/components/DSOFundRaisingMilestone'
import { TypedField } from 'v2/components/form/TypedField'
import { wysiwygValueExtractor } from 'v2/helpers/forms'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
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

    expect(TypedField).toBeCalledWith(
      expect.objectContaining({
        label: 'Fund Raising Milestone',
        name: 'fundraisingMilestone',
        valueExtractor: wysiwygValueExtractor
      }),
      {}
    )
  })
})
