/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  GenericPreview,
  GenericPreviewProps
} from 'v2/app/components/GenericPreview/GenericPreview'

describe('GenericPreview', () => {
  const props: GenericPreviewProps = {
    items: [
      { label: 'Account', value: 'account' },
      { label: 'Asset Balance', value: 'balance' }
    ]
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<GenericPreview {...props} />)
  })
})
