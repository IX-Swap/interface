import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { faqItem } from '__fixtures__/issuance'
import { DSOFAQItem } from 'app/components/DSO/components/DSOFAQItem'
import { TypedField } from 'components/form/TypedField'
import { TextField } from '@material-ui/core'
import { DSOTeamRemoveButton } from 'app/components/DSO/components/DSOTeamRemoveButton'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

jest.mock('app/components/DSO/components/DSOTeamRemoveButton', () => ({
  DSOTeamRemoveButton: jest.fn(() => null)
}))

describe('DSOFAQItem', () => {
  const removeFn = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders inputs with correct props ', () => {
    render(
      <Form>
        <DSOFAQItem
          defaultValue={faqItem}
          isNew={true}
          index={1}
          fieldId={'213'}
          remove={removeFn}
        />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledTimes(2)
    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        fullWidth: true,
        component: TextField,
        defaultValue: faqItem.question,
        label: 'FAQ #2',
        name: ['faqs', 1, 'question'],
        variant: 'outlined',
        helperText: 'Input FAQ Question'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        fullWidth: true,
        component: TextField,
        defaultValue: faqItem.answer,
        label: 'Input answer here',
        name: ['faqs', 1, 'answer'],
        variant: 'outlined',
        multiline: true,
        rows: 3
      }),
      {}
    )
  })

  it('renders remove button component', () => {
    render(
      <Form>
        <DSOFAQItem
          defaultValue={faqItem}
          isNew={true}
          index={1}
          fieldId={'213'}
          remove={removeFn}
        />
      </Form>
    )

    expect(DSOTeamRemoveButton).toHaveBeenCalledTimes(0)
  })

  it('renders remove button component if index equal or more than 3', () => {
    render(
      <Form>
        <DSOFAQItem
          defaultValue={faqItem}
          isNew={true}
          index={3}
          fieldId={'213'}
          remove={removeFn}
        />
      </Form>
    )

    expect(DSOTeamRemoveButton).toHaveBeenCalledTimes(1)
    expect(DSOTeamRemoveButton).toHaveBeenCalledWith(
      expect.objectContaining({
        remove: removeFn,
        index: 3
      }),
      {}
    )
  })

  it('renders remove button component if isNew is false', () => {
    render(
      <Form>
        <DSOFAQItem
          defaultValue={faqItem}
          isNew={false}
          index={1}
          fieldId={'213'}
          remove={removeFn}
        />
      </Form>
    )

    expect(DSOTeamRemoveButton).toHaveBeenCalledTimes(1)
    expect(DSOTeamRemoveButton).toHaveBeenCalledWith(
      expect.objectContaining({
        remove: removeFn,
        index: 1
      }),
      {}
    )
  })
})
