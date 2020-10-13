/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentViewHeader,
  CommitmentViewHeaderProps
} from 'v2/app/components/CommitmentView/components/CommitmentViewHeader'
import { asset, dso } from '__fixtures__/authorizer'

describe('CommitmentViewHeader', () => {
  const props: CommitmentViewHeaderProps = {
    dso: dso,
    currency: asset,
    estimated: 123
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CommitmentViewHeader {...props} />)
  })
})
