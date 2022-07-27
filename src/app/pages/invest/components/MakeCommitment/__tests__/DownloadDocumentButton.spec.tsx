import { DownloadDocumentButton } from 'app/pages/invest/components/MakeCommitment/DownloadDocumentButton'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'

describe('DownloadDocumentButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders correct label when dso is not campaign', () => {
    const { getByText } = render(<DownloadDocumentButton dso={dso} />)

    expect(getByText('Download Subscription Document')).toBeTruthy()
  })

  it('renders correct label when dso is campaign', () => {
    const { getByText } = render(
      <DownloadDocumentButton dso={{ ...dso, isCampaign: true }} />
    )

    expect(getByText('Download Investment Agreement')).toBeTruthy()
  })
})
