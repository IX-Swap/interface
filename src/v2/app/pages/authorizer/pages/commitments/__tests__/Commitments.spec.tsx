/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Commitments,
  renderCommitment
} from 'v2/app/pages/authorizer/pages/commitments/Commitments'
import { commitment } from '__fixtures__/authorizer'
import { DataroomFeature } from 'v2/types/authorizer'
import { CommitmentPreview } from 'v2/app/components/CommitmentPreview/CommitmentPreview'
import { AuthorizerView } from 'v2/app/pages/authorizer/components/AuthorizerView'

describe('Commitments', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<Commitments />)
  })

  describe('renderCommitment', () => {
    it('renders div', () => {
      const commitmentView = renderCommitment(commitment)

      expect(commitmentView).toEqual(
        <AuthorizerView
          title='Title'
          data={commitment}
          feature={DataroomFeature.commitments}
        >
          <CommitmentPreview data={commitment} />
        </AuthorizerView>
      )
    })
  })
})
