import React from 'react'
import { render } from 'test-utils'
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
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DSOInvestLink {...props} />)
  })
})
