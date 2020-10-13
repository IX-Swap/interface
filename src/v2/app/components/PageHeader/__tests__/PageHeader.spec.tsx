/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  PageHeader,
  PageHeaderProps
} from 'v2/app/components/PageHeader/PageHeader'

describe('PageHeader', () => {
  const props: PageHeaderProps = {}
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<PageHeader {...props} />)
  })
})
