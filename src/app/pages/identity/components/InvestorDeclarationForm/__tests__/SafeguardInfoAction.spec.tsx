import { SafeguardInfoAction } from 'app/pages/_identity/components/InvestorDeclarationForm/SafeguardInfoDialog/SafeguardInfoAction/SafeguardInfoAction'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SafeguardInfoAction', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SafeguardInfoAction />)
  })
})
