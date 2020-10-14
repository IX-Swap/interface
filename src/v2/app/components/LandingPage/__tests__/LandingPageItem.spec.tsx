/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  LandingPageItem,
  LandingPageItemProps
} from 'v2/app/components/LandingPage/LandingPageItem'

describe('LandingPageItem', () => {
  const props: LandingPageItemProps = {
    link: { label: 'Account', path: '/account', icon: jest.fn(() => null) }
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<LandingPageItem {...props} />)
  })

  it('renders icon correctly', () => {
    render(<LandingPageItem {...props} />)

    expect(props.link.icon).toHaveBeenCalledTimes(1)
  })

  it('renders label correctly', () => {
    const { container } = render(<LandingPageItem {...props} />)

    expect(container).toHaveTextContent(props.link.label)
  })
})
