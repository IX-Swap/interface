import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { corporate } from '__fixtures__/identity'
import { DSOInfo } from '../DSOInfo'

describe('DSOInfo', () => {
  it('renders without errors', () => {
    render(<DSOInfo dso={dso} corporate={corporate} />)
  })
})
