import React from 'react'
import { render } from 'test-utils'
import { MoreOptions } from '../MoreOptions'

describe('More Options', () => {
  const sampleDsoId = '1234567890'
  it('renders without errors', () => {
    render(<MoreOptions dsoId={sampleDsoId} />)
  })
})
