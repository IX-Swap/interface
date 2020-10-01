/**  * @jest-environment jsdom-sixteen  */
import React, { PropsWithChildren } from 'react'
import { render, cleanup } from 'test-utils'

import {
  Section,
  IdentitySectionProps
} from 'v2/app/pages/identity/components/Section'

describe('Section', () => {
  const props: PropsWithChildren<IdentitySectionProps> = {
    title: 'Test Title',
    subtitle: 'Test Subitle',
    actions: <div data-testid='actions' />,
    footer: <div data-testid='footer' />
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Section {...props} />)
  })
})
