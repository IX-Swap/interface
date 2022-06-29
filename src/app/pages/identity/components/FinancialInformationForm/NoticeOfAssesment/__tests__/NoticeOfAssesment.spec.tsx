import React from 'react'
import { render, cleanup } from 'test-utils'
import { NoticeOfAssesment } from 'app/pages/identity/components/FinancialInformationForm/NoticeOfAssesment/NoticeOfAssesment'
import { Breakdown } from 'app/pages/identity/components/FinancialInformationForm/NoticeOfAssesment/Breakdown'

jest.mock(
  'app/pages/identity/components/FinancialInformationForm/NoticeOfAssesment/Breakdown',
  () => ({
    Breakdown: jest.fn(() => null)
  })
)

describe('NoticeOfAssesment', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<NoticeOfAssesment />)
  })
})
