import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOInvestLink,
  DSOInvestLinkProps
} from 'app/components/DSO/components/DSOInvestLink'
import { dso } from '__fixtures__/authorizer'

describe('DSOInvestLink', () => {
  const props: DSOInvestLinkProps = {
    dso: dso
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOInvestLink {...props} />)
  })
})
