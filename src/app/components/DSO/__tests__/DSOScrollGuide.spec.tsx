import {
  DSOFormSection,
  DSOScrollGuide,
  isSectionVisible
} from 'app/components/DSO/DSOScrollGuide'
import { render } from 'test-utils'
import React from 'react'

describe('DSOScrollGuide', () => {
  const actualDSOFormSection = Object.keys(DSOFormSection)

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders children', () => {
    const { getAllByTestId } = render(
      <DSOScrollGuide hasFAQ={true} hasVideo={true} />
    )

    getAllByTestId('link').forEach((link, i) =>
      expect(link).toHaveTextContent(actualDSOFormSection[i])
    )
  })

  it('not renders Videos and FAQs sections', () => {
    const { queryByText } = render(
      <DSOScrollGuide hasFAQ={false} hasVideo={false} />
    )

    expect(queryByText('Videos')).toBeNull()
    expect(queryByText('FAQs')).toBeNull()
  })

  it('not renders Videos section', () => {
    const { queryByText } = render(
      <DSOScrollGuide hasFAQ={true} hasVideo={false} />
    )

    expect(queryByText('Videos')).toBeNull()
    expect(queryByText('FAQs')).toBeInTheDocument()
  })
  it('not renders FAQs section', () => {
    const { queryByText } = render(
      <DSOScrollGuide hasFAQ={false} hasVideo={true} />
    )

    expect(queryByText('Videos')).toBeInTheDocument()
    expect(queryByText('FAQs')).toBeNull()
  })
})

describe('isSectionVisible', () => {
  it('returns true if name is Videos, showVideos is true', () => {
    expect(isSectionVisible('Videos', true, true)).toEqual(true)
  })

  it('returns true if name is Videos, showVideos is false', () => {
    expect(isSectionVisible('Videos', false, true)).toEqual(false)
  })

  it('returns true if name is FAQs, showFAQs is true', () => {
    expect(isSectionVisible('FAQs', true, true)).toEqual(true)
  })

  it('returns true if name is FAQs, showFAQs is true', () => {
    expect(isSectionVisible('FAQs', true, false)).toEqual(false)
  })

  it('returns true if name is not Videos or FAQs', () => {
    expect(isSectionVisible('Pricing', false, false)).toEqual(true)
  })
})
