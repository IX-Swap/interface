import React from 'react'
import { render } from 'test-utils'
import { DSOFundRaisingMilestone } from 'app/components/DSO/components/DSOFundRaisingMilestone'
import { TypedField } from 'components/form/TypedField'
import { wysiwygValueExtractor } from 'helpers/forms'
import { Form } from 'components/form/Form'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOFundRaisingMilestone', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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
