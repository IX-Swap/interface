import React from 'react'
import { render, cleanup } from 'test-utils'
import { faqItem } from '__fixtures__/issuance'
import { DSOFAQsView } from 'app/components/DSO/components/DSOFAQsView'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import * as Typography from '@material-ui/core'

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

jest.mock('app/components/DSO/components/FormSectionHeader', () => ({
  FormSectionHeader: jest.fn(() => null)
}))

describe('DSOFAQsView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  const faq = { faqs: [faqItem] } as any

  it('renders without error', () => {
    render(<DSOFAQsView dso={faq} />)
  })

  it('renders FormSectionHeader', () => {
    render(<DSOFAQsView dso={faq} />)

    expect(FormSectionHeader).toHaveBeenCalledTimes(0)
  })

  it('renders FormSectionHeader when isTitleVisible is true', () => {
    render(<DSOFAQsView dso={faq} isTitleVisible />)

    expect(FormSectionHeader).toHaveBeenCalledTimes(1)
    expect(FormSectionHeader).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'FAQs' }),
      {}
    )
  })

  it('renders content with correct props', () => {
    render(<DSOFAQsView dso={faq} />)

    expect(Typography).toHaveBeenCalledTimes(2)

    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: [1, '. ', faqItem.question],
        variant: 'subtitle1'
      }),
      {}
    )

    expect(Typography).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        children: faqItem.answer,
        variant: 'body1',
        style: { paddingLeft: 16, paddingTop: 16 }
      }),
      {}
    )
  })
})
