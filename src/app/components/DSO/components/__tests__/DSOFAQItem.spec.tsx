import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { faqItem } from '__fixtures__/issuance'
import {
  DSOFAQItem,
  getMarginTopValue
} from 'app/components/DSO/components/DSOFAQItem'
import { TypedField } from 'components/form/TypedField'
import { DSOTeamRemoveButton } from 'app/components/DSO/components/DSOTeamRemoveButton'
import { TextInput } from 'ui/TextInput/TextInput'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { Divider } from 'ui/Divider'

jest.mock('ui/Divider', () => ({
  Divider: jest.fn(() => null)
}))

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
        component: TextInput,
        defaultValue: faqItem.question,
        name: ['faqs', 1, 'question'],
        variant: 'outlined'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        fullWidth: true,
        component: TextInput,
        defaultValue: faqItem.answer,
        name: ['faqs', 1, 'answer'],
        variant: 'outlined',
        multiline: true,
        rows: 3
      }),
      {}
    )
  })

  it('renders inputs with correct props when defaultValue is undefined', () => {
    render(
      <Form>
        <DSOFAQItem
          defaultValue={undefined as any}
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
        component: TextInput,
        defaultValue: '',
        name: ['faqs', 1, 'question'],
        variant: 'outlined'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        fullWidth: true,
        component: TextInput,
        defaultValue: '',
        name: ['faqs', 1, 'answer'],
        variant: 'outlined',
        multiline: true,
        rows: 3
      }),
      {}
    )
  })

  it('renders remove button and Divider components', () => {
    render(
      <Form>
        <DSOFAQItem
          defaultValue={faqItem}
          index={1}
          fieldId={'213'}
          remove={removeFn}
        />
      </Form>
    )

    expect(DSOTeamRemoveButton).toHaveBeenCalledWith(
      {
        disabled: false,
        sx: { width: 50, height: 50, marginLeft: 2 },
        remove: removeFn,
        index: 1
      },
      {}
    )
    expect(Divider).toHaveBeenCalledTimes(0)
  })

  it('renders remove button and Divider components when isTablet is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isTablet: true
    } as any)

    render(
      <Form>
        <DSOFAQItem
          defaultValue={faqItem}
          index={1}
          fieldId={'213'}
          remove={removeFn}
        />
      </Form>
    )

    expect(DSOTeamRemoveButton).toHaveBeenCalledWith(
      {
        disabled: false,
        sx: { width: '100%', height: 50 },
        remove: removeFn,
        index: 1
      },
      {}
    )

    expect(Divider).toHaveBeenCalledTimes(1)
  })

  it('returns correct margin top value for subtitle grid component', () => {
    expect(getMarginTopValue(0, true)).toBe(4)
    expect(getMarginTopValue(0, false)).toBe(5)
    expect(getMarginTopValue(1, false)).toBe(8)
  })
})
