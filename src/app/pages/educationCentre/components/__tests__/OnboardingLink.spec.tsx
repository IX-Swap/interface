import React from 'react'
import { render, cleanup } from 'test-utils'
import { OnboardingLink } from 'app/pages/educationCentre/components/OnboardingLink'

describe('OnboardingLink', () => {
  const icon = jest.fn(() => <span />)
  const props = {
    icon: icon,
    label: 'Link',
    to: '/link',
    color: 'primary'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OnboardingLink {...props} />)
  })

  it('renders props correctly', () => {
    const { getByText, container } = render(<OnboardingLink {...props} />)

    const link = container.querySelector('a') as HTMLAnchorElement

    expect(getByText('Link')).toBeTruthy()
    expect(link.getAttribute('href')).toBe('/link')
  })
})
