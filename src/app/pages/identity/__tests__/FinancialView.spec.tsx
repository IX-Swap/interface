import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  FinancialView,
  FinancialViewProps
} from 'app/pages/identity/FinancialView'
import { individual } from '__fixtures__/identity'

describe('FinancialView', () => {
  const props: FinancialViewProps = { data: individual }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<FinancialView {...props} />)
  })
})
