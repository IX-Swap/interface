import { AnnualIncomeSelect } from 'components/form/AnnualIncomeSelect'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AnnualIncomeSelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AnnualIncomeSelect />)
  })
})
