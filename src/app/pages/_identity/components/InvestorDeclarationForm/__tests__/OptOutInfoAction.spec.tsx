import { OptOutInfoAction } from 'app/pages/_identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutInfoAction/OptOutInfoAction'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('OptOutInfoAction', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OptOutInfoAction />)
  })
})
