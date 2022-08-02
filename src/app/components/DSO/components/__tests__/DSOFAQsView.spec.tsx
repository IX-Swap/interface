import React from 'react'
import { render } from 'test-utils'
import { faqItem } from '__fixtures__/issuance'
import { DSOFAQsView } from 'app/components/DSO/components/DSOFAQsView'
import { dso } from '__fixtures__/authorizer'

describe('DSOFAQsView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  const faq = { faqs: [faqItem] } as any

  it('matches snapshot', () => {
    const { container } = render(<DSOFAQsView dso={dso} />)

    expect(container).toMatchSnapshot()
  })
})
