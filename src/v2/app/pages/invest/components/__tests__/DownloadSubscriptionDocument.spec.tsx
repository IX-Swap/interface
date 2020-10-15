/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DownloadSubscriptionDocument,
  DownloadSubscriptionDocumentProps
} from 'v2/app/pages/invest/components/DownloadSubscriptionDocument'
import { dso } from '__fixtures__/authorizer'

describe('DownloadSubscriptionDocument', () => {
  const props: DownloadSubscriptionDocumentProps = { dso: dso }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DownloadSubscriptionDocument {...props} />)
  })
})
