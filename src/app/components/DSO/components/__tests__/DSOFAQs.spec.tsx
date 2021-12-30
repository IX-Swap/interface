import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { DSOChapterAddButton } from 'app/components/DSO/components/DSOChapterAddButton'
import { faqItem } from '__fixtures__/issuance'
import { DSOFAQs } from 'app/components/DSO/components/DSOFAQs'
import { DSOFAQItem } from 'app/components/DSO/components/DSOFAQItem'

jest.mock('app/components/DSO/components/DSOChapterAddButton', () => ({
  DSOChapterAddButton: jest.fn(() => null)
}))

jest.mock('app/components/DSO/components/DSOFAQItem', () => ({
  DSOFAQItem: jest.fn(() => null)
}))

describe('DSOFAQs', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form defaultValues={{ faqs: [] }}>
        <DSOFAQs />
      </Form>
    )
  })

  it('renders DSOTeamAddButton', () => {
    render(
      <Form defaultValues={{ faqs: [] }}>
        <DSOFAQs />
      </Form>
    )

    expect(DSOChapterAddButton).toHaveBeenCalled()
  })

  it('calls DSOFAQItem for each element in the array', () => {
    render(
      <Form defaultValues={{ faqs: [faqItem, faqItem, faqItem] }}>
        <DSOFAQs />
      </Form>
    )

    expect(DSOFAQItem).toBeCalledTimes(3)
  })

  it('does not call DSOFAQItem if array is empty', () => {
    render(
      <Form defaultValues={{ faqs: [] }}>
        <DSOFAQs />
      </Form>
    )

    expect(DSOFAQItem).toBeCalledTimes(0)
  })
})
