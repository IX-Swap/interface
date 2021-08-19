import React from 'react'
import { render, cleanup } from 'test-utils'
import { Form } from 'components/form/Form'
import { DSOChapterAddButton } from 'app/components/DSO/components/DSOChapterAddButton'
import { faqItem } from '__fixtures__/issuance'
import { DSOFAQ } from 'app/components/DSO/components/DSOFAQ'
import { DSOFAQItem } from 'app/components/DSO/components/DSOFAQItem'

jest.mock('app/components/DSO/components/DSOChapterAddButton', () => ({
  DSOChapterAddButton: jest.fn(() => null)
}))

jest.mock('app/components/DSO/components/DSOFAQItem', () => ({
  DSOFAQItem: jest.fn(() => null)
}))

describe('DSOFAQ', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form defaultValues={{ faq: [] }}>
        <DSOFAQ />
      </Form>
    )
  })

  it('renders DSOTeamAddButton', () => {
    render(
      <Form defaultValues={{ faq: [] }}>
        <DSOFAQ />
      </Form>
    )

    expect(DSOChapterAddButton).toHaveBeenCalled()
  })

  it('calls DSOFAQItem for each element in the array', () => {
    render(
      <Form defaultValues={{ faq: [faqItem, faqItem, faqItem] }}>
        <DSOFAQ />
      </Form>
    )

    expect(DSOFAQItem).toBeCalledTimes(3)
  })

  it('does not call DSOFAQItem if array is empty', () => {
    render(
      <Form defaultValues={{ faq: [] }}>
        <DSOFAQ />
      </Form>
    )

    expect(DSOFAQItem).toBeCalledTimes(0)
  })
})
