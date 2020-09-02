/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Commitments,
  renderCommitment
} from 'v2/app/pages/authorizer/pages/commitments/Commitments'

describe('Commitments', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<Commitments />)
  })

  describe('renderCommitment', () => {
    it('renders div', () => {
      const commitmentView = renderCommitment()
      expect(commitmentView).toEqual(<div />)
    })
  })
})
