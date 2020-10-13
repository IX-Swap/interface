/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentPreview,
  CommitmentPreviewProps
} from 'v2/app/components/CommitmentPreview/CommitmentPreview'
import { Commitment } from 'v2/types/commitment'
import { commitment } from '__fixtures__/authorizer'

describe('CommitmentPreview', () => {
  const props: CommitmentPreviewProps = {
    data: commitment
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CommitmentPreview {...props} />)
  })

  it('renders nothing if data is null', () => {
    const { container } = render(
      <CommitmentPreview data={(null as unknown) as Commitment} />
    )

    expect(container).toBeEmptyDOMElement()
  })
})
