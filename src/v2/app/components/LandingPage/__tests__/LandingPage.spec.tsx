/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  LandingPage,
  LandingPageProps
} from 'v2/app/components/LandingPage/LandingPage'

describe('LandingPage', () => {
  const props: LandingPageProps = {
    links: [
      { label: 'Assets', path: '/assets' },
      { label: 'Asset Balance', path: '/balance' }
    ],
    label: 'Account',
    path: '/account'
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<LandingPage {...props} />)
  })
})
