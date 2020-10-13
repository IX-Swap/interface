/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentView,
  CommitmentProps
} from 'v2/app/components/CommitmentView/CommitmentView'
import { commitment } from '__fixtures__/authorizer'

describe('CommitmentView', () => {
  const props: CommitmentProps = { data: commitment }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CommitmentView {...props} />)
  })
})
