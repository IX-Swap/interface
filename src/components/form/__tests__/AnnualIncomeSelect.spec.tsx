import { AnnualIncomeSelect } from 'components/form/AnnualIncomeSelect'
import React from 'react'
import { render } from 'test-utils'

describe('AnnualIncomeSelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AnnualIncomeSelect />)
  })
})
