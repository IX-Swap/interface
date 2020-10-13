/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  LandingPageItem,
  LandingPageItemProps
} from 'v2/app/components/LandingPage/LandingPageItem'

describe('LandingPageItem', () => {
  const props: LandingPageItemProps = {
    link: { label: 'Account', path: '/account' }
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<LandingPageItem {...props} />)
  })
})
