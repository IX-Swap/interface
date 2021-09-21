import React from 'react'
import { render, cleanup } from 'test-utils'
import { faqItem } from '__fixtures__/issuance'
import { DSOFAQsView } from 'app/components/DSO/components/DSOFAQsView'
import { DigitalSecurityOffering } from 'types/dso'
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

  it('renders without error', () => {
    render(<DSOFAQsView dso={{ faqs: [faqItem] } as DigitalSecurityOffering} />)
  })

  it('renders title', () => {
    render(<DSOFAQsView dso={{ faqs: [faqItem] } as DigitalSecurityOffering} />)

    expect(FormSectionHeader).toHaveBeenCalledTimes(0)
  })

  it('renders title with correct props when isTitleVisible is true', () => {
    render(
      <DSOFAQsView
        dso={{ faqs: [faqItem] } as DigitalSecurityOffering}
        isTitleVisible
      />
    )

    expect(FormSectionHeader).toHaveBeenCalledTimes(1)
    expect(FormSectionHeader).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'FAQs' }),
      {}
    )
  })

  it('renders title with correct props when isTitleVisible and iaNewThemeOn is true', () => {
    render(
      <DSOFAQsView
        dso={{ faqs: [faqItem] } as DigitalSecurityOffering}
        isNewThemeOn
        isTitleVisible
      />
    )

    expect(FormSectionHeader).toHaveBeenCalledTimes(0)
    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        variant: 'h4',
        color: 'primary',
        style: { fontWeight: 700 },
        children: 'Frequently Asked Questions'
      }),
      {}
    )
  })

  it('renders content with correct props', () => {
    render(<DSOFAQsView dso={{ faqs: [faqItem] } as DigitalSecurityOffering} />)

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
